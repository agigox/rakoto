import React from 'react';
import { Col, Row } from 'react-bootstrap';
interface PointPopupProps {
  label: string;
  lat: number;
  lng: number;
  id: number;
}

export const PointPopup: React.FC<PointPopupProps> = ({
  lat,
  lng,
  label,
  id,
}: PointPopupProps): React.ReactElement => {
  return (
    <Row className="flex-column">
      <Col className="blue-text-rak">
        {label} ({id})
      </Col>
      <Col className="fw-bold">
        {`${Number(lat).toFixed(5)}, ${Number(lng).toFixed(5)}`}{' '}
      </Col>
    </Row>
  );
};
