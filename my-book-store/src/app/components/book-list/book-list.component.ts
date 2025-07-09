import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { OrderService } from '../../services/order.service';

type SortField = 'title' | 'author' | 'price';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [NgIf, NgFor, FormsModule, DecimalPipe]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filtered: Book[] = [];

  searchTerm: string = '';
  storeFilter: 'All' | 'Greta' | 'Peter' = 'All';
  sortBy: SortField = 'title';

  constructor(private bs: BookService, private os: OrderService) {}

  ngOnInit() {
    this.bs.getAll().subscribe(data => {
      this.books = data || [];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filtered = this.books
      .filter(b =>
        (this.storeFilter === 'All' || b.store === this.storeFilter) &&
        (b.title?.toLowerCase() ?? '').includes(this.searchTerm?.toLowerCase() ?? '')
      )
      .sort((a, b) => {
        if (this.sortBy === 'price') return a.price - b.price;
        return (a[this.sortBy] ?? '').localeCompare(b[this.sortBy] ?? '');
      });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  onFilter(store: 'All' | 'Greta' | 'Peter') {
    this.storeFilter = store;
    this.applyFilters();
  }

  onSort(field: SortField) {
    this.sortBy = field;
    this.applyFilters();
  }

  buy(book: Book) {
    const order = {
      bookId: book.id,
      orderNumber: this.generateOrderNumber(),
      title: book.title ?? '',
      price: book.price,
      store: book.store,
      totalPaid: book.price
    };

    this.os.create(order).subscribe(() => alert('Order placed!'));
  }
  // สร้าง method เพื่อ generate orderNumber แบบง่าย ๆ
generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD-${timestamp}-${random}`;
}
}
