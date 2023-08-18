import { useEffect, useState, useMemo, useRef } from "react";
import { gql, useQuery } from "@apollo/client";

import { MAP_PATH, PROFILE_PATH } from "../paths";

import { RedButton, HollowButtonTitle } from "../../styles/base-styles";
import { BlueButton } from "styles/BlueButton";

import { MenuColumn, MenuRow, Logo, Selector, SearchBar } from "./Home.styled";

import PinMeLogo from "../../media/logoFull.png";
import { FaUser, FaHeart, FaRandom } from "react-icons/fa";
import { IoEnter } from "react-icons/io5";

import { GetCategoriesQuery } from "gql/graphql";

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      categoryName
    }
  }
`;

const Home = () => {
  const [pickCategory, setPickCategory] = useState("");

  const { data, loading, error } = useQuery<GetCategoriesQuery>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const renderCategoriesPicker = () => {
    const handleChange = (event: any) => {
      setPickCategory(event.target.value);
    };
    if (loading) {
      return (
        <Selector
          value={pickCategory}
          name="categories"
          id="categories-select"
          onChange={handleChange}
        >
          <option value="" role="status">
            {" "}
            loading{" "}
          </option>
        </Selector>
      );
    }

    return (
      <Selector
        value={pickCategory}
        name="categories"
        id="categories-select"
        onChange={handleChange}
      >
        <option data-testid="option-all"> Afficher tout </option>

        {error && error.message}
        {!data?.categories.length && "Aucune catégorie"}
        {data?.categories.map((category) => {
          return (
            <option
              data-testid="option-category"
              key={category.id}
              value={category.id}
            >
              {" "}
              {category.categoryName}{" "}
            </option>
          );
        })}
      </Selector>
    );
  };

  return (
    <MenuColumn>
      <Logo src={PinMeLogo} />
      <label>
        <HollowButtonTitle rounded>Je cherche...</HollowButtonTitle>
        <SearchBar>
          {renderCategoriesPicker()}
          <BlueButton to={MAP_PATH} state={{ category: pickCategory }} icon>
            <IoEnter />
          </BlueButton>
        </SearchBar>
      </label>
      <RedButton to={MAP_PATH} state={{ favoris: true }}>
        {" "}
        <FaHeart /> &nbsp; Mes favoris{" "}
      </RedButton>
      {/* <RedButton to={`#`}> <FaRandom/> </RedButton>  */}
      <RedButton to={PROFILE_PATH}>
        {" "}
        <FaUser /> &nbsp; Mon profil{" "}
      </RedButton>
    </MenuColumn>
  );
};

export default Home;
