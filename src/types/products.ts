import { Tag } from "./tags";

export interface Product {
  id: number,
  name: string,
  img: string | null,
  price: number,
  description: string | null,
  categoryId: number | null,
  visible: boolean,
  tags: Tag[]
}

export type ProductFilter = {
  categoryId?: number,
  visible?: boolean,
  withTags?: '1',
  tags?: number[],
  search?: string,
}

export type LazyLoadFilter = {
  limit?: number,
  offset?: number
}

export type ProductLazyFilter = ProductFilter & LazyLoadFilter;

export interface MetaResponse {
  total: number,
  limit?: number,
  offset?: number
}

export interface ProductsResponse {
  data: Product[],
  meta: MetaResponse
}

export type ProductBody = Omit<Product, 'id' | 'img' | 'tags'> & { img: string | File | null };
