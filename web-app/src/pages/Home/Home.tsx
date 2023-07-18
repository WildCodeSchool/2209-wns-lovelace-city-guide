import { useEffect, useState, useMemo, useRef } from 'react';
import { gql, useQuery } from "@apollo/client";

import {
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
  Logo,
  Selector,
  SearchBar
} from "./Home.styled";

import PinMeLogo from "../../media/logoFull.png";
import { FaUser, FaHeart, FaRandom } from 'react-icons/fa';
import { IoEnter } from "react-icons/io5";

import { GetCategoriesQuery } from 'gql/graphql';

const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      categoryName
    }
  }
`;

const Home = () => {
  const [pickCategory, setPickCategory] = useState('')
  
  const { data, loading, error } = useQuery<GetCategoriesQuery>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }

  );
  const renderCategoriesPicker = () => {
    const handleChange = (event:any) => {
      setPickCategory(event.target.value);
    };

    return (
      <Selector value={pickCategory} name="pets" id="pet-select" onChange={handleChange} >
          <option > Afficher tout </option>
        {loading && <option value=''> loading </option> }
        {error && error.message}
        {!data?.categories.length && "Aucune catégorie" }
        {data?.categories.map((category) => {
          return (
            <option value={category.id}> {category.categoryName} </option>
          )
        })}
      </Selector>
    )
  }

  return (
    <MenuColumn>
      <Logo src={PinMeLogo} />
        <label>
          <HollowButtonTitle rounded>Je cherche...</HollowButtonTitle>
      <SearchBar>
          {renderCategoriesPicker()}
        <BlueButton to={MAP_PATH} state={{category: pickCategory}} icon><IoEnter/></BlueButton>
      </SearchBar>
        </label>
        <RedButton to={MAP_PATH} state={{favoris: true}}> <FaHeart/> &nbsp; Mes favoris </RedButton>
        {/* <RedButton to={`#`}> <FaRandom/> </RedButton>  */}
        <RedButton to={PROFILE_PATH} > <FaUser/> &nbsp; Mon profil </RedButton> 
    </MenuColumn>
  );
};

export default Home;