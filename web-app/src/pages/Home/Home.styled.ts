import styled from "styled-components";
import { MapContainer, Popup } from 'react-leaflet'

export const LeafletContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
`;

export const PinPopup = styled(Popup)`
  position: fixed;
`

export const CardRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Container = styled.section`
  position: relative;
`

export const CreateNewPin = styled.button`
  margin: 10px;
  padding: 6px;
  border-radius: 15px;
  background-color: #93CFD2;
  box-shadow: 3px 3px 0 #31777A;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

