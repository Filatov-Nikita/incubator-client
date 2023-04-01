import type { Product } from 'src/types/products';

export interface OrderProduct {
  orderId: number,
  productId: number,
  productCount: number,
}

export interface Order {
  id: number,
  userId: number,
  products: (Product & { OrderProduct: OrderProduct })[],
  createdAt: string,
  updatedAt: string
}

interface BodyOne {
  id: number,
  count: number
}

export interface OrderBody {
  products: BodyOne[]
}
