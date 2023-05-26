import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { type FiltersContextType } from 'types';
import FiltersContext from 'context/FiltersContext';
import { ClientTypes, EneryTypeLabels } from 'enums';
import DatePicker from './DatePicker';

const StyledRow = styled(Row)`
  .form-label {
    font-weight: 700;
  }

  .contact-form {
    border: 0.0625rem solid #cccccc;
    border-radius: 0.1875rem;
    position: relative;

    .row {
      padding: 1rem;
    }

    h4 {
      font-family: $font-family-open;
      font-style: normal;
      font-weight: 700;
      font-size: 1rem;
      line-height: 0.625rem;
      display: flex;
      align-items: center;
      color: var(--bs-modal-color);
      position: absolute;
      z-index: 999;
      top: -0.625rem;
      left: 0.625rem;
      padding: 0.3125rem 0.625rem;
      z-index: 1;

      &:after {
        content: ' ';
        background-color: #fff;
        width: 100%;
        height: 13px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        z-index: -1;
      }
    }
  }
`;
const ClientForm: React.FC = () => {
  const { filtersContext } = useContext<FiltersContextType>(FiltersContext);

  const handleDateChange = (selectedDate: Date | null): void => {
    console.log('Selected date:', selectedDate);
  };

  return (
    <StyledRow className="flex-column">
      <Col sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Mail Client</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            bsPrefix="form-control-rak"
          />
        </Form.Group>
      </Col>
      <Col>
        <Row className="contact-form mt-2">
          <Col sm={12}>
            <h4>Contact:</h4>
            <Row>
              <Col sm={12}>
                <Form.Group className="mb-2">
                  <Form.Label>Nom du client</Form.Label>
                  <Form.Control type="text" bsPrefix="form-control-rak" />
                </Form.Group>
              </Col>
              {filtersContext.clientType === ClientTypes.PRODUCER && (
                <Col sm={12}>
                  <Form.Group className="mb-2">
                    <Form.Label>{`Type d'énergie`}</Form.Label>
                    <Form.Select>
                      {Object.keys(EneryTypeLabels).map((elt) => {
                        return (
                          <option key={elt} value={elt}>
                            {
                              EneryTypeLabels[
                                elt as keyof typeof EneryTypeLabels
                              ]
                            }
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}
              <Col sm={12}>
                <DatePicker onChange={handleDateChange} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
};

export default ClientForm;
