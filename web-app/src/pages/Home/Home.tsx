import { useEffect, useState, useMemo, useRef } from 'react';
import { 
  Marker, 
  Popup, 
  TileLayer, 
  useMap,
  Pane,
  Tooltip
} from 'react-leaflet';
import { 
  LeafletContainer, 
  PinPopup, 
  PickPinLoc,
  SetPinLoc,
  Container,
  MapLoader,
  Header,
  Logo,
  HomeBtn
} from "./Home.styled";
import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../../gql/graphql";
import PinMeLogo from "../../media/logo.png";
import { FaHome } from 'react-icons/fa';

import { DragMarker, PinMarker } from 'components/PinMarkers';


import "./TooltipStyle.css"
import { FaHeart } from 'react-icons/fa';


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


type PropType = { id: string; name: string; latitude: number; longitude: number; address: string; description: string;}

const Pin = ({ id, name, latitude, longitude, address, description }: PropType) => {
  return (
    <Marker 
    position={[latitude, longitude]}
    icon={ PinMarker }
    >
      <Tooltip>
        {name}
      </Tooltip>
      <Popup>
        <header className='row title'>
          <span>{name}</span>
        </header>
        <div className='row'>
          <p>{description}</p>
          <button className='favBtn'><FaHeart/></button>
        </div>
        <footer>
          <p className='adress'>{address}</p>
        </footer>
      </Popup>
    </Marker>
  )
}

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


const Home = () => {
  const [newPin, setNewPin] = useState(false);
  const [newPinLocation, setNewPinLocation] = useState<any | null>(null);


  const { data, loading, error, refetch } = useQuery<GetPinsQuery>(
    GET_PINS,
    { fetchPolicy: "cache-and-network" }
  );

  function CreateNewPin() {
    if (!newPin) {
      return (
        <PickPinLoc onClick={() => setNewPin(true)}>
          Ajouter un pin
        </PickPinLoc>
      )
    }
    if (newPin) {
      return (
        <SetPinLoc >
          On le met ici ?
        </SetPinLoc>
      )
    }
  }

  
  const Location = () => {
    const map = useMap();
    const markerRef = useRef(null)
    const [position, setPosition] = useState<any | null>(null)
  
    const eventHandlers = useMemo(
      () => ({
        dragend(e: any) {
          console.log(e.target.getLatLng())
        },
      }),
      [],
    )
  

    useEffect(() => {
      map.locate({
        setView: true
      })
      map.on('locationfound', (event) => {
        !position &&
        setPosition(event.latlng)
      })
    }, [map])
  
    return position
    ? (
      <>
        <Marker icon={ DragMarker } 
        draggable={true} 
        eventHandlers={eventHandlers} 
        position={position}
        ref={markerRef} />
      </>
    )
    : null
  }


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
        {newPin && (
          <Location/>
          )
        }
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
      <HomeBtn><FaHome/></HomeBtn> 
      <Logo src={PinMeLogo} />
    </Header>
    <Container>
      <LeafletContainer center={[45.750, 4.85]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
      {renderMainContent()}
      </LeafletContainer>
      <CreateNewPin/>
    </Container>
    </>
  );
};

export default Home;
