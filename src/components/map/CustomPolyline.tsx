import type L from 'leaflet';
import { type LatLngExpression } from 'leaflet';
import React from 'react';
import { Polyline, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useDeviceType } from 'components/shared/useDeviceType';
import { PointPopup } from './PointPopup';

interface CustomPolylineProps {
  positions: LatLngExpression[] | LatLngExpression[][];
  children: React.ReactNode;
  isActive: boolean;
  power: number;
  label: string;
  id: number;
  lat: number;
  lng: number;
}
interface CustomPolylineStyleCSSProps {
  power: number;
}

const CustomPolylineStyle = styled(Polyline)`
  stroke: ${(props: CustomPolylineStyleCSSProps) => {
    if (props.power >= 6300 && props.power <= 9000) {
      return 'var(--rak-power-low)';
    } else if (props.power >= 15000 && props.power <= 22500) {
      return 'var(--rak-power-hight)';
    } else {
      return 'var(--rak-power-default)';
    }
  }};
`;

const CustomPolyline: React.FC<CustomPolylineProps> = ({
  isActive,
  positions,
  power,
  label,
  id,
  lat,
  lng,
  children,
}) => {
  const polylineRef = React.useRef<L.Polyline | null>(null);
  const { isDesktop } = useDeviceType();

  return (
    <>
      <CustomPolylineStyle
        pathOptions={{
          opacity: isActive ? 1 : 0.4,
        }}
        positions={positions}
        weight={8}
        power={power}
        eventHandlers={{
          mouseover: (e: L.LeafletMouseEvent) => e.target.openPopup(),
          mouseout: (e: L.LeafletMouseEvent) => e.target.closePopup(),
          click: () => {
            console.log('cliked');
          },
        }}
        ref={polylineRef}
      >
        {children}
        {isDesktop && (
          <Popup closeButton={false}>
            <PointPopup
              label={label}
              power={power}
              lat={lat}
              lng={lng}
              id={id}
            />
          </Popup>
        )}
      </CustomPolylineStyle>
    </>
  );
};

export default CustomPolyline;
