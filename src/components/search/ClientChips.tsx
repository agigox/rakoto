import { ClientTypeLabels } from 'enums';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { type FiltersFormType } from 'types';
const StyledContainer = styled(Container)`
  .client-chips {
    column-gap: 10px;
  }
`;
interface ClientChipsProps {
  setFiltersForm: (response: FiltersFormType) => void;
  currentClient: string;
}
const ClientChips: React.FC<ClientChipsProps> = (props: ClientChipsProps) => {
  const { setFiltersForm, currentClient } = props;
  const handleSelect = (clientType: string): void => {
    if (currentClient === clientType) {
      setFiltersForm({ clientType: '', power: 0, isSent: false });
    } else {
      setFiltersForm({ clientType });
    }
  };

  return (
    <StyledContainer className="padding-10">
      <Row className="d-inline-flex flex-nowrap client-chips">
        {Object.keys(ClientTypeLabels).map((elt) => {
          return (
            <Col key={elt}>
              <Button
                className={
                  currentClient === elt && currentClient !== '' ? 'active' : ''
                }
                variant="secondary"
                bsPrefix="btn-rak"
                onClick={() => {
                  handleSelect(elt);
                }}
              >
                {ClientTypeLabels[elt as keyof typeof ClientTypeLabels]}
              </Button>
            </Col>
          );
        })}
      </Row>
    </StyledContainer>
  );
};

export default ClientChips;
