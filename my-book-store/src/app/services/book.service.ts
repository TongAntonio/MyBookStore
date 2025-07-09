import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = `${environment.apiUrl}/books`;
  private apiUrl = 'http://localhost:5043/api/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }
  
  getGretaBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}books/greta`);
  }

  getPeterBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}books/peter`);
  }
  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}order`, order);
  }
}
