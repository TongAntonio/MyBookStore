// src/app/models/order-create-dto.model.ts
export interface OrderCreateDto {
  bookId: string;
  title: string;
  price: number;
  store: string;
  totalPaid: number;
}
