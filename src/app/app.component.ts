import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./component/nav/nav.component";
import { MainSectionComponent } from "./component/main-section/main-section.component";
import { SubNavComponent } from "./component/sub-nav/sub-nav.component";
import { AppleCarouselComponent } from "./component/apple-carousel/apple-carousel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, MainSectionComponent, SubNavComponent, AppleCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'iphone';
}
