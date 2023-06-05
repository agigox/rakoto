import { type LatLngExpression } from 'leaflet';
import React, { useState } from 'react';
import { FeatureGroup, Polyline, Tooltip } from 'react-leaflet';
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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseOver = (): void => {
    setTooltipVisible(true);
  };

  const handleMouseOut = (): void => {
    setTooltipVisible(false);
  };

  return (
    <FeatureGroup>
      <CustomPolylineStyle
        pathOptions={{ opacity: isActive ? 1 : 0.4 }}
        positions={positions}
        weight={5}
        power={power}
        eventHandlers={{
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
          click: () => {
            console.log('click');
          },
        }}
      >
        {children}
      </CustomPolylineStyle>
      {isDesktop && tooltipVisible && (
        <Tooltip opacity={1} permanent direction="top" offset={[0, 0]}>
          <PointPopup label={label} power={power} id={id} />
        </Tooltip>
      )}
    </FeatureGroup>
  );
};

export default CustomPolyline;
