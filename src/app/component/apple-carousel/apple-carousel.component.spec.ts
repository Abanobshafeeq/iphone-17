import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleCarouselComponent } from './apple-carousel.component';

describe('AppleCarouselComponent', () => {
  let component: AppleCarouselComponent;
  let fixture: ComponentFixture<AppleCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppleCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
