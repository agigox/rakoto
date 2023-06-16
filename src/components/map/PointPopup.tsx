import React from 'react';
import { Col, Row } from 'react-bootstrap';
interface PointPopupProps {
  label?: string;
  lat?: number;
  lng?: number;
  id?: number;
  power?: number;
}

export const PointPopup: React.FC<PointPopupProps> = ({
  lat,
  lng,
  label,
  id,
  power,
}: PointPopupProps): React.ReactElement => {
  return (
    <Row className="flex-column text-center">
      <Col className={`${id != null ? 'blue-text-rak' : 'fw-bold'}`}>
        {label} {id != null && <span>{`(${id})`}</span>}
      </Col>
      {lat != null && lng != null && power != null && (
        <Col className="fw-bold">{`(${power / 1000}KV / LS)`}</Col>
      )}
      {lat != null && lng != null && power == null && (
        <Col className="fw-bold">
          {`${Number(lat).toFixed(5)}, ${Number(lng).toFixed(5)}`}{' '}
        </Col>
      )}
    </Row>
  );
};
