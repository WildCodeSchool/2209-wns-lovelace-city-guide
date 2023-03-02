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
} from "./Map.styled";

import {
  RedButton,
  BtnBlueRounded,
  BtnYellowRounded,
  BtnRedRounded,
} from "../../styles/base-styles";

import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../../gql/graphql";
import PinMeLogo from "../../media/logo.png";
import { FaHome, FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { DragMarker, PinMarker } from "components/PinMarkers";

import "./TooltipStyle.css";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { HOME_PATH } from "pages/paths";

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

type PropType = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
};

const Pin = ({
  id,
  name,
  latitude,
  longitude,
  address,
  description,
}: PropType) => {
  return (
    <Marker position={[latitude, longitude]} icon={PinMarker}>
      <Tooltip>{name}</Tooltip>
      <Popup>
        <header className="row title">
          <span>{name}</span>
        </header>
        <div className="row">
          <p>{description}</p>
          <button className="favBtn">
            <FaHeart />
          </button>
        </div>
        <footer>
          <p className="adress">{address}</p>
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
