import { useEffect, useState, useMemo, useRef } from "react";
import { Marker, Popup, TileLayer, useMap, Tooltip } from "react-leaflet";
import { DragMarker, PinMarker, FavedMarker } from "components/PinMarkers";

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

export default Location