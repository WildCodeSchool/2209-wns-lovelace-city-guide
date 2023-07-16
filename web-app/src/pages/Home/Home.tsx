import { useEffect, useState, useMemo, useRef } from 'react';

import {
  SIGN_IN_PATH,
  MAP_PATH,
  PROFILE_PATH
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
      <HollowButtonTitle rounded>J’ai envie de...</HollowButtonTitle>
      <BlueButton to={MAP_PATH} state={{category: 'Alimentaire'}}>Manger un morceau</BlueButton>
      <BlueButton to={MAP_PATH} state={{category: 'Découverte'}}>Découvrir des choses</BlueButton>
      <BlueButton to={MAP_PATH} state={{category: 'Promenade'}}>Prendre l’air</BlueButton>
      <BlueButton to={MAP_PATH} state={{category: 'Insolite'}}>Voir un lieu insolite</BlueButton>
      <RedButton to={MAP_PATH} >Autre chose !</RedButton>
      <MenuRow> 
        <RedButton to={MAP_PATH} state={{category: 'Favoris'}} icon> <FaHeart/> </RedButton>
        <RedButton to={`#`} icon> <FaRandom/> </RedButton> 
        <RedButton to={PROFILE_PATH} icon> <FaUser/> </RedButton> 
      </MenuRow>
    </MenuColumn>
  );
};

export default Home;
