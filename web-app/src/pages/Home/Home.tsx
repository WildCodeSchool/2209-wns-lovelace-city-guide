import { Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LeafletContainer } from "./Home.styled";
import Loader from "../../components/Loader";
import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../../gql/graphql";

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
};

const Pin = ({ id, name, latitude, longitude }: PropType) => {
  return (
    <Marker position={[latitude, longitude]}>
      <Popup>{name}</Popup>
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
