import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { InViewDirective } from '../shared/in-view.directive';

interface FeatureColor {
  hex: string;
  image: string;
}

interface FeatureItem {
  id: number;
  label: string;
  title?: string;
  description?: string;
  image: string;
  type: 'standard' | 'color-picker';
  colors?: FeatureColor[];
}

@Component({
  selector: 'app-feature-showcase',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  templateUrl: './feature-showcase.component.html',
  styleUrl: './feature-showcase.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('buttonsEntrance', [
      transition('* => visible', [
        query('.feature-btn', [
          style({ 
            opacity: 0, 
            transform: 'translate(-150px, 100px) scale(0.9)', 
            marginTop: '-55PX', 
            zIndex: 0
          })
        ], { optional: true }),
        query('.feature-btn', [
          animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style({ 
            opacity: 1, 
            transform: 'translate(0 , 0)' 
          }))
        ], { optional: true }),
        query('.feature-btn', [
          stagger('100ms', [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ 
              marginTop: '0', 
              zIndex: 1
            }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class FeatureShowcaseComponent {
  
  features: FeatureItem[] = [
    {
      id: 1,
      label: 'Colors',
      title: 'Colors',
      description: 'Choose from five gorgeous finishes. iPhone 17 shown in Lavender.',
      image: 'assets/images/feature-showcase/initial.jpg', 
      type: 'color-picker',
      colors: [
        { hex: '#E6D7F3', image: 'assets/images/feature-showcase/1-p.jpg' },
        { hex: '#C4D6C6', image: 'assets/images/feature-showcase/1-g.jpg' },
        { hex: '#9FB5D8', image: 'assets/images/feature-showcase/1-b.jpg' },
        { hex: '#F3F4F6', image: 'assets/images/feature-showcase/1-w.jpg' },
        { hex: '#383838', image: 'assets/images/feature-showcase/1-black.jpg' }
      ]
    },
    {
      id: 2,
      label: 'Display',
      title: 'Display',
      description: '6.3-inch Super Retina XDR display — our best ever. 3000 nits peak brightness. ProMotion up to 120Hz.',
      image: 'assets/images/feature-showcase/2.jpg',
      type: 'standard'
    },
    {
      id: 3,
      label: 'Ceramic Shield 2 front',
      title: 'Ceramic Shield',
      description: 'Tougher than any smartphone glass. Protects against scratches and drops.',
      image: 'assets/images/feature-showcase/3.jpg',
      type: 'standard'
    },
    {
      id: 4,
      label: 'Camera Control',
      title: 'Camera Control',
      description: 'The perfect shot, right at your fingertips. Adjust zoom and depth instantly.',
      image: 'assets/images/feature-showcase/4.jpg',
      type: 'standard'
    },
    {
      id: 5,
      label: 'Action button',
      title: 'Action Button',
      description: 'Customize your favorite feature. Flashlight, Voice Memo, Silent Mode, and more.',
      image: 'assets/images/feature-showcase/5.jpg',
      type: 'standard'
    },
    {
      id: 6,
      label: 'Dynamic Island',
      title: 'Dynamic Island',
      description: 'Bubbles up music, sports scores, phone calls, and so much more — without stopping what you’re doing.',
      image: 'assets/images/feature-showcase/6.jpg',
      type: 'standard'
    }
  ];

  activeFeature = signal<FeatureItem | null>(null);
  activeImage = signal<string>('assets/images/feature-showcase/initial.jpg');
  areButtonsVisible = signal(false);

  selectFeature(feature: FeatureItem) {
    if (this.activeFeature()?.id === feature.id) {
        this.activeFeature.set(null);
        this.activeImage.set('assets/images/feature-showcase/initial.jpg');
        return;
    }

    this.activeFeature.set(feature);
    
    if (feature.type === 'color-picker' && feature.colors?.length) {
      this.activeImage.set(feature.colors[0].image);
    } else {
      this.activeImage.set(feature.image);
    }
  }

  selectColor(imageSrc: string) {
    this.activeImage.set(imageSrc);
  }

  onVisibilityChange(isVisible: boolean) {
    if (isVisible && !this.areButtonsVisible()) {
      this.areButtonsVisible.set(true);
    }
  }
}