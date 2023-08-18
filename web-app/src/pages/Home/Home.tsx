import { useEffect, useState, useMemo, useRef } from 'react';

import {
  SIGN_IN_PATH,
  MAP_PATH
} from "../paths";

import {
  RedButton, 
  BlueButton, 
  HollowButtonTitle
} from "../../styles/base-styles"

import { 
  MenuColumn,
  MenuRow,
  Logo
} from "./Home.styled";


import PinMeLogo from "../../media/logoFull.png";
import { FaUser, FaHeart, FaRandom } from 'react-icons/fa';



const Home = () => {

  return (
    <MenuColumn>
      <Logo src={PinMeLogo} />
      <p> (staging) </p>
      <HollowButtonTitle rounded>J’ai envie de...</HollowButtonTitle>
      <BlueButton to={MAP_PATH}>Manger un morceau</BlueButton>
      <BlueButton to={MAP_PATH}>Découvrir des choses</BlueButton>
      <BlueButton to={MAP_PATH}>Prendre l’air</BlueButton>
      <BlueButton to={MAP_PATH}>Voir un lieu insolite</BlueButton>
      <RedButton to={`#`}>Autre chose !</RedButton>
      <MenuRow> 
        <RedButton to={`#`} icon> <FaHeart/> </RedButton>
        <RedButton to={`#`} icon> <FaRandom/> </RedButton> 
        <RedButton to={SIGN_IN_PATH} icon> <FaUser/> </RedButton> 
      </MenuRow>
    </MenuColumn>
  );
};

export default Home;
