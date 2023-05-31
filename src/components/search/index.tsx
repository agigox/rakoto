import React, { useContext, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import styled from 'styled-components';
import ClientChips from './ClientChips';
import {
  type StrategyContextType,
  type FiltersContextType,
  type FiltersFormType,
} from 'types';
import FiltersContext from 'context/FiltersContext';
import AutocompleteInput from './AutocompleteInput';
import { getStrategies, postStrategies } from 'services';
import StrategyContext from 'context/StrategyContext';
import { Icon } from 'components/shared/Icon';
import { useDeviceType } from 'components/shared/useDeviceType';

const StyledContainer = styled(Container)`
  background: #f5f5f5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  .search-container {
    .search-item {
      position: relative;
      border-right: 1px solid #e0e0e0;
      @media (max-width: 992px) {
        border-right: none;
      }
      .error_message {
        font-size: 0.6875rem;
        font-weight: 300;
        color: var(--rak-palette-bd_red) !important;
      }
      .serach-input {
        width: 100%;
        padding: 0.625rem;
        font-size: 0.8125rem;
        color: var(--rak-palette-textSearch);
        &.invalid {
          border: 0.0625rem solid var(--rak-palette-bd_red);
        }
      }
      .search-icon {
        position: absolute;
        top: 1.3125rem;
        right: 1.4375rem;
      }
    }
    .separator {
      width: 0px;
      border: 0.0625rem solid #e0e0e0;
    }
    .disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
      pointer-events: none;
      color: white;
    }
    .power {
      position: relative;
      display: inline-block;
      .power-input {
        width: 100%;
        padding: 0.625rem;
        font-size: 0.8125rem;
        color: var(--rak-palette-textSearch);
        &.invalid {
          border: 0.0625rem solid var(--rak-palette-bd_red);
        }
      }
      .power-icon {
        position: absolute;
        top: 18%;
        right: 25%;
        transform: translate(50%, 50%);
        font-size: 0.8125rem;
      }
      .form-control-rak {
        margin: 0.625rem;
        width: 8rem;
        position: relative;
        background-color: rgb(245, 245, 245);

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
      .form-label {
        margin-bottom: 0;
        font-size: 8px;
        font-weight: 500;
        display: inline-block;
        position: absolute;
        top: 3px;
        left: 12px;
        padding: 2px;
        z-index: 1;

        &:after {
          content: ' ';
          background-color: rgb(245, 245, 245);
          width: 100%;
          height: 13px;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: -1;
        }
      }
    }
  }
  .close-search {
    border: 0.0625rem solid #cccccc;
    padding: 0.45rem 0.8rem;
    border-radius: 0.8rem;
  }
`;

const Search: React.FC = () => {
  const { filtersContext, setFiltersContext } =
    useContext<FiltersContextType>(FiltersContext);

  const { isMobile, isTablet } = useDeviceType();
  const isDesktop = !isMobile && !isTablet;

  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const powerValue = Number(e.target.value);
    setFiltersContext({
      ...filtersContext,
      power: powerValue,
    });
  };
  const setFiltersForm = (filters: FiltersFormType): void => {
    setFiltersContext({ ...filtersContext, ...filters });
  };
  const handleSearch = (): void => {
    setStrategyContext({
      ...strategyContext,
      isLoading: true,
    });

    void postStrategies(filtersContext).then((response: any) => {
      void getStrategies().then((res) => {
        setStrategyContext({
          ...strategyContext,
          data: res.data,
          isLoading: false,
        });
      });
    });
    setFiltersContext({
      ...filtersContext,
      isSent: true,
      openSearch: false,
    });
  };
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.focus();
    }
  }, []);

  const isValid = Boolean(
    filtersContext.power > 0 &&
      filtersContext.clientType.length > 0 &&
      filtersContext.coordinates?.label !== '',
  );

  const closeSearch = (): void => {
    setFiltersContext({
      ...filtersContext,
      openSearch: false,
    });
  };

  return (
    <StyledContainer fluid>
      <Row className="search-container align-content-center align-items-center">
        <Col className="search-item search-mobile" lg={3} md={4} sm={6} xs={12}>
          <AutocompleteInput />
        </Col>
        <Col className="search-item" lg={4} md={5} sm={6} xs={12}>
          <ClientChips
            setFiltersForm={setFiltersForm}
            currentClient={filtersContext.clientType}
          />
        </Col>
        <Col lg={2} md={2} sm={4} xs={5}>
          <div className="power">
            <Form.Label htmlFor="basic-url">
              {'Puissance de raccordement'}
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                bsPrefix="form-control-rak"
                className={`power-input`}
                onChange={handleChange}
                value={Number(filtersContext.power).toString()}
              />
            </InputGroup>
            <span className={`power-icon`}>MW</span>
          </div>
        </Col>
        <Col
          lg={3}
          md={4}
          sm={8}
          className={`text-end d-flex  ${
            isDesktop ? 'justify-content-end' : 'justify-content-between'
          }`}
        >
          <Button
            className="my-2 mx-2 d-lg-none d-md-none close-search"
            variant="outline-secondary"
            bsPrefix="btn-rak"
            onClick={closeSearch}
          >
            Fermer <Icon iconName="XLg" color="black" className="" />
          </Button>
          <Button
            className="my-2 mx-2 me-3"
            variant="primary"
            bsPrefix="btn-rak"
            onClick={handleSearch}
            disabled={!isValid}
          >
            générer les stratégies
          </Button>
        </Col>
        {/* <Col lg={5} md={12} sm={12}>
          <Row>
            
          </Row>
        </Col> */}
      </Row>
    </StyledContainer>
  );
};

export default Search;
