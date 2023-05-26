import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import Close from 'images/close.svg';

export const StyledRow = styled(Row)`
  margin: 0.75rem 1.1875rem;
`;
interface StrategySearchProps {
  length: number;
  onHideList: () => void;
}

const StrategySearch: React.FC<StrategySearchProps> = ({
  length,
  onHideList,
}) => {
  return (
    <StyledRow className="align-items-center">
      <Col md="3" xs="7" className="search-text">
        Résultat de recherche :
      </Col>
      <Col md="3" xs="4" className="search-text fw-bold">{`${length} Stratégie${
        length === 1 ? '' : 's'
      }`}</Col>
      <Col onClick={onHideList} md="6" xs="1" className="text-end">
        <img src={Close} alt="close" />
      </Col>
    </StyledRow>
  );
};

export default StrategySearch;
