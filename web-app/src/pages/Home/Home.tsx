import { 
  Marker, 
  Popup, 
  TileLayer, 
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import { LeafletContainer } from "./Home.styled";
import Loader from "../../components/Loader";
import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../../gql/graphql";
import markerIcon from "../../media/markers/marker.png"
import shadowIcon from "../../media/markers/shadow.png"
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


const PinMarker  = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: shadowIcon,

  iconSize:     [51, 68], // size of the icon
  shadowSize:   [48, 64], // size of the shadow
  iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 82],  // the same for the shadow
  popupAnchor:  [6, -76] // point from which the popup should open relative to the iconAnchor
})

type PropType = { id: string; name: string; latitude: number; longitude: number; address: string; description: string;}

const Pin = ({ id, name, latitude, longitude, address, description }: PropType) => {
  return (
    <Marker 
    position={[latitude, longitude]}
    icon={ PinMarker }
    >
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
  );
};

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />      
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
    <>
      {renderMainContent()}
    </>
  );
};

export default Home;
