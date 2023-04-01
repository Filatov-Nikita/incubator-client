import { api } from './index';
import type { Category, CategoryBody } from 'src/types/categories';

export function list() {
  return api.get('categories').json<Category[]>();
}

export function create(json: CategoryBody) {
  return api.post(`categories`, { json }).json<Category>();
}

export function update(id: number, json: Partial<CategoryBody>) {
  return api.patch(`categories/${id}`, { json }).json<Category>();
}

export function remove(id: number) {
  return api.delete(`categories/${id}`).json<boolean>();
}
