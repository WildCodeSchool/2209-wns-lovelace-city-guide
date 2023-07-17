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
  Selector
} from "./Home.styled";

import PinMeLogo from "../../media/logoFull.png";
import { FaUser, FaHeart, FaRandom } from 'react-icons/fa';
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
  const { data, loading, error } = useQuery<GetCategoriesQuery>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );
    
  const [pickCategory, setPickCategory] = useState(data?.categories[0].id)
  const renderCategoriesPicker = () => {
    const handleChange = (event:any) => {
      setPickCategory(event.target.value);
    };

    return (
      <Selector value={pickCategory} name="pets" id="pet-select" onChange={handleChange} >
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
        {renderCategoriesPicker()}
      </label>
      <BlueButton to={MAP_PATH} state={{category: pickCategory}}>C'est parti</BlueButton>
      <BlueButton to={MAP_PATH}>Afficher tout</BlueButton>
      <MenuRow> 
        <RedButton to={MAP_PATH} state={{category: 'Favoris'}} icon> <FaHeart/> </RedButton>
        <RedButton to={`#`} icon> <FaRandom/> </RedButton> 
        <RedButton to={PROFILE_PATH} icon> <FaUser/> </RedButton> 
      </MenuRow>
    </MenuColumn>
  );
};

export default Home;
