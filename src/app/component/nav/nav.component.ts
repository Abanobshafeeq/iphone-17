import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type NavItem = { label: string; href: string };

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  navItems: NavItem[] = [
    { label: 'Mac', href: '#' },
    { label: 'iPad', href: '#' },
    { label: 'iPhone', href: '#' },
    { label: 'Watch', href: '#' },
    { label: 'AirPods', href: '#' },
    { label: 'TV & Home', href: '#' },
    { label: 'Entertainment', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Where to Buy', href: '#' },
  ];

 
  
}
