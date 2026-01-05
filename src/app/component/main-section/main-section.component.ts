import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  videoSrc: string = 'assets/video/desktop_video.mp4';

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1024px)'])
      .subscribe((result : any) => {
        if (result.matches) {
          this.videoSrc = '../../../assets/vedio/medium_2x.mp4';
        } else {
          this.videoSrc = '../../../assets/vedio/xlarge_2x.mp4';
        }
      });
  }
}
