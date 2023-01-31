import { Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LeafletContainer } from "./Home.styled";
import Loader from "../../components/Loader";
import { useQuery, gql } from "@apollo/client";

// const GET_WILDERS = gql`
//   query GetWilders {
//     wilders {
//       id
//       firstName
//       lastName
//       skills {
//         id
//         skillName
//       }
//     }
//   }
// `;

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
  // const { data, loading, error, refetch } = useQuery<GetWildersQuery>(
  //   GET_WILDERS,
  //   { fetchPolicy: "cache-and-network" }
  // );

  const renderMainContent = () => {
    // if (loading) {
    //   return <Loader />;
    // }
    // if (error) {
    //   return error.message;
    // }
    // if (!data?.wilders?.length) {
    //   return "Aucun wilder à afficher.";
    // }
    return (
      <LeafletContainer center={[45.75, 4.85]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {data.wilders.map((wilder) => (
        <Pin
          key={wilder.id}
          id={wilder.id}
          name={wilder.firstName}
          latitude={45 + Math.random()}
          longitude={4 + Math.random()}
        />
      ))} */}
      </LeafletContainer>
    );
  };

  return <>{renderMainContent()}</>;
};

export default Home;
