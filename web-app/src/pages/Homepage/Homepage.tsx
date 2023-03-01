import { useEffect, useState, useMemo, useRef } from 'react';

import {
  BtnRedSquare, 
  BtnBlueSquare,
  BtnBlueRounded, 
  BtnYellowRounded, 
  BtnRedRounded
} from "../../styles/base-styles"

import { 
  MenuColumn,
  Logo
} from "./Homepage.styled";


import PinMeLogo from "../../media/logo.png";
import { FaHome, FaHeart } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';



const Home = () => {

  return (
    <MenuColumn>
      <Logo src={PinMeLogo} />
      <BtnRedRounded>J’ai envie de...</BtnRedRounded>
      <BtnBlueSquare>Manger un morceau</BtnBlueSquare>
      <BtnBlueSquare>Découvrir des choses</BtnBlueSquare>
      <BtnBlueSquare>Prendre l’air</BtnBlueSquare>
      <BtnBlueSquare>Voir un lieu insolite</BtnBlueSquare>
      <BtnRedSquare>Autre chose !</BtnBlueSquare>
    </MenuColumn>
  );
};

export default Home;
