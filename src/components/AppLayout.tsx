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
import { StrategyDetails } from './strategy/StrategyDetails';

const AppLayout: React.FC = () => {
  const { filtersContext, setFiltersContext } =
    useContext<FiltersContextType>(FiltersContext);

  const { strategyContext, setStrategyContext } =
    useContext<StrategyContextType>(StrategyContext);
  const {
    openStrategy,
    openMap,
    openStrategyDetails,
    selectedStrategies,
    selectedStrategy,
  } = strategyContext;

  const { isMobile, isTablet } = useDeviceType();
  const isDesktop = !isMobile && !isTablet;

  console.log(openStrategy);

  useEffect(() => {
    // Check is Desktop: to display Carte & Strategy
    if (isDesktop) {
      setStrategyContext({
        ...strategyContext,
        openMap: true,
        openStrategy: true,
      });
    }
  }, [strategyContext.openMap, strategyContext.openStrategy]);

  const handleOpenSearch = (): void => {
    setFiltersContext({
      ...filtersContext,
      openSearch: true,
    });
  };

  const handleOpenMap = (): void => {
    setStrategyContext({
      ...strategyContext,
      openMap: true,
      openStrategy: false,
      openStrategyDetails: false,
    });
  };

  const handleOpenStrategy = (): void => {
    setStrategyContext({
      ...strategyContext,
      openMap: true,
      openStrategy: true,
      openStrategyDetails: false,
    });
  };

  const isSelectedMobile =
    openStrategyDetails === true && selectedStrategy !== null
      ? 'selected-mobile'
      : '';
  const isSelectedStrategy =
    openStrategyDetails === true && selectedStrategies.length > 0
      ? 'selected-strategy'
      : '';

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
                handleOpenSearch();
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
                    handleOpenStrategy();
                  }}
                  aria-controls="collapse-carte"
                  aria-expanded={openMap}
                  variant="secondary"
                  size="sm"
                  className={`btn-display-strategy btn-list d-lg-none ${isSelectedMobile} ${isSelectedStrategy}`}
                >
                  <img src={List_bulleted} className="search-icon" />
                  Afficher la liste
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleOpenMap();
                  }}
                  aria-controls="collapse-strategy"
                  aria-expanded={openStrategy}
                  variant="secondary"
                  size="sm"
                  className={`btn-display-strategy d-lg-none ${isSelectedMobile} ${isSelectedStrategy}`}
                >
                  <img src={List_bulleted} className="search-icon" />
                  Afficher la carte
                </Button>
              )}
            </>
          )}

        {filtersContext.isSent &&
          openStrategy !== undefined &&
          openStrategy && (
            <Col xxl="6" lg="7" md="12" sm="12" className="strategy">
              <Collapse in={openStrategy}>
                <div id="collapse-strategy">
                  <Strategy />
                </div>
              </Collapse>
            </Col>
          )}

        {filtersContext.isSent &&
          selectedStrategy != null &&
          openStrategyDetails !== undefined &&
          openStrategyDetails && (
            <Col
              md="12"
              className={`strategy-mobile ${
                selectedStrategies.length > 0 ? 'selected' : ''
              }`}
            >
              <StrategyDetails id={selectedStrategy} />
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
