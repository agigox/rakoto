import React, { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { type FiltersContextType, type StrategyContextType } from 'types';
import StrategyContext from 'context/StrategyContext';
import CustomPolyline from './CustomPolyline';
import L, { type LeafletMouseEvent } from 'leaflet';
import { type IStrategy } from 'models/Strategy';
import FiltersContext from 'context/FiltersContext';
import CustomMarker from 'components/shared/CustomMarker';
import { PointPopup } from './PointPopup';

export const CustomPolygon: React.FC = () => {
  const {
    strategyContext: { selectedStrategies, data, isLoading },
  } = useContext<StrategyContextType>(StrategyContext);
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
        .flyTo([currentSelectAddressLat, currentSelectAddressLng], 10.5)
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
          <CustomPolyline
            positions={polylineCoords}
            key={id}
            isActive={selectedStrategies.includes(id)}
            power={substation}
          >
            <CustomMarker
              lng={lng}
              lat={lat}
              icon={L.divIcon({
                className: 'custom-div-icon-marker',
                html: `<div class="svg-icon-marker">
                    <span class="number-strategy-line"> ${id} </span>
                    <svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="22" height="22" rx="11" fill="white" stroke="#009CDF" stroke-width="2"/>
                    <path d="" fill="#009CDF"/>
                    <path d="M12 24V42" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                    </svg> </div>`,
                iconAnchor: [26, 40],
                iconSize: [30, 60],
              })}
              eventHandlers={{
                mouseover: (event: LeafletMouseEvent) =>
                  event.target.openPopup(),
              }}
            >
              <PointPopup label={label} lat={lat} lng={lng} id={id} />
            </CustomMarker>
          </CustomPolyline>
        );
      })}
    </>
  );
};

export default CustomPolygon;
