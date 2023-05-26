import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background: transparent;
  height: 100%;
  .spinner-border {
    width: 3rem;
    height: 3rem;
    position: relative;
    margin: 0 auto;
    display: flex;
    top: 50%;
    bottom: 50%;
    font-size: 23px;
    z-index: 9999;
  }
`;
export const Loading: React.FC = () => {
  return (
    <StyledContainer>
      <div className="spinner-border" role="status"></div>
    </StyledContainer>
  );
};
