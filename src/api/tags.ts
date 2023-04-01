import { api } from './index';
import type { Tag, TagBody } from 'src/types/tags';

export function list() {
  return api.get('tags').json<Tag[]>();
}

export function create(json: TagBody) {
  return api.post(`tags`, { json }).json<Tag>();
}

export function update(id: number, json: Partial<TagBody>) {
  return api.patch(`tags/${id}`, { json }).json<Tag>();
}

export function remove(id: number) {
  return api.delete(`tags/${id}`).json<boolean>();
}
