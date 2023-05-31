import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { type StrategyContextType, type FiltersContextType } from 'types';
import FiltersContext from 'context/FiltersContext';
import StrategyFooter from '../StrategyFooter';
import StrategyContext from 'context/StrategyContext';
import StrategySearch from './StrategySearch';
import StrategyItem from '../strategy-item';

interface RowCSSProps {
  isSent: boolean;
}

const StyledRow = styled(Row)`
  & > * {
  }
  .flex-item-1 {
    height: 2.875rem;
  }
  .flex-item-2 {
    height: calc(100% - 2.875rem - 3.75rem);
    overflow-y: scroll;
  }
  .flex-item-3 {
    height: 3.5rem;
  }
  height: calc(100vh - 7.4rem);
  display: ${(props: RowCSSProps) => {
    return props.isSent ? 'flex' : 'none';
  }};
`;
const StrategyLayout: React.FC = (): JSX.Element => {
  const {
    filtersContext: { coordinates, isSent },
    setFiltersContext,
  } = useContext<FiltersContextType>(FiltersContext);
  const {
    strategyContext: { data },
    setStrategyContext,
  } = useContext<StrategyContextType>(StrategyContext);

  const { strategyContext } = useContext<StrategyContextType>(StrategyContext);
  const { selectedStrategies } = strategyContext;
  const onHideList = (): void => {
    setFiltersContext({
      isSent: false,
      openSearch: false,
      clientType: '',
      power: 0,
      coordinates: {
        label: coordinates?.label ?? '',
        lng: coordinates?.lng ?? 0,
        lat: coordinates?.lat ?? 0,
      },
    });
    setStrategyContext({
      ...strategyContext,
      data: [],
      selectedStrategies: [],
      openStrategy: false,
    });
  };
  return (
    <StyledRow isSent={isSent ? 1 : 0} className="flex-row strategy-row">
      <Col className="col-sm-12 col-md-12 col-12 flex-item-1">
        <StrategySearch length={data.length} onHideList={onHideList} />
      </Col>
      <Col className="col-sm-12 col-md-12 col-12 flex-item-2">
        {data.map((strategy, index) => {
          return <StrategyItem key={strategy.id} strategy={strategy} />;
        })}
      </Col>
      <Col className="flex-item-3">
        <StrategyFooter
          label={'Stratégies séléctionnées'}
          itemsLength={selectedStrategies.length}
        />
      </Col>
    </StyledRow>
  );
};

export default StrategyLayout;
