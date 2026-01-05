import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, signal, OnDestroy, inject, PLATFORM_ID, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-apple-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apple-carousel.component.html',
  styleUrl: './apple-carousel.component.css',
})
export class AppleCarouselComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChild('viewport') viewport!: ElementRef;
  
  currentIndex = signal(0);
  isPlaying = signal(true);
  intervalId: any;
  slides = new Array(6);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // this.startAutoplay();
    }
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      if (this.isPlaying()) {
        const nextIndex = (this.currentIndex() + 1) % this.slides.length;
        this.goTo(nextIndex);
      }
    }, 8000);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
    const container = this.viewport.nativeElement;
    
    // Select all li elements to ensure both standard and custom cards are counted
    const cards = container.querySelectorAll('li'); 
    
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  togglePlay() {
    this.isPlaying.update((v) => !v);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}