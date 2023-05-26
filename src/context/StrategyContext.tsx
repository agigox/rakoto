import React from 'react';
import { type StrategyContextType } from 'types';
const StrategyContext = React.createContext<StrategyContextType>({
  strategyContext: {
    data: [],
    isLoading: false,
    selectedStrategies: [],
  },
  setStrategyContext: () => {
    // do nothing.
  },
});
StrategyContext.displayName = 'Strategy Context';
export default StrategyContext;
