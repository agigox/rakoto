import StrategyContext from 'context/StrategyContext';
import { type IStrategy } from 'models/Strategy';
import React, { useContext, useState } from 'react';
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

    @media (max-width: 575.98px) {
      font-size: 0.725rem;
    }
  }
`;
const StrategyContent: React.FC<StrategyContentProps> = ({
  strategy,
  handleIsActive,
}) => {
  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);
  const [checked, setChecked] = useState(true);
  const { id, point, connectionMessage, parameters, indicators } = strategy;
  const { isMobile, isTablet } = useDeviceType();

  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState<number>(0);
  const onSelectStretegy = (elem: number, isActive: boolean): void => {
    setSelectedStrategyIndex(elem);
    handleIsActive(isActive);
    setStrategyContext({
      ...strategyContext,
      selectedStrategies: addOrRemoveNumber(
        strategyContext.selectedStrategies,
        elem,
      ),
    });
    setChecked(!checked);
  };
  return (
    <StyledRow
      onClick={() => {
        onSelectStretegy(id, !checked && selectedStrategyIndex === id);
      }}
    >
      <Col className="checkbox-col-rak">
        <Form.Check
          checked={!checked && selectedStrategyIndex === id}
          as="input"
          value={strategy.id}
          bsSwitchPrefix="form-check-input-rak"
          onChange={() => {
            onSelectStretegy(id, !checked && selectedStrategyIndex === id);
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
        <Col md="8" xs="12">
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
