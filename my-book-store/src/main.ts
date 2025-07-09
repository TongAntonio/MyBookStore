// src/main.ts
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { BookListComponent } from './app/components/book-list/book-list.component';
import { OrderListComponent } from './app/components/order-list/order-list.component';

const routes = [
  { path: '',      component: BookListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: '**',    redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),              // แทน HttpClientModule
    provideRouter(routes),            // แทน RouterModule.forRoot(...)
    importProvidersFrom(FormsModule)  // แทน FormsModule import
  ]
})
.catch(err => console.error(err));
