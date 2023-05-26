import { type LatLngExpression } from 'leaflet';
import React from 'react';
import { FeatureGroup, Polyline } from 'react-leaflet';
import styled from 'styled-components';

interface CustomPolylineProps {
  positions: LatLngExpression[] | LatLngExpression[][];
  children: React.ReactNode;
  isActive: boolean;
  power: number;
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
  children,
  power,
}) => {
  return (
    <FeatureGroup>
      <CustomPolylineStyle
        pathOptions={{ dashArray: isActive ? '0' : '12' }}
        positions={positions}
        weight={5}
        power={power}
      >
        {children}
      </CustomPolylineStyle>
    </FeatureGroup>
  );
};

export default CustomPolyline;
