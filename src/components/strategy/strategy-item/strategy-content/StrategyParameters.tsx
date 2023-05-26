/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { type IParameters } from 'models/Strategy';
import { Col, Row } from 'react-bootstrap';
import EquivArrow from 'images/equiv-arrow.svg';

interface StrategyParametersProps {
  parameters: IParameters;
}
interface IntervalItemProps {
  value: number;
  text: string;
}
interface RowItemProps {
  text: string;
  min: IntervalItemProps;
  max: IntervalItemProps;
  hasLeftBorder: boolean;
}

const StyledRowItem = styled(Row)`
  & > * {
    flex: 0 0 auto;
  }
  .separator-col {
    border-right: 1px solid #09a0e1;
    padding-right: 8px;
  }
`;
const RowItem: React.FC<RowItemProps> = ({
  text,
  min,
  max,
  hasLeftBorder,
}): React.ReactElement => {
  return (
    <StyledRowItem className="flex-nowrap">
      <Col>
        <Row className="flex-column">
          <Col>{text}</Col>
          <Col>
            <Row
              className={`${
                hasLeftBorder ? 'flex-column separator-col' : 'flex-column'
              }`}
            >
              <Col>
                <Row>
                  <Col className="fw-bolder">{min.value}</Col>
                  <Col>
                    <img src={EquivArrow} alt="equiv-arrow" />
                  </Col>
                  <Col className="fw-bolder">{max.value}</Col>
                </Row>
              </Col>
              <Col>
                <Row className="fst-italic">
                  <Col>{min.text}</Col>
                  <Col></Col>
                  <Col>{max.text}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRowItem>
  );
};
const StyledRow = styled(Row)`
  background-color: var(--rak-rgba-atmosphere);
  border-radius: 0.3125rem;
  padding: 0.375rem 0.6875rem;
  color: var(--rak-palette-body_color);
  --bs-gutter-x: 0;
`;
const StrategyParameters: React.FC<StrategyParametersProps> = ({
  parameters,
}): React.ReactElement => {
  const { distance, cost, delay } = parameters;
  return (
    <StyledRow style={{ columnGap: '12px' }}>
      <Col>
        <RowItem
          text="Distance (km) :"
          min={{ value: distance.minValue, text: 'Réelle' }}
          max={{ value: distance.maxValue, text: 'Majorée' }}
          hasLeftBorder={true}
        />
      </Col>
      <Col>
        <RowItem
          text="Coût min (k€) :"
          min={{ value: cost.minValue, text: 'Min' }}
          max={{ value: cost.maxValue, text: 'Max' }}
          hasLeftBorder={true}
        />
      </Col>
      <Col>
        <RowItem
          text="Délais (mois) :"
          min={{ value: delay.minValue, text: 'Min' }}
          max={{ value: delay.maxValue, text: 'Max' }}
          hasLeftBorder={false}
        />
      </Col>
    </StyledRow>
  );
};

export default StrategyParameters;
