import { 
    MapContainer, 
    Marker, 
    Popup, 
    TileLayer, 
    useMap 
  } from 'react-leaflet'
  import { LeafletContainer } from "./Map.styled";

  const data = [
    {
      "id" : "1",
      "name" : "Pokebowl",
      "latitude" : 45.750,
      "longitude" : 4.85,
    },
    {
      "id" : "2",
      "name" : "Ramen",
      "latitude" : 45.651,
      "longitude" : 4.82,
    },
    {
      "id" : "3",
      "name" : "Statue",
      "latitude" : 45.758,
      "longitude" : 4.83,
    }
  ]

  type PropType = { id: string; name: string; latitude: number; longitude: number; }

  const Pin = ({ id, name, latitude, longitude }: PropType) => {
    return (
      <Marker position={[latitude, longitude]}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    )
  }

  const RenderPins = () => {
    return (
      <>
      {data.map((pin: { id: string; name: string; latitude: number; longitude: number; }) => (
        <Pin
          id={pin.id}
          name={pin.name}
          latitude={pin.latitude}
          longitude={pin.longitude}
        />
      ))}
      </>
    )
  }

  const Map = () => {
    return (
        <LeafletContainer center={[45.750, 4.85]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />      
          <RenderPins/>
        </LeafletContainer>
        
  );
};

export default Map;