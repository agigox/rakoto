import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useDeviceType } from '../shared/useDeviceType';
import ImgMarker from 'images/marker.svg';
import L from 'leaflet';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

interface AddressMarkerProps {
  lat: number;
  lng: number;
  label?: string;
}

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 0.1875rem;
    .leaflet-popup-content {
      margin: 0.3125rem 0.625rem;
    }
  }
`;

const AddressMarker: React.FC<AddressMarkerProps> = ({
  lng,
  lat,
  label,
}: AddressMarkerProps): React.ReactElement => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);

  const MapMarker = new L.Icon({
    iconUrl: ImgMarker,
    iconAnchor: [12, 46],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });

  const { isDesktop } = useDeviceType();

  return (
    <Marker
      position={[lat, lng]}
      icon={MapMarker}
      draggable={true}
      eventHandlers={{
        mouseover: (e: L.LeafletMouseEvent) => e.target.openPopup(),
        mouseout: (e: L.LeafletMouseEvent) => e.target.closePopup(),
      }}
    >
      {isDesktop && (
        <StyledPopup closeButton={false} offset={[-6, 18]}>
          <Row className="flex-column text-center">
            <Col className="fw-bold">{label}</Col>
          </Row>
        </StyledPopup>
      )}
    </Marker>
  );
};

export default AddressMarker;
