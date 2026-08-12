import { Sort } from '@shared/pagination/sort.model';

export interface PageRequest {
  page: number;
  size: number;
  sort?: Sort;
}
