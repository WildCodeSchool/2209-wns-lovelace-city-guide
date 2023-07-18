import styled, { css } from "styled-components";
import { APP_FUNCTIONAL_WIDTH } from "./style-constants";
import { Link } from "react-router-dom";

export const baseTitleStyles = css`
  margin: 0 0 0.35em;
`;

export const baseContainerStyles = css`
  max-width: ${APP_FUNCTIONAL_WIDTH};
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
`;

export const Paragraph = styled.p`
  margin: 0 0 1.15em;
`;

export const SectionTitle = styled.h2`
  ${baseTitleStyles}
  font-size: 28px;
`;

export const RedButton = styled(Link)<{rounded?:boolean, icon?:boolean, light?:boolean}>`
  display: flex;
  justify-content: center;
  margin: 5px;
  text-align: center;
  padding: ${props => props.icon ? "8px" : "5px"};
  color: ${props => props.light ? "white" : "#222231"} ;
  font-size: ${props => props.icon ? "1.3rem" : "1.2rem"};
  border-radius: ${props => props.rounded ? "25px" : "0px"};
  background-color: #FF8787;
  box-shadow: 3px 3px 0 #912B2B;
  transition: 0.1s;
  &:hover, :focus {
    opacity: 0.9;
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

export const BlueButton = styled(RedButton)`
  background-color: #93CFD2;
  box-shadow: 3px 3px 0 #31777A;
`;

export const YellowButton = styled(RedButton)`
  background-color: #FFEE93;
  box-shadow: 3px 3px 0 #EFAA59;
`;

export const HollowButtonTitle = styled.h1<{rounded:boolean}>`
text-align: center;
padding: 5px;
font-size: 1.2rem;
background-color: #FF8787;
margin: 10px ;
// box-shadow: -3px -3px 0 #912B2B;
`;

export const FavButton = styled.button<{fave?:boolean}>`
  margin: 5px;
  text-align: center;
  padding: 8px;
  color: ${props => props.fave ? "#FF8787" : "#222231"} ;
  font-size: 1.3rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 3px 3px 0 #888;
  transition: 0.1s;
  &:hover, :focus {
    opacity: 0.9;
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;


export const DashboardButton = styled(BlueButton)`
  padding: 1rem;
  font-size: 3rem;
  margin: auto;
`;

export const BtnRedSquare = styled.button`
  padding: 8px;
  color: #222231;
  font-size: 1.2rem;
  background-color: #FF8787;
  box-shadow: 3px 3px 0 #912B2B;
`;

export const BtnBlueRounded = styled.button`
  margin: 10px;
  padding: 6px;
  border-radius: 15px;
  background-color: #93CFD2;
  box-shadow: 3px 3px 0 #31777A;
`;

export const BtnYellowRounded = styled.button`
  margin: 10px;
  padding: 6px;
  border-radius: 15px;
  background-color: #FFEE93;
  box-shadow: 3px 3px 0 #EFAA59;
`;

export const BtnRedRounded = styled.button`
  margin: 10px;
  padding: 6px;
  border-radius: 15px;
  background-color: #FF8787;
  box-shadow: 3px 3px 0 #912B2B;
  color: #fff;
`;