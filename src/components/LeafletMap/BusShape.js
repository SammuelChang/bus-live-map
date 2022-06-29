import { useRef } from 'react';
import { Popup, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';

const StyledRouteName = styled.h3`
  padding: none;
  margin: none;
  text-align: center;
`;

export default function BusShape({ tdxShape }) {
  const geoJsonRef = useRef();
  const defaultLightStyle = { color: '#6c757d', zIndexOffset: 0, weight: 1 };
  const hieghtLightStyle = { color: '#e63946', zIndexOffset: 1000, weight: 5 };

  const onEachClick = (feature, layer) => {
    function hieghtLight() {
      if (!geoJsonRef.current) return;
      geoJsonRef.current.resetStyle();
      // const { RouteName } = feature.properties;
      // layer.bindTooltip(`<h3>${RouteName}</h3>`);
      layer.setStyle(hieghtLightStyle);
    }

    layer.on({
      click() {
        hieghtLight();
      },
    });
    layer.on({
      mouseover() {
        hieghtLight();
      },
    });
    layer.on({
      mouseout() {
        if (!geoJsonRef.current) return;
        layer.setStyle(defaultLightStyle);
      },
    });
  };

  return tdxShape.map((i) => (
    <GeoJSON
      key={`${i.RouteUID}_${i.SubRouteUID}_${i.RouteName.Zh_tw}_${Date.now()}`}
      data={i.Geojson}
      style={defaultLightStyle}
      ref={geoJsonRef}
      onEachFeature={onEachClick}
    >
      <Popup>
        <StyledRouteName>{i.RouteName.Zh_tw}</StyledRouteName>
      </Popup>
    </GeoJSON>
  ));
}
