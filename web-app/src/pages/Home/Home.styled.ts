import styled from "styled-components";
import { MapContainer } from 'react-leaflet'

export const LeafletContainer = styled(MapContainer)`
  width: 100vw;
  height: 500px;
`;

export const CardRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
