import { api } from './index';
import type { Product, ProductBody, ProductLazyFilter, ProductsResponse } from 'src/types/products';

export function list(filter: ProductLazyFilter = {}) {
  const searchParams = new URLSearchParams();

  if(filter.tags) {
    filter.tags.forEach((t, i) => {
      searchParams.append(`tags[${i}]`, t.toString());
    })
  }

  if(filter.categoryId) searchParams.append('categoryId', filter.categoryId.toString());
  if(filter.limit) searchParams.append('limit', filter.limit.toString());
  if(filter.offset) searchParams.append('offset', filter.offset.toString());
  if(filter.visible) searchParams.append('visible', filter.visible ? '1' : '0');
  if(filter.withTags) searchParams.append('withTags', '');
  if(filter.search) searchParams.append('search', filter.search);

  return api.get('products', { searchParams }).json<ProductsResponse>();
}

export function show(id: number) {
  return api.get(`products/${id}`).json<Product>();
}

export function create(body: ProductBody) {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('description', body.description ?? '');
  formData.append('price', body.price.toString());
  formData.append('img', body.img ?? '');
  formData.append('categoryId', body.categoryId?.toString() ?? '');
  formData.append('visible', body.visible ? '1' : '0');

  return api.post(`products`, { body: formData }).json<Product>();
}

export function update(id: number, body: Partial<ProductBody>) {
  const formData = new FormData();

  if(body.price) {
    formData.append('price', body.price.toString());
  }

  if(body.description) {
    formData.append('description', body.description);
  }

  if(body.img) {
    formData.append('img', body.img);
  }

  if(body.visible !== undefined) {
    formData.append('visible', body.visible ? '1' : '0');
  }

  if(body.categoryId) {
    formData.append('categoryId', body.categoryId.toString() ?? '');
  }

  return api.patch(`products/${id}`, { body: formData }).json<Product>();
}

export function attachTags(productId: number, tags: number[]) {
  return api.post(`products/tags/attach`, { json: { productId, tags } }).json<Product>();
}

export function dettachTags(productId: number, tags: number[]) {
  return api.post(`products/tags/dettach`, { json: { productId, tags } }).json<Product>();
}
