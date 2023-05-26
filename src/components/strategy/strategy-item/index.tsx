import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { type IStrategy } from 'models/Strategy';
import StrategyContent from './strategy-content';

interface StrategyItemProps {
  strategy: IStrategy;
  isLast?: boolean;
}
interface CSSRowProps {
  last: boolean;
}

const StyledRow = styled(Row)`
  ${(props: CSSRowProps) =>
    !props.last &&
    css`
      border-bottom: 3px solid var(--rak-rgba-blackMana);
    `}
  &:hover,
  &.active {
    background-color: var(--rak-wintersDay);
    opacity: 1;
  }
`;

export const StrategyItem: React.FC<StrategyItemProps> = ({
  strategy,
  isLast,
}) => {
  const [isActive, setIsActive] = useState(true);
  const handleIsActive = (isActive: boolean): void => {
    setIsActive(isActive);
  };
  return (
    <StyledRow
      className={`item-strategy ${!isActive ? 'active pb-2' : 'pb-2'}`}
      last={isLast}
    >
      <Col className="col-md-12 col-sm-12 col-12">
        <StrategyContent strategy={strategy} handleIsActive={handleIsActive} />
      </Col>
    </StyledRow>
  );
};

export default StrategyItem;
