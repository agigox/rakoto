import { type LeafletEventHandlerFnMap } from 'leaflet';
import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

interface CustomMarkerProps {
  children: React.ReactNode;
  lat: number;
  lng: number;
  icon: any;
  eventHandlers?: LeafletEventHandlerFnMap;
}

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
  return (
    <Marker
      position={[lat, lng]}
      icon={icon}
      draggable={true}
      eventHandlers={eventHandlers}
    >
      <Popup>{children}</Popup>
    </Marker>
  );
};

export default CustomMarker;
