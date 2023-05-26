import { type Coordinates } from './Coordinates';

export interface IFilters {
  clientType: string;
  power: number;
  isSent: boolean;
  openSearch?: boolean;
  coordinates?: Coordinates;
}
