// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav style="display: flex; gap:1rem; margin-bottom:1rem">
      <a routerLink="">Books</a>
      <a routerLink="orders">Orders</a>
    </nav>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {}
