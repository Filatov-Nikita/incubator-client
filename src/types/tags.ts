export const colors = ['purple', 'orange', 'blue', 'red', 'green', 'black'] as const;
export type TagColors = typeof colors[number];

export interface Tag {
  id: number,
  name: string,
  color: TagColors,
  categoryId: number | null,
  visible: boolean,
}

export type TagBody = Omit<Tag, 'id'>;
