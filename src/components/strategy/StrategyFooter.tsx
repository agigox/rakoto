import StrategiesGenerator from 'components/modals/strategies-generator';
import StrategyContext from 'context/StrategyContext';
import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { type StrategyContextType } from 'types';
interface StrategyFooterProps {
  itemsLength: number;
  label: string;
}
const StyledRow = styled(Row)`
  border-top: 3px solid var(--rak-palette-atmosphere);
  .flex-item-2 {
    padding: 0.5rem;
  }
`;
const StrategyFooter: React.FC<StrategyFooterProps> = ({
  label,
  itemsLength,
}) => {
  const [show, setShow] = useState(false);
  const { strategyContext } = useContext<StrategyContextType>(StrategyContext);
  const { selectedStrategies } = strategyContext;

  const handleClose = (): void => {
    setShow(false);
  };
  const handleShow = (): void => {
    setShow(true);
  };
  return (
    <StyledRow className="flex-wrap align-items-center">
      <Col className="blue-text-rak col-md-9 col-7 text-end">{`${itemsLength} ${label}`}</Col>
      <Col className="col-md-3 col-5 text-end flex-item-2">
        <Button
          className="btn-rak-primary"
          onClick={handleShow}
          disabled={selectedStrategies.length === 0}
        >
          Continuer
        </Button>
      </Col>
      <StrategiesGenerator show={show} handleClose={handleClose} />
    </StyledRow>
  );
};

export default StrategyFooter;
