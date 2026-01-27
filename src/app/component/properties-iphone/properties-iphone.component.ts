import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

interface Feature {
  id: number;
  title: string;
  icon: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-properties-iphone',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './properties-iphone.component.html',
  styleUrl: './properties-iphone.component.css',
})
export class PropertiesIphoneComponent implements AfterViewInit {
  features: Feature[] = [
    {
      id: 1,
      title: 'Center Stage for photos',
      icon: 'bi-arrow-repeat',
      image: 'assets/images/properties-iphone/1m.jpg',
      description: 'An all-new square sensor enables zoom and rotate options, for more flexible ways to frame selfies and videos. And it gets everyone in a group shot — automatically.',
    },
    {
      id: 2,
      title: 'Dual Capture video',
      icon: 'bi-layers',
      image: 'assets/images/properties-iphone/2m.jpg',
      description: 'Capture video from both front and rear cameras simultaneously for a unique perspective.',
    },
    {
      id: 3,
      title: 'Ultra-stabilized video',
      icon: 'bi-person-walking',
      image: 'assets/images/properties-iphone/3m.jpg',
      description: 'Advanced stabilization algorithms ensure your action shots are smooth and steady.',
    },
    {
      id: 4,
      title: 'Center Stage for video calls',
      icon: 'bi-person-bounding-box',
      image: 'assets/images/properties-iphone/4m.jpg',
      description: 'The camera automatically pans to keep you in the center of the frame during video calls.',
    },
  ];

  activeFeature: Feature = this.features[0];
  indicatorPosition = 0;
  indicatorWidth = 0;

  @ViewChild('activeBtn', { static: false }) activeBtn!: ElementRef;

  ngAfterViewInit() {
    this.updateIndicator();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIndicator();
  }

  updateIndicator() {
    setTimeout(() => {
      if (this.activeBtn) {
        const element = this.activeBtn.nativeElement;
        this.indicatorPosition = element.offsetLeft;
        this.indicatorWidth = element.offsetWidth;
      }
    }, 150);
  }

  setActive(item: Feature, event: Event) {
    this.activeFeature = item;
    const element = event.currentTarget as HTMLElement;
    this.indicatorPosition = element.offsetLeft;
    this.indicatorWidth = element.offsetWidth;
  }
}