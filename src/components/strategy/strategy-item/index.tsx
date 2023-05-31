import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { type IStrategy } from 'models/Strategy';
import StrategyContent from './strategy-content';

interface StrategyItemProps {
  strategy: IStrategy;
}

export const StrategyItem: React.FC<StrategyItemProps> = ({ strategy }) => {
  const [isActive, setIsActive] = useState(true);
  const handleIsActive = (isActive: boolean): void => {
    setIsActive(isActive);
  };
  return (
    <Row className={`item-strategy ${!isActive ? 'active pb-2' : 'pb-2'}`}>
      <Col className="col-md-12 col-sm-12 col-12">
        <StrategyContent strategy={strategy} handleIsActive={handleIsActive} />
      </Col>
    </Row>
  );
};

export default StrategyItem;
