import styled from "styled-components";
import { MapContainer, Popup } from 'react-leaflet'
import Loader from "../../components/Loader";
import {  ModalContent, ModalFooter } from "@chakra-ui/react";


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

export const LeafletContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
  font-family: 'Fredoka';
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

export const Overlay = styled.div`
  display: flex;
  font-size: 1.3rem;
  position: absolute;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%)
`

export const ControlBoard = styled.div`
  margin: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
  diplay: flex;
`

export const Infos = styled.div`
  display: flex;
  color: #99EF9D;
  font-size: 1.3rem;
`
 export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
 `

 export const PinModalFooter = styled(ModalFooter)`
 `
 export const SmallText = styled.span`
  font-size: 0.8rem;
  opacity: 0.8;
 `
 export const PinModalContent = styled(ModalContent)`
 background-color: #222231 !important;
 color: white !important;
 `
export const Slideshow = styled.div`
overflow: scroll;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const RatingColor = styled.div`
  color: #FBC63F;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.2rem;
`

