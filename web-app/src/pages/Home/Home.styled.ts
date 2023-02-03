import styled from "styled-components";
import { MapContainer, Popup } from 'react-leaflet'
import Loader from "../../components/Loader";


export const Header = styled.header`
  width: 100%;
  max-height: 80px;
  z-index: 9999;
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  color: #fff;
`;

export const Logo = styled.img`
  max-height: 32px;
`

export const HomeBtn = styled.button`
  padding: 8px;
  color: #222231;
  font-size: 1.2rem;
  background-color: #FF8787;
  box-shadow: 3px 3px 0 #912B2B;
`;

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

export const MapLoader = styled(Loader)`
  position: absolute;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%)
`
export const PickPinLoc = styled.button`
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

export const SetPinLoc = styled.button`
  margin: 10px;
  padding: 6px;
  border-radius: 15px;
  background-color: #FFEE93;
  box-shadow: 3px 3px 0 #EFAA59;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;


