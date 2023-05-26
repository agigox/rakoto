import React from 'react';
import FiltersContext from './FiltersContext';
import AnotherContext from './StrategyContext';
import { type IFiltersContext } from 'models/Context';
import { type IStrategyContext } from 'models/StrategyContext';

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

function GlobalContextProvider({
  children,
}: GlobalContextProviderProps): JSX.Element {
  const [filtersContext, setFiltersContext] = React.useState<IFiltersContext>({
    clientType: '',
    power: 0,
    isSent: false,
    openSearch: true,
    coordinates: { label: 'Test', lng: 0, lat: 0 },
  });
  const [strategyContext, setStrategyContext] =
    React.useState<IStrategyContext>({
      data: [],
      isLoading: false,
      selectedStrategies: [],
      openStrategy: false,
      openMap: false,
      selectedStrategy: undefined,
      openStrategyDetails: false,
    });

  return (
    <FiltersContext.Provider value={{ filtersContext, setFiltersContext }}>
      <AnotherContext.Provider value={{ strategyContext, setStrategyContext }}>
        {children}
      </AnotherContext.Provider>
    </FiltersContext.Provider>
  );
}

export default GlobalContextProvider;
