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

export const PageTitle = styled.h1`
  ${baseTitleStyles}
  font-size: 40px;
`;

export const PageTitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
