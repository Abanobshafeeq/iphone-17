import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesIphoneComponent } from './properties-iphone.component';

describe('PropertiesIphoneComponent', () => {
  let component: PropertiesIphoneComponent;
  let fixture: ComponentFixture<PropertiesIphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesIphoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertiesIphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
