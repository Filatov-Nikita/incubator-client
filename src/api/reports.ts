import { api } from './index';
import type { Report } from 'src/types/reports';

export function productsSold(filter: Record<string, string> = {}) {
  return api.get('reports/total_products', { searchParams: filter }).json<Report>();
}
