import React, { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { type StrategyContextType } from 'types';
import styled from 'styled-components';
import Close from 'images/close.svg';
import StrategyContext from 'context/StrategyContext';
import StrategyItem from './strategy-item';
import StrategyFooter from './StrategyFooter';

const StyledRow = styled(Row)`
  & > * {
  }
  height: calc(100vh - 7.4rem);
  display: 'flex';

  &:hover,
  &.active {
    background-color: var(--rak-wintersDay);
    opacity: 1;
  }
`;

interface StrategyItemProps {
  id: number;
}

export const StrategyDetails: React.FC<StrategyItemProps> = ({ id }) => {
  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);
  const { data, selectedStrategies } = strategyContext;

  const onHideList = (): void => {
    setStrategyContext({
      ...strategyContext,
      selectedStrategy: undefined,
      openStrategyDetails: false,
    });
  };

  return (
    <StyledRow
      className={`flex-row strategy-row ${
        selectedStrategies.length > 0 ? 'selected' : ''
      }`}
    >
      <Col className="col-12">
        <Button variant="link" className="strategy-close">
          <img src={Close} alt="close" onClick={onHideList} />
        </Button>
        {data
          .filter((item) => item.id === id)
          .map((strategy, index) => {
            return <StrategyItem key={strategy.id} strategy={strategy} />;
          })}
      </Col>
      {selectedStrategies.length > 0 && (
        <Col className="flex-item-3">
          <StrategyFooter
            label={'Stratégies séléctionnées'}
            itemsLength={selectedStrategies.length}
          />
        </Col>
      )}
    </StyledRow>
  );
};
