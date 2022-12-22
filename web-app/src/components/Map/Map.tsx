import { 
    MapContainer, 
    TileLayer, 
    useMap 
  } from 'react-leaflet'
  import { LeafletContainer } from "./Map.styled";

  const Map = () => {
    return (
        <LeafletContainer center={[45.750, 4.85]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LeafletContainer>
  );
};

export default Map;