import { type IFiltersContext } from 'models/Context';
import { type IStrategyContext } from 'models/StrategyContext';

export interface FiltersContextType {
  filtersContext: IFiltersContext;
  setFiltersContext: (filters: IFiltersContext) => void;
}

export interface StrategyContextType {
  strategyContext: IStrategyContext;
  setStrategyContext: (data: IStrategyContext) => void;
}
export interface FiltersFormType {
  clientType: string;
  power?: number;
  isSent?: boolean;
  openSearch?: boolean; // Show/hide device mobile
}
