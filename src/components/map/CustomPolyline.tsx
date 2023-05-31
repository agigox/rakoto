import { type LatLngExpression } from 'leaflet';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FeatureGroup, Polyline, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { useDeviceType } from 'components/shared/useDeviceType';

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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseOver = (): void => {
    setTooltipVisible(true);
  };

  const handleMouseOut = (): void => {
    setTooltipVisible(false);
  };

  const { isDesktop } = useDeviceType();

  return (
    <FeatureGroup>
      <CustomPolylineStyle
        pathOptions={{ opacity: isActive ? 1 : 0.4 }}
        positions={positions}
        weight={4}
        power={power}
        eventHandlers={{
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
        }}
      >
        {isDesktop && tooltipVisible && (
          <Tooltip direction="right" opacity={1} permanent>
            <Row className="flex-column">
              <Col className="blue-text-rak text-center">
                {label} ({id})
              </Col>
              <Col className="fw-bold text-center">
                {`(${power / 1000}KV / LS)`}{' '}
              </Col>
            </Row>
          </Tooltip>
        )}
        {children}
      </CustomPolylineStyle>
    </FeatureGroup>
  );
};

export default CustomPolyline;
