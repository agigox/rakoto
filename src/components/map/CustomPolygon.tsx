import React, { useContext, useEffect } from 'react';
import { FeatureGroup, useMap } from 'react-leaflet';
import { type FiltersContextType, type StrategyContextType } from 'types';
import StrategyContext from 'context/StrategyContext';
import { type IStrategy } from 'models/Strategy';
import FiltersContext from 'context/FiltersContext';
import CustomMarker from 'components/shared/CustomMarker';
import CustomPolyline from './CustomPolyline';

export const CustomPolygon: React.FC = () => {
  const { strategyContext } = useContext<StrategyContextType>(StrategyContext);
  const { selectedStrategies, data, isLoading } = strategyContext;

  const { filtersContext } = useContext<FiltersContextType>(FiltersContext);
  const currentSelectAddressLat: number | any = filtersContext.coordinates?.lat;
  const currentSelectAddressLng: number | any = filtersContext.coordinates?.lng;

  const map = useMap();
  useEffect(() => {
    if (!isLoading) {
      map?.invalidateSize();

      // Disable dragging
      map.dragging.disable();

      // Move map to center
      map
        .setView([currentSelectAddressLat, currentSelectAddressLng], 11)
        .getCenter();

      // Re-enable dragging
      map.dragging.enable();
    }
  }, [currentSelectAddressLat, currentSelectAddressLng]);

  return (
    <>
      {data.map((strategy: IStrategy) => {
        const {
          id,
          polylineCoords,
          pointCoords: { label, lat, lng },
          point: { substation },
        } = strategy;

        return (
          <FeatureGroup key={id}>
            <CustomPolyline
              positions={polylineCoords}
              id={id}
              isActive={selectedStrategies.includes(id)}
              power={substation}
              label={label}
              lng={lng}
              lat={lat}
            >
              <CustomMarker
                label={label}
                lng={lng}
                lat={lat}
                id={id}
                position={false}
              />
            </CustomPolyline>
          </FeatureGroup>
        );
      })}
    </>
  );
};

export default CustomPolygon;
