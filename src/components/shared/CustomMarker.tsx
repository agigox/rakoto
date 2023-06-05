import { type LeafletEventHandlerFnMap } from 'leaflet';
import React, { useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';
// import { useDeviceType } from './useDeviceType';
// import styled from 'styled-components';

interface CustomMarkerProps {
  children: React.ReactNode;
  lat: number;
  lng: number;
  icon: any;
  eventHandlers?: LeafletEventHandlerFnMap;
}

// const StyledPopup = styled(Popup)`
//   .leaflet-popup-content-wrapper {
//     border-radius: 0.1875rem;
//     .leaflet-popup-content {
//       margin: 0.3125rem 0.625rem;
//     }
//   }
// `;

const CustomMarker: React.FC<CustomMarkerProps> = ({
  lng,
  lat,
  children,
  icon,
  eventHandlers,
}: CustomMarkerProps): React.ReactElement => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);

  // const { isDesktop } = useDeviceType();

  return (
    <Marker
      position={[lat, lng]}
      icon={icon}
      draggable={true}
      eventHandlers={eventHandlers}
    >
      {children}
    </Marker>
  );
};

export default CustomMarker;
