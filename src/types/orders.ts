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

type OrderListProduct = {
  total: number,
  id: number,
  count: number,
  price: number
  name: string
}

export interface OrderListItem {
  products: OrderListProduct[],
  total: number,
  createdAt: string,
  userId: number,
  id: number,
}

export interface OrderList {
  orders: OrderListItem[]
}

export interface OrderFilter {
  dateFrom?: string,
  dateTo?: string,
}
