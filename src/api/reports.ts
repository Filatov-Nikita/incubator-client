import { api } from './index';
import type { ProductItem } from 'src/types/reports';

export function productsSold() {
  return api.get('reports/total_products').json<ProductItem[]>();
}
