import L from 'leaflet';
import React, { useContext } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import styled from 'styled-components';
import { MAP_URL } from 'utils/constants';
import FiltersContext from 'context/FiltersContext';
import { type StrategyContextType, type FiltersContextType } from 'types';
import StrategyContext from 'context/StrategyContext';
import CustomPolygon from './CustomPolygon';
import { Collapse } from 'react-bootstrap';
import CustomMarker from 'components/shared/CustomMarker';

const StyledDiv = styled.div`
  .leaflet-container {
    width: 100%;
    height: 100vh;
    max-width: 100%;
  }
`;

export const Map: React.FC = () => {
  const { filtersContext } = useContext<FiltersContextType>(FiltersContext);
  const { strategyContext } = useContext<StrategyContextType>(StrategyContext);
  const { length } = strategyContext.data;
  const center = L.latLng(48.8588897, 2.320041);
  const zoom = 13;

  return (
    <StyledDiv>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        minZoom={7}
        maxZoom={40}
        zoomControl={false}
        dragging={true}
        doubleClickZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={MAP_URL}
        />
        <ZoomControl position="bottomleft" />
        {filtersContext.coordinates?.lng !== 0 &&
          filtersContext.coordinates?.lat !== 0 && (
            <Collapse in={strategyContext.openMap}>
              <div id="collapse-carte">
                {length > 0 ? (
                  <>
                    <CustomMarker
                      lng={Number(filtersContext.coordinates?.lng)}
                      lat={Number(filtersContext.coordinates?.lat)}
                      label={filtersContext.coordinates?.label}
                      position={true}
                    />
                    <CustomPolygon />
                  </>
                ) : (
                  <CustomMarker
                    lng={Number(filtersContext.coordinates?.lng)}
                    lat={Number(filtersContext.coordinates?.lat)}
                    label={filtersContext.coordinates?.label}
                    position={true}
                  />
                )}
              </div>
            </Collapse>
          )}
      </MapContainer>
    </StyledDiv>
  );
};

export default Map;
