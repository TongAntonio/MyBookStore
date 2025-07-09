import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private os: OrderService) {}

  ngOnInit() {
    this.os.getAll().subscribe(data => (this.orders = data));
  }
}
