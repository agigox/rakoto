import { type LeafletMouseEvent, type LatLngExpression } from 'leaflet';
import React from 'react';
import { FeatureGroup, Polyline, Popup } from 'react-leaflet';
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
}
interface CustomPolylineStyleCSSProps {
  power: number;
}

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 0.1875rem;
    .leaflet-popup-content {
      margin: 0.3125rem 0.625rem;
    }
  }
`;

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
  label,
  id,
}) => {
  const { isDesktop } = useDeviceType();

  return (
    <FeatureGroup>
      <CustomPolylineStyle
        pathOptions={{ opacity: isActive ? 1 : 0.4 }}
        positions={positions}
        weight={4}
        power={power}
        eventHandlers={{
          mouseover: (event: LeafletMouseEvent) => {
            event.target.openPopup();
          },
          mouseout: (event: LeafletMouseEvent) => {
            event.target.closePopup();
          },
        }}
      >
        {isDesktop && (
          <StyledPopup closeButton={false}>
            <PointPopup label={label} power={power} id={id} />
          </StyledPopup>
        )}
        {children}
      </CustomPolylineStyle>
    </FeatureGroup>
  );
};

export default CustomPolyline;
