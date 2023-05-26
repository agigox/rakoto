import React from 'react';
import Logo from 'images/logo.svg';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Header: React.FC = () => {
  const title = 'RAKOTO';

  const StyledRow = styled(Row)`
    padding: 0.625rem 0;
  `;

  return (
    <Container fluid>
      <StyledRow>
        <Col>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <div className="separator"></div>
            <h1>{title}</h1>
          </div>
        </Col>
      </StyledRow>
    </Container>
  );
};

export default Header;
