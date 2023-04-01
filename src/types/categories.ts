export interface Category {
  id: number,
  name: string,
  description: string | null
}

export type CategoryBody = Omit<Category, 'id'>;
