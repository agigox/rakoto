import React, { useContext, useEffect, useState } from 'react';
import { Tooltip, useMap } from 'react-leaflet';
import { type FiltersContextType, type StrategyContextType } from 'types';
import StrategyContext from 'context/StrategyContext';
import CustomPolyline from './CustomPolyline';
import L from 'leaflet';
import { type IStrategy } from 'models/Strategy';
import FiltersContext from 'context/FiltersContext';
import CustomMarker from 'components/shared/CustomMarker';
import { PointPopup } from './PointPopup';
import { useDeviceType } from 'components/shared/useDeviceType';

export const CustomPolygon: React.FC = () => {
  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);
  const { selectedStrategies, data, isLoading } = strategyContext;

  const { filtersContext } = useContext<FiltersContextType>(FiltersContext);
  const currentSelectAddressLat: number | any = filtersContext.coordinates?.lat;
  const currentSelectAddressLng: number | any = filtersContext.coordinates?.lng;
  const { isMobile, isTablet } = useDeviceType();

  const map = useMap();
  useEffect(() => {
    if (!isLoading) {
      map?.invalidateSize();

      // Disable dragging
      map.dragging.disable();

      // Move map to center
      map
        .flyTo([currentSelectAddressLat, currentSelectAddressLng], 10)
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

        const { isDesktop } = useDeviceType();
        const [tooltipVisible, setTooltipVisible] = useState(false);
        const handleMouseOver = (): void => {
          setTooltipVisible(true);
        };

        const handleMouseOut = (): void => {
          setTooltipVisible(false);
        };

        const IconMarkerHtml = (id: number): any => {
          return `<div class="svg-icon-marker">
          <span class="number-strategy-line">${id}</span>
          <svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="22" rx="11" fill="white" stroke="#009CDF" stroke-width="2"/>
          <path d="" fill="#009CDF"/>
          <path d="M12 24V42" stroke="black" stroke-width="2" stroke-linejoin="round"/>
          </svg> </div>`;
        };

        // Create a custom DivIcon with event listeners
        const iconOptions: L.DivIconOptions = {
          className: 'custom-div-icon-marker',
          html: IconMarkerHtml(id),
          iconAnchor: [26, 40],
          iconSize: [30, 60],
        };

        const customDivIcon = L.divIcon(iconOptions);

        return (
          <CustomPolyline
            positions={polylineCoords}
            key={id}
            id={id}
            isActive={selectedStrategies.includes(id)}
            power={substation}
            label={label}
          >
            <CustomMarker
              lng={lng}
              lat={lat}
              icon={customDivIcon}
              eventHandlers={{
                mouseover: handleMouseOver,
                mouseout: handleMouseOut,
                click: (e) => {
                  if (isMobile || isTablet) {
                    setStrategyContext({
                      ...strategyContext,
                      selectedStrategy: id,
                      openStrategyDetails: true,
                    });
                  }
                  console.log('click');
                },
              }}
            >
              {isDesktop && tooltipVisible && (
                <Tooltip
                  opacity={1}
                  permanent
                  direction="top"
                  offset={[-1, -40]}
                >
                  <PointPopup label={label} lat={lat} lng={lng} id={id} />
                </Tooltip>
              )}
            </CustomMarker>
          </CustomPolyline>
        );
      })}
    </>
  );
};

export default CustomPolygon;
