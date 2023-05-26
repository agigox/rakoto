import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

interface StrategyTitleProps {
  id: number;
}
const StyledRow = styled(Row)`
  & > * {
    flex: 0 0 auto;
    width: auto;
  }
  .strategyId {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2.8125rem;
    border: 0.187rem solid var(--rak-palette-atmosphere);
    line-height: 1.25rem;
  }
`;

const StrategyTitle: React.FC<StrategyTitleProps> = ({
  id,
}: StrategyTitleProps): React.ReactElement => {
  return (
    <StyledRow className="justify-content-start align-items-center mb-2 mt-2 blue-text-rak">
      <Col className="text-uppercase pe-2 blue-text-rak">Stratégie</Col>
      <Col className="strategyId text-center">{id}</Col>
    </StyledRow>
  );
};

export default StrategyTitle;
