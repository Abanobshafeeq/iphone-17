import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  @Input() threshold: number = 0.4; // Default threshold
  @Output() visibilityChange = new EventEmitter<boolean>();

  private observer: IntersectionObserver | undefined;

  constructor(
    private elementRef: ElementRef, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupObserver();
    }
  }

  private setupObserver() {
    const options = {
      root: null,
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.visibilityChange.emit(entry.isIntersecting);
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}