import React from "react";
import { Link } from "react-router-dom";
import { RedButton } from "./base-styles";
import styled from "styled-components";

export type LinkProps = React.ComponentProps<typeof Link>;

type BlueButtonProps = {
  rounded?: boolean;
  light?: boolean;
  icon?: boolean;
} & Omit<LinkProps, "rounded" | "light">;

export const BlueButton = styled(({ icon, ...rest }: BlueButtonProps) => (
  <RedButton {...rest} />
))<BlueButtonProps>`
  background-color: #93cfd2;
  box-shadow: 3px 3px 0 #31777a;

  /* Additional styles for the icon */
  ${(props) =>
    props.icon &&
    `
    padding: 8px;
    font-size: 1.3rem;
  `}
`;
