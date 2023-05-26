import { type IFiltersContext } from 'models/Context';
import React from 'react';
import { type FiltersContextType } from 'types';

const FiltersContext = React.createContext<FiltersContextType>({
  filtersContext: {
    clientType: '',
    power: 0,
    isSent: false,
    openSearch: true,
    coordinates: { label: 'Test', lng: 0, lat: 0 },
  },
  setFiltersContext: (filter: IFiltersContext) => {
    // do nothing.
  },
});
FiltersContext.displayName = 'Filters Context';
export default FiltersContext;
