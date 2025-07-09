export interface Order {
  orderNumber: string;
  bookId: string;
  title: string;
  price: number;
  store: 'Greta' | 'Peter';
  totalPaid: number;
}
