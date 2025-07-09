import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { OrderService } from '../../services/order.service';

type SortField = 'title' | 'author' | 'price';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filtered: Book[] = [];
  searchTerm = '';
  storeFilter: 'All' | 'Greta' | 'Peter' = 'All';
  sortBy: SortField = 'title';

  constructor(
    private bs: BookService,
    private os: OrderService
  ) {}

  ngOnInit() {
    this.bs.getAll().subscribe(data => {
      this.books = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    const term = (this.searchTerm ?? '').toLowerCase();

    this.filtered = this.books
      .filter(b => {
        const title = (b.title ?? '').toLowerCase();
        const matchStore = this.storeFilter === 'All' || b.store === this.storeFilter;
        return matchStore && title.includes(term);
      })
      .sort((a, b) => {
        if (this.sortBy === 'price') {
          return a.price - b.price;
        }
        const aVal = (a[this.sortBy] ?? '').toString();
        const bVal = (b[this.sortBy] ?? '').toString();
        return aVal.localeCompare(bVal);
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
    const dto = {
      bookId:    book.id,
      title:     "",
      price:     book.price,
      store:     book.store,
      totalPaid: book.price
    };

    // แสดง JSON string ของ payload
    console.log('Order payload:', JSON.stringify(dto));

    this.os.create(dto).subscribe({
      next: () => alert('Order placed!'),
      error: err => {
        // แสดง status + body ของ error
        console.error('Order failed status:', err.status);
        console.error('Order failed body:', err.error);

        alert(
          `Order failed (HTTP ${err.status}):\n` +
          JSON.stringify(err.error, null, 2)
        );
      }
    });
  }

}
