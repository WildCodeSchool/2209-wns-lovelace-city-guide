import styled, { css } from "styled-components";
import { APP_FUNCTIONAL_WIDTH } from "./style-constants";

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