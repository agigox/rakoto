import React, { useContext, useEffect } from 'react';
import Header from 'components/header';
import Search from 'components/search';
import { Button, Col, Container, Collapse, Row } from 'react-bootstrap';
import Strategy from 'components/strategy';
import Map from './map';
import { type StrategyContextType, type FiltersContextType } from 'types';
import FiltersContext from 'context/FiltersContext';
import { Icon } from './shared/Icon';
import StrategyContext from 'context/StrategyContext';
import { useDeviceType } from './shared/useDeviceType';
import List_bulleted from '../images/list_bulleted.svg';

const AppLayout: React.FC = () => {
  const { filtersContext, setFiltersContext } =
    useContext<FiltersContextType>(FiltersContext);

  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);

  const { isMobile, isTablet } = useDeviceType();
  const isDesktop = !isMobile && !isTablet;

  useEffect(() => {
    // Check is Desktop: to display Carte & Strategy
    if (isDesktop) {
      setStrategyContext({
        ...strategyContext,
        openMap: true,
        openStrategy: true,
      });
    }
  }, []);

  const openSearch = (): void => {
    setFiltersContext({
      ...filtersContext,
      openSearch: true,
    });
  };

  const openMap = (): void => {
    setStrategyContext({
      ...strategyContext,
      openMap: true,
      openStrategy: false,
    });
  };

  const openStrategy = (): void => {
    setStrategyContext({
      ...strategyContext,
      openMap: true,
      openStrategy: true,
    });
  };

  return (
    <Container fluid>
      <Row className={`sticky-header`}>
        <Col md="12">
          <Header />
        </Col>
        <Col md="12">
          <Collapse in={filtersContext.openSearch}>
            <div id="collapse-search">
              <Search />
            </div>
          </Collapse>
        </Col>
      </Row>
      <Row className={'sticky-map'}>
        {filtersContext.openSearch !== undefined &&
          !filtersContext.openSearch && (
            <Button
              onClick={() => {
                openSearch();
              }}
              aria-controls="collapse-search"
              aria-expanded={filtersContext.openSearch}
              variant="secondary"
              size="sm"
              className={`btn-display-search d-lg-none`}
            >
              <Icon iconName="Search" color="black" className="search-icon" />
              Recherche
            </Button>
          )}

        {filtersContext.isSent &&
          strategyContext?.openMap !== undefined &&
          strategyContext?.openStrategy !== undefined && (
            <>
              {!strategyContext?.openStrategy ? (
                <Button
                  onClick={() => {
                    openStrategy();
                  }}
                  aria-controls="collapse-carte"
                  aria-expanded={strategyContext.openMap}
                  variant="secondary"
                  size="sm"
                  className={`btn-display-strategy btn-list d-lg-none`}
                >
                  <img src={List_bulleted} className="search-icon" />
                  Afficher la liste
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    openMap();
                  }}
                  aria-controls="collapse-strategy"
                  aria-expanded={strategyContext.openStrategy}
                  variant="secondary"
                  size="sm"
                  className={`btn-display-strategy d-lg-none`}
                >
                  <img src={List_bulleted} className="search-icon" />
                  Afficher la carte
                </Button>
              )}
            </>
          )}

        {filtersContext.isSent &&
          strategyContext.openStrategy !== undefined &&
          strategyContext.openStrategy && (
            <Col xxl="6" lg="7" md="12" sm="12" className="strategy">
              <Collapse in={strategyContext.openStrategy}>
                <div id="collapse-strategy">
                  <Strategy />
                </div>
              </Collapse>
            </Col>
          )}
        <Col
          className={`map ${
            !filtersContext.isSent
              ? 'col-12'
              : 'col-xxl-6 col-lg-5 col-md-12 col-sm-12'
          }`}
        >
          <Map />
        </Col>
      </Row>
    </Container>
  );
};

export default AppLayout;
