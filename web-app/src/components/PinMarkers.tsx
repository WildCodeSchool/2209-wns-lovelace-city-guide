import markerIcon from "../media/markers/marker.png"
import shadowIcon from "../media/markers/shadow.png"
import draggableIcon from "../media/markers/draggable.png"
import favedIcon from "../media/markers/fav.svg"

import L from 'leaflet';

export const PinMarker  = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: shadowIcon,
  
    iconSize:     [42, 57], // size of the icon
    shadowSize:   [38, 55], // size of the shadow
    iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 82],  // the same for the shadow
    popupAnchor:  [6, -76] // point from which the popup should open relative to the iconAnchor
  })
  
export const DragMarker  = new L.Icon({
    iconUrl: draggableIcon,
    shadowUrl: shadowIcon,
  
    iconSize:     [42, 57], // size of the icon
    shadowSize:   [38, 55], // size of the shadow
    iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 82],  // the same for the shadow
    popupAnchor:  [6, -76] // point from which the popup should open relative to the iconAnchor
  })

  export const FavedMarker  = new L.Icon({
    iconUrl: favedIcon,
    shadowUrl: shadowIcon,
  
    iconSize:     [42, 57], // size of the icon
    shadowSize:   [38, 55], // size of the shadow
    iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 82],  // the same for the shadow
    popupAnchor:  [6, -76] // point from which the popup should open relative to the iconAnchor
  })