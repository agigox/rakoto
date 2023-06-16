import StrategyContext from 'context/StrategyContext';
import { type IStrategy } from 'models/Strategy';
import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { type StrategyContextType } from 'types';
import StrategyDescription from './StrategyDescription';
import styled from 'styled-components';
import { useDeviceType } from 'components/shared/useDeviceType';
import StrategyParameters from './StrategyParameters';
import StrategyIndicators from '../StrategyIndicators';
interface StrategyContentProps {
  handleIsActive: (isActive: boolean) => void;
  strategy: IStrategy;
}
const addOrRemoveNumber = (arr: number[], num: number): number[] => {
  if (arr.includes(num)) {
    arr.splice(arr.indexOf(num), 1);
  } else {
    arr.push(num);
  }

  return arr;
};
const isChecked = (arr: number[], num: number): boolean => {
  return arr.includes(num);
};
const StyledRow = styled(Row)`
  cursor: pointer;
  & > * {
    flex: 0 0 auto;
  }
  .checkbox-col-rak {
    align-self: center;
    flex-basis: 2.1875rem;
  }
  .description-col-rak {
    width: calc(100% - 2.1875rem);

    @media (max-width: 992px) {
      width: calc(40% - 2.1875rem);
    }

    @media (max-width: 769px) {
      width: calc(32% - 2.1875rem);
    }

    @media (max-width: 575.98px) {
      width: calc(80% - 2.1875rem);
      font-size: 0.725rem;
    }
  }
  .parameters {
    @media (max-width: 992px) {
      padding-top: 1.5rem;
    }

    @media (max-width: 575.98px) {
      padding-top: 0.2rem;
    }
  }
`;
const StrategyContent: React.FC<StrategyContentProps> = ({
  strategy,
  handleIsActive,
}) => {
  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);
  const { selectedStrategies } = strategyContext;

  const { id, point, connectionMessage, parameters, indicators } = strategy;
  const { isMobile, isTablet } = useDeviceType();

  const onSelectStretegy = (elem: number, isActive: boolean): void => {
    handleIsActive(isActive);
    setStrategyContext({
      ...strategyContext,
      selectedStrategies: addOrRemoveNumber(selectedStrategies, elem),
    });
  };
  return (
    <StyledRow
      onClick={() => {
        onSelectStretegy(id, isChecked(selectedStrategies, id));
      }}
    >
      <Col className="checkbox-col-rak">
        <Form.Check
          checked={isChecked(selectedStrategies, id)}
          as="input"
          value={strategy.id}
          bsSwitchPrefix="form-check-input-rak"
          onChange={() => {
            onSelectStretegy(id, isChecked(selectedStrategies, id));
          }}
          type="checkbox"
        />
      </Col>
      <Col className="description-col-rak">
        <StrategyDescription
          point={point}
          connectionMessage={connectionMessage}
          indicators={indicators}
          parameters={parameters}
          id={id}
        />
      </Col>
      {(isMobile || isTablet) && (
        <Col className="parameters" md="7" sm="8" xs="12">
          <Row>
            <Col md="12" xs="12">
              <StrategyParameters parameters={parameters} />
            </Col>
            <Col md="12" xs="12">
              <StrategyIndicators indicators={indicators} />
            </Col>
          </Row>
        </Col>
      )}
    </StyledRow>
  );
};

export default StrategyContent;
