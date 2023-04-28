import { useEffect, useState, useMemo, useRef } from "react";
import { Marker, Popup, TileLayer, useMap, Pane, Tooltip } from "react-leaflet";

import {
  LeafletContainer,
  PinPopup,
  Container,
  MapLoader,
  Header,
  Logo,
  ControlBoard,
  Infos
} from "./Map.styled";

import {
  RedButton,
  BtnBlueRounded,
  BtnYellowRounded,
  BtnRedRounded,
  FavButton
} from "../../styles/base-styles";

import { useQuery, useMutation, gql } from "@apollo/client";
import { GetPinsQuery, GetPinsFromUserFavoritesQuery,   AddPinToUserFavoriteMutation,
  AddPinToUserFavoriteMutationVariables,
  RemovePinFromUserFavoriteMutation,
  RemovePinFromUserFavoriteMutationVariables} from "../../gql/graphql";
import PinMeLogo from "../../media/logo.png";
import { FaHome, FaHeart, FaTree } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdAccessible, MdChildFriendly } from "react-icons/md";

import { DragMarker, PinMarker, FavedMarker } from "components/PinMarkers";
import { getErrorMessage } from "utils";

import "./TooltipStyle.css";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { HOME_PATH } from "pages/paths";

const userId = "db792161-00a0-4ada-9a52-78715979834f";

const GET_PINS = gql`
  query GetPins {
    pins {
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
query GetPinsFromUserFavorites($userId: String!) {
  getPinsFromUserFavorites(userId: $userId) {
    id
  }
}`

const ADD_PIN_TO_USER_FAVORITE = gql`
  mutation addPinToUserFavorite($pinId: String!, $userId: String!) {
    addPinToUserFavorite(pinId: $pinId, userId: $userId) {
      id
      name
      # currentUser {
      #   id
      #   firstName
      # }
    }
  }
`;

const REMOVE_PIN_FROM_USER_FAVORITE = gql`
mutation removePinFromUserFavorite($userId: String!, $pinId: String!) {
  removePinFromUserFavorite(userId: $userId, pinId: $pinId) {
    id
    name
  }
}`



type PropType = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  isOutdoor: boolean;
  isAccessible: boolean;
  isChildFriendly: boolean;
  isFavorite: boolean;
};

const Pin = ({
  id,
  name,
  latitude,
  longitude,
  address,
  description,
  isOutdoor,
  isAccessible,
  isChildFriendly,
  isFavorite
}: PropType) => {
  
  const [isFaved, setIsFaved] = useState(isFavorite);

  const toast = useToast();
  console.log(isFavorite)
  const [favoritePin] = useMutation<
    AddPinToUserFavoriteMutation,
    AddPinToUserFavoriteMutationVariables
  >(ADD_PIN_TO_USER_FAVORITE);

  const [removePin] = useMutation<
    RemovePinFromUserFavoriteMutation,
    RemovePinFromUserFavoriteMutationVariables
  >(REMOVE_PIN_FROM_USER_FAVORITE);


  const onSubmitFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    const pinId = id;
    setIsFaved(!isFaved)

      if(isFaved) {
        try {
          event.preventDefault();
          await removePin({
            variables: {
              pinId,
              userId,
            },
          });
          toast({
            title: `Pin a été supprimé de la liste de favoris.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Something went wrong",
            description: getErrorMessage(error),
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        try {
          event.preventDefault();
          await favoritePin({
            variables: {
              pinId,
              userId,
            },
          });
          toast({
            title: `Pin a été ajouté dans la liste de favoris.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Something went wrong",
            description: getErrorMessage(error),
            duration: 9000,
            isClosable: true,
          });
        }
      }
  };

  return (
    <Marker position={[latitude, longitude]} icon={isFaved ? FavedMarker : PinMarker}>
      <Tooltip>{name}</Tooltip>
      <Popup>
        <header className="row title">
          <span>{name}</span>
        </header>
        <div className="row">
          <p>{description}</p>
          <FavButton onClick={onSubmitFavorite} fave={isFaved ? true : false} > <FaHeart /> </FavButton>
        </div>
        <footer>
          <p className="adress">{address}</p>
          <Infos> {isAccessible && <MdAccessible title="Acessible PMR"/> } {isOutdoor && <FaTree title="En exterieur"/> } {isChildFriendly && <MdChildFriendly title="Famillial"/> }  </Infos>
        </footer>
      </Popup>
    </Marker>
  );
};

// const PopUp = (name, description, adress) => {
//   return (
//     <div>
//       <header className='row title'>
//         <span>{name}</span>
//       </header>
//       <div className='row'>
//         <p>{description}</p>
//         <button className='favBtn'><FaHeart/></button>
//       </div>
//       <footer>
//         <p className='adress'>{address}</p>
//       </footer>
//     </div>
//   )
// }
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

type LocationPropType = { position: any; setPosition: (argument: any) => void };

const Location = ({ position, setPosition }: LocationPropType) => {
  const map = useMap();
  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
        //  console.log(e.target.getLatLng())
      },
    }),
    []
  );

  useEffect(() => {
    map.locate({
      setView: true,
    });
    map.on("locationfound", (event) => {
      !position && setPosition(event.latlng);
    });
  }, [map]);

  return position ? (
    <>
      <Marker
        icon={DragMarker}
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      />
    </>
  ) : null;
};

const Home = () => {
  const [newPin, setNewPin] = useState(false);
  // const [newPinLocation, setNewPinLocation] = useState<any | null>(null);
  const [position, setPosition] = useState<any[] | [] | null>(null);

  const { data: userFavoritePins } = useQuery<GetPinsFromUserFavoritesQuery>(
    GET_FAVORITE_PIN, 
    {
    variables: { userId }
  });

  const { data, loading, error, refetch } = useQuery<GetPinsQuery>(GET_PINS, {
    fetchPolicy: "cache-and-network",
  });

  const renderMainContent = () => {
    if (loading) {
      return <MapLoader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.pins?.length) {
      return "Aucun pin à afficher.";
    }
    return (
      <>
        {newPin && <Location setPosition={setPosition} position={position} />}
        {data.pins.map((pin) => (
          <Pin
            key={pin.id}
            id={pin.id}
            name={pin.name}
            latitude={pin.latitude}
            longitude={pin.longitude}
            address={pin.address}
            description={pin.description}
            isAccessible={pin.isAccessible}
            isOutdoor={pin.isOutdoor}
            isChildFriendly={pin.isChildFriendly}
            isFavorite={userFavoritePins !== undefined && userFavoritePins.getPinsFromUserFavorites.find(o => o.id === pin.id) ? true : false}
          />
        ))}
      </>
    );
  };
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
          {renderMainContent()}
        </LeafletContainer>
        <ControlBoard>
          <CreateNewPin
            newPin={newPin}
            setNewPin={setNewPin}
            position={position}
          />
        </ControlBoard>
      </Container>
    </>
  );
};

export default Home;
