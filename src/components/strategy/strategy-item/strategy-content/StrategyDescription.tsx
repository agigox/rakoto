/* eslint-disable no-prototype-builtins */
import {
  ConnectionMessageTypeLabels,
  StrategyTypeLabels,
  StationTypeLabels,
} from 'enums';
import {
  type IPoint,
  type IIndicators,
  type IParameters,
} from 'models/Strategy';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import StrategyIndicators from '../StrategyIndicators';
import StrategyParameters from './StrategyParameters';
import StrategyTitle from '../StrategyTitle';
import { useDeviceType } from 'components/shared/useDeviceType';

interface StrategyDescriptionProps {
  point: IPoint;
  indicators: IIndicators;
  connectionMessage: string;
  parameters: IParameters;
  id: number;
}

export const StyledRow = styled(Row)`
  .flex-item {
    height: 1.5rem;
  }
`;

const StrategyDescription: React.FC<StrategyDescriptionProps> = ({
  point,
  connectionMessage,
  indicators,
  parameters,
  id,
}): React.ReactElement => {
  const { name, type, pointType, substation } = point;
  const { isDesktop } = useDeviceType();
  return (
    <StyledRow>
      <Col md={{ span: '12' }} xs={{ span: '12' }}>
        <StrategyTitle id={id} />
      </Col>
      <Col md={{ span: '4' }} xs={{ span: '12' }}>
        <Row>
          <Col md={{ span: '12' }} className="flex-item">
            {StrategyTypeLabels[pointType as keyof typeof StrategyTypeLabels]}{' '}
            <b>{name}</b> (
            {StationTypeLabels[type as keyof typeof StationTypeLabels]})
          </Col>
          <Col md={{ span: '12' }} className="flex-item">
            <b>{name}</b> {`(${substation / 1000}KV / LS)`}
          </Col>
          <Col md={{ span: '12' }} className="flex-item">
            Raccordement en{' '}
            <b>
              {
                ConnectionMessageTypeLabels[
                  connectionMessage as keyof typeof ConnectionMessageTypeLabels
                ]
              }
            </b>
          </Col>
        </Row>
      </Col>
      {isDesktop && (
        <Col md={{ span: '8' }} xs={{ span: '12' }}>
          <Row>
            <Col md={{ span: '12' }} xs={{ span: '12' }}>
              <StrategyParameters parameters={parameters} />
            </Col>
            <Col md={{ span: '12' }} xs={{ span: '12' }}>
              <StrategyIndicators indicators={indicators} />
            </Col>
          </Row>
        </Col>
      )}
    </StyledRow>
  );
};

export default StrategyDescription;
