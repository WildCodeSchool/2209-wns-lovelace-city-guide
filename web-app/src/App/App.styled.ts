import styled from "styled-components";
import { Link } from "react-router-dom";

import { MAIN_THEME_COLOR } from "../styles/style-constants";
import { baseContainerStyles, baseTitleStyles } from "../styles/base-styles";

export const Container = styled.div`
  ${baseContainerStyles}
`;

export const MainContainer = styled.main`
  padding: 0;
`;

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

export const Footer = styled.footer`
  border-top: 2px solid ${MAIN_THEME_COLOR};
`;

export const PageTitle = styled.h1`
  ${baseTitleStyles}
  font-size: 40px;
`;

export const PageTitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
