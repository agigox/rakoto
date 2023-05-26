import { type IStrategy } from './Strategy';

export interface IStrategyContext {
  data: IStrategy[];
  isLoading: boolean;
  selectedStrategies: number[];
  openStrategy?: boolean;
  openMap?: boolean;
  selectedStrategy?: number;
  openStrategyDetails?: boolean;
}
