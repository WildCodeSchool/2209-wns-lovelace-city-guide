import { useEffect, useState, useMemo, useRef } from 'react';
import { 
  Marker, 
  Popup, 
  TileLayer, 
  useMap,
  Pane,
  Tooltip
} from 'react-leaflet';
import L from 'leaflet';
import { 
  LeafletContainer, 
  PinPopup, 
  CreateNewPin,
  Container
} from "./Home.styled";
import Loader from "../../components/Loader";
import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../../gql/graphql";
import markerIcon from "../../media/markers/marker.png"
import shadowIcon from "../../media/markers/shadow.png"
import draggableIcon from "../../media/markers/draggable.png"

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

const outer = [
  [50.505, -29.09],
  [52.505, 29.09],
]
const inner = [
  [49.505, -2.09],
  [53.505, 2.09],
]


const PinMarker  = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: shadowIcon,

  iconSize:     [42, 57], // size of the icon
  shadowSize:   [38, 55], // size of the shadow
  iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 82],  // the same for the shadow
  popupAnchor:  [6, -76] // point from which the popup should open relative to the iconAnchor
})

const DragMarker  = new L.Icon({
  iconUrl: draggableIcon,
  shadowUrl: shadowIcon,

  iconSize:     [42, 57], // size of the icon
  shadowSize:   [38, 55], // size of the shadow
  iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 82],  // the same for the shadow
  popupAnchor:  [6, -76] // point from which the popup should open relative to the iconAnchor
})

const Location = () => {
  const map = useMap();
  const markerRef = useRef(null)
  const [position, setPosition] = useState<any | null>(null)

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        console.log(e.target.getLatLng()); 
      },
    }),
    [],
  )

  useEffect(() => {
    map.locate({
      setView: true
    })
    map.on('locationfound', (event) => {
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
  const { data, loading, error, refetch } = useQuery<GetPinsQuery>(
    GET_PINS,
    { fetchPolicy: "cache-and-network" }
  );

  const renderMainContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.pins?.length) {
      return "Aucun pin à afficher.";
    }
    return (
      <LeafletContainer center={[45.75, 4.85]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
        <Pane name='fixed' style={{ zIndex: 499 }} />
        <Location/>
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
      ))} */}
      </LeafletContainer>
    );
  };
  return (
    <Container>
      {renderMainContent()}
      <CreateNewPin> Ajouter un pin </CreateNewPin>
    </Container>
  );
};

export default Home;
