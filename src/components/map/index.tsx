import L from 'leaflet';
import React, { useContext } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  ZoomControl,
} from 'react-leaflet';
import styled from 'styled-components';
import { MAP_URL } from 'utils/constants';
import FiltersContext from 'context/FiltersContext';
import { type StrategyContextType, type FiltersContextType } from 'types';
import CustomMarker from '../shared/CustomMarker';
import StrategyContext from 'context/StrategyContext';
import ImgMarker from 'images/marker.svg';
import CustomPolygon from './CustomPolygon';
import { Collapse } from 'react-bootstrap';

const StyledDiv = styled.div`
  .leaflet-container {
    width: 100%;
    height: 100vh;
    max-width: 100%;
  }
`;

const MapMarker = new L.Icon({
  iconUrl: ImgMarker,
  iconAnchor: [12, 46],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
});
export const Map: React.FC = () => {
  const { filtersContext } = useContext<FiltersContextType>(FiltersContext);
  const { strategyContext } = useContext<StrategyContextType>(StrategyContext);
  const { length } = strategyContext.data;
  const { lng, lat } = filtersContext.coordinates ?? {};
  const center = L.latLng(48.8588897, 2.320041);
  const zoom = 13;

  return (
    <StyledDiv>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        minZoom={7}
        maxZoom={30}
        zoomControl={false}
        dragging={true}
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
                  <CircleMarker
                    center={[Number(lat), Number(lng)]}
                    radius={200}
                    pathOptions={{ color: `transparent` }}
                  >
                    <CustomMarker
                      lng={Number(filtersContext.coordinates?.lng)}
                      lat={Number(filtersContext.coordinates?.lat)}
                      icon={MapMarker}
                    >
                      {filtersContext.coordinates?.label}
                    </CustomMarker>
                    <CustomPolygon />
                  </CircleMarker>
                ) : (
                  <CustomMarker
                    lng={Number(filtersContext.coordinates?.lng)}
                    lat={Number(filtersContext.coordinates?.lat)}
                    icon={MapMarker}
                  >
                    {filtersContext.coordinates?.label}
                  </CustomMarker>
                )}
              </div>
            </Collapse>
          )}
      </MapContainer>
    </StyledDiv>
  );
};

export default Map;
