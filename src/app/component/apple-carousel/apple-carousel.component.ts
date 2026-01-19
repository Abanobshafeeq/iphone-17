import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, signal, OnDestroy, inject, PLATFORM_ID, ViewChild, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { InViewDirective } from '../../shared/in-view.directive'; 

@Component({
  selector: 'app-apple-carousel',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  templateUrl: './apple-carousel.component.html',
  styleUrl: './apple-carousel.component.css',
})
export class AppleCarouselComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  
  @ViewChild('viewport') viewport!: ElementRef;
  // هذا سيحتوي الآن على 3 عناصر فيديو فقط
  @ViewChildren('videoPlayer') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  currentIndex = signal(0);
  isPlaying = signal(true);
  intervalId: any;
  slides = new Array(6);
  
  // خريطة لربط رقم الشريحة برقم الفيديو في القائمة
  // Slide Index : Video Element Index
  private slideToVideoMap: { [key: number]: number } = {
    0: 0, // Slide 1 uses 1st video
    1: 1, // Slide 2 uses 2nd video
    3: 2  // Slide 4 uses 3rd video
  };


  ngOnInit() {}

  onVisibilityChange(isVisible: boolean) {
    if (isVisible) {
      if (this.isPlaying()) {
        this.startAutoplay();
        this.manageVideoPlayback(this.currentIndex(), false);
      }
    } else {
      this.stopAutoplay();
      this.pauseAllVideos();
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.intervalId = setInterval(() => {
      const nextIndex = (this.currentIndex() + 1) % this.slides.length;
      this.goTo(nextIndex);
    }, 8000);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  goTo(index: number) {
    this.currentIndex.set(index);
    
    this.manageVideoPlayback(index);

    if (!this.viewport) return;

    const container = this.viewport.nativeElement;
    // تحديث السلكتور ليشمل الكلاس الجديد
    const cards = container.querySelectorAll('.card-item, .card-item-3'); 
    const targetCard = cards[index] as HTMLElement;

    if (targetCard) {
      const scrollLeft = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.clientWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }

  togglePlay() {
    this.isPlaying.update((v) => !v);
    
    if (this.isPlaying()) {
      this.startAutoplay();
      this.manageVideoPlayback(this.currentIndex(), false); 
    } else {
      this.stopAutoplay();
      this.pauseCurrentVideo();
    }
  }

  // دالة مساعدة لإيقاف الفيديو الحالي إذا كان موجوداً
  private pauseCurrentVideo() {
    const videoIndex = this.slideToVideoMap[this.currentIndex()];
    if (videoIndex !== undefined) {
       const video = this.videoElements.toArray()[videoIndex]?.nativeElement;
       if (video) video.pause();
    }
  }

  // دالة مساعدة لإيقاف كل الفيديوهات
  private pauseAllVideos() {
    if (!this.videoElements) return;
    this.videoElements.forEach(v => {
        v.nativeElement.pause();
        v.nativeElement.currentTime = 0;
    });
  }


  // الدالة الرئيسية المعدلة لإدارة الفيديو
  manageVideoPlayback(activeIndex: number, restart: boolean = true) {
    // 1. إيقاف جميع الفيديوهات أولاً
    this.pauseAllVideos();

    // 2. التحقق مما إذا كانت الشريحة الحالية تحتوي على فيديو
    const videoIndex = this.slideToVideoMap[activeIndex];

    // إذا كان هناك فيديو لهذه الشريحة، قم بتشغيله
    if (videoIndex !== undefined && this.videoElements) {
      const videoRef = this.videoElements.toArray()[videoIndex];
      if (videoRef) {
        const video = videoRef.nativeElement;
        if (restart) {
            video.currentTime = 0;
        }
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => { console.log("Autoplay prevented"); });
        }
      }
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }
}