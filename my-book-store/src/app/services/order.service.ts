import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  create(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.base, order);
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.base);
  }
}
