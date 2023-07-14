import styled from "styled-components";
import { MAIN_THEME_COLOR } from "styles/style-constants";

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem;
  background-color: white;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 5.5rem;
`;

export const Logo = styled.img`
  max-width: 12rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Splashphrase = styled.b`
  color: ${MAIN_THEME_COLOR};
`;
