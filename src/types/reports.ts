export interface ProductItem {
  productId: number,
  count: number,
  totalSum: number,
  product: {
    id: number,
    name: string
  }
}

export interface Report {
  products: ProductItem[],
  total: number
}
