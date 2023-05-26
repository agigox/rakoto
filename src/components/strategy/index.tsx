import React, { useContext } from 'react';
import StrategyLayout from 'components/strategy/strategy-layout';
import { Loading } from 'components/shared/Loading';
import { type FiltersContextType, type StrategyContextType } from 'types';
import StrategyContext from 'context/StrategyContext';
import FiltersContext from 'context/FiltersContext';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position: relative;
  height: calc(100vh - 7.4rem);
`;

const Strategy = (): JSX.Element => {
  const {
    strategyContext: { isLoading },
  } = useContext<StrategyContextType>(StrategyContext);
  const { filtersContext } = useContext<FiltersContextType>(FiltersContext);

  return (
    <StyledDiv>
      {isLoading ? (
        <Loading />
      ) : (
        <>{filtersContext.isSent && <StrategyLayout />}</>
      )}
    </StyledDiv>
  );
};

export default Strategy;
