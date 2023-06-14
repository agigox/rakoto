import React, { useContext, useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useDeviceType } from './useDeviceType';
import { type StrategyContextType } from 'types';
import StrategyContext from 'context/StrategyContext';
import { PointPopup } from 'components/map/PointPopup';
import styled from 'styled-components';

interface CustomMarkerProps {
  children?: React.ReactNode;
  lat: number;
  lng: number;
  id: number;
  label: string;
}

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 0.1875rem;
    .leaflet-popup-content {
      margin: 0.3125rem 0.625rem;
    }
  }
`;

const CustomMarker: React.FC<CustomMarkerProps> = ({
  lng,
  lat,
  id,
  label,
}: CustomMarkerProps): React.ReactElement => {
  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);

  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);

  const { isMobile, isTablet, isDesktop } = useDeviceType();

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
    <Marker
      position={[lat, lng]}
      icon={customDivIcon}
      draggable={false}
      eventHandlers={{
        mouseover: (e: L.LeafletMouseEvent) => e.target.openPopup(),
        mouseout: (e: L.LeafletMouseEvent) => e.target.closePopup(),
        click: (e) => {
          if (isMobile || isTablet) {
            setStrategyContext({
              ...strategyContext,
              selectedStrategy: id,
              openStrategyDetails: true,
            });
          }
        },
      }}
    >
      {isDesktop && (
        <StyledPopup closeButton={false} offset={[-1, -30]}>
          <PointPopup label={label} lat={lat} lng={lng} id={id} />
        </StyledPopup>
      )}
    </Marker>
  );
};

export default CustomMarker;
