import { type IIndicators } from 'models/Strategy';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import SeparatorPoint from 'images/separator-point.svg';
import { useDeviceType } from 'components/shared/useDeviceType';
interface StrategyIndicatorsProps {
  indicators: IIndicators;
}

export const StyledRow = styled(Row)`
  padding-top: 0.4375rem;
  & > * {
    flex: 0 0 auto;
    width: auto;
  }
`;
const StrategyIndicators: React.FC<StrategyIndicatorsProps> = ({
  indicators,
}): React.ReactElement => {
  const { available, isSufficient, isStation } = indicators;
  const { isMobile } = useDeviceType();
  return (
    <StyledRow
      className={`justify-content-${
        isMobile ? 'start' : 'end'
      } align-items-center`}
    >
      <Col className="indicator-text">
        {`Capacité réservé restante `}
        <b>{available}</b>
      </Col>
      <Col className="ps-1 pe-1">
        <img src={SeparatorPoint} alt="separator" />
      </Col>
      <Col className="indicator-text">
        {`CR `}

        <b>{isSufficient !== null ? 'Suffisant' : 'Insuffisant'}</b>
      </Col>
      <Col className="ps-1 pe-1">
        <img src={SeparatorPoint} alt="separator" />
      </Col>
      <Col className="indicator-text">
        {`Poste en projet `}
        <b>{isStation !== null ? 'OUI' : 'NON'}</b>
      </Col>
    </StyledRow>
  );
};

export default StrategyIndicators;
