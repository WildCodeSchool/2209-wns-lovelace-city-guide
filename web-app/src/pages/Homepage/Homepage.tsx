import { useEffect, useState, useMemo, useRef } from 'react';

import {
  RedButton, 
  BlueButton, 
  HollowButtonTitle
} from "../../styles/base-styles"

import { 
  MenuColumn,
  MenuRow,
  Logo
} from "./Homepage.styled";


import PinMeLogo from "../../media/logoFull.png";
import { FaUser, FaHeart, FaRandom } from 'react-icons/fa';



const Home = () => {

  return (
    <MenuColumn>
      <Logo src={PinMeLogo} />
      <HollowButtonTitle rounded>J’ai envie de...</HollowButtonTitle>
      <BlueButton to={`/`}>Manger un morceau</BlueButton>
      <BlueButton to={`/`}>Découvrir des choses</BlueButton>
      <BlueButton to={`/`}>Prendre l’air</BlueButton>
      <BlueButton to={`/`}>Voir un lieu insolite</BlueButton>
      <RedButton to={`#`}>Autre chose !</RedButton>
      <MenuRow> 
        <RedButton to={`#`} icon> <FaHeart/> </RedButton>
        <RedButton to={`#`} icon> <FaRandom/> </RedButton> 
        <RedButton to={`/sign-up`} icon> <FaUser/> </RedButton> 
      </MenuRow>
    </MenuColumn>
  );
};

export default Home;