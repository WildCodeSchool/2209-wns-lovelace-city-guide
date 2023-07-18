import { useState } from "react";
import { TileLayer } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { useContext } from "react";

import {
  LeafletContainer,
  Container,
  MapLoader,
  Header,
  Logo,
  ControlBoard,
  Overlay
} from "./Map.styled";

import Pin from "./Pin"
import Location from "./Location"

import {
  RedButton,
  BtnBlueRounded,
  BtnYellowRounded,
  BtnRedRounded,
} from "../../styles/base-styles";

import { useQuery, gql } from "@apollo/client";
import {
  GetPinsFromUserFavoritesQuery,
  GetPinsByCategoryIdQuery,
} from "../../gql/graphql";
import PinMeLogo from "../../media/logo.png";
import { FaHome } from "react-icons/fa";
import { IoClose, IoAlertCircleOutline, IoHammer } from "react-icons/io5";
import "./TooltipStyle.css";
import { Link } from "react-router-dom";
import { HOME_PATH } from "pages/paths";

const GET_PINS_BY_CATEGORY_ID = gql`
query GetPinsByCategoryId($categoryId: String, $fav: Boolean) {
  getPinsByCategoryId(categoryId: $categoryId, fav: $fav) {
    id
    name
    address
    categories {
      id
      categoryName
    }
    description
    latitude
    longitude
    isOutdoor
    isAccessible
    isChildFriendly
    createdAt
  }
}
`;


const GET_FAVORITE_PIN = gql`
  query GetPinsFromUserFavorites {
    getPinsFromUserFavorites {
      id
    }
  }
`;

type NewPinPropType = {
  newPin: boolean;
  setNewPin: (argument: boolean) => void;
  position: any[] | [] | null;
};

function CreateNewPin({ newPin, setNewPin, position }: NewPinPropType) {
  if (!newPin) {
    return (
      <BtnYellowRounded onClick={() => setNewPin(true)}>
        Ajouter un pin
      </BtnYellowRounded>
    );
  } else {
    return (
      <>
        <Link to="/create-pin" state={{ position: position }}>
          <BtnBlueRounded onClick={() => console.log(position)}>
            On le met ici ?
          </BtnBlueRounded>
        </Link>
        <BtnRedRounded onClick={() => setNewPin(false)}>
          <IoClose />
        </BtnRedRounded>
      </>
    );
  }
}


const Map = () => {
  let { state } = useLocation();
  const appContext = useContext(AppContext);
  const [newPin, setNewPin] = useState(false);
  const [position, setPosition] = useState<any[] | [] | null>(null);


  const { data: userFavoritePins } = useQuery<GetPinsFromUserFavoritesQuery>(
    GET_FAVORITE_PIN,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const { data, loading, error } = useQuery<GetPinsByCategoryIdQuery>(GET_PINS_BY_CATEGORY_ID, {
    variables: { categoryId: state && state.category, fav: state && state.favoris }
  });

  console.log(data?.getPinsByCategoryId)

  const renderMainContent = () => {
    if (loading) {
      return <MapLoader />;
    }
    if (error) {
      return <Overlay> <IoAlertCircleOutline/> {error.message} </Overlay> ;
    }
    if (!data?.getPinsByCategoryId?.length) {
      return <Overlay> <IoHammer/> Aucun pin à afficher. </Overlay>;
    }
    const pins = data.getPinsByCategoryId.map((pin) => (
        <Pin
          key={pin.id}
          id={pin.id}
          name={pin.name}
          categories={pin.categories[0].categoryName}
          latitude={pin.latitude}
          longitude={pin.longitude}
          address={pin.address}
          description={pin.description}
          isAccessible={pin.isAccessible}
          isOutdoor={pin.isOutdoor}
          isChildFriendly={pin.isChildFriendly}
          isFavorite={
            userFavoritePins !== undefined &&
            userFavoritePins.getPinsFromUserFavorites.find(
              (o) => o.id === pin.id
            )
              ? true
              : false
          }
        />
      )
    )
    if (state && state.category === 'Favoris') {
      return pins.filter(pin => pin.props.isFavorite === true);
    } else {
      return pins;
    }
  }
  
  return (
    <>
      <Header>
        <RedButton icon to={HOME_PATH}>
          <FaHome />
        </RedButton>
        <Logo src={PinMeLogo} />
      </Header>
      <Container>
        <LeafletContainer
          center={[45.75, 4.85]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {newPin && <Location setPosition={setPosition} position={position} />}
          {renderMainContent()}
        </LeafletContainer>
          <ControlBoard>
        {appContext?.isLoggedIn ? 
            <CreateNewPin
              newPin={newPin}
              setNewPin={setNewPin}
              position={position}
            />
            : 
            <Link to="/sign-in">
              <BtnBlueRounded>
                Connexion
              </BtnBlueRounded>
            </Link>
          }
          </ControlBoard>
      </Container>
    </>
  );
};

export default Map;
