import { useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";

import {
  Infos,
} from "./Map.styled";

import { FavButton } from "../../styles/base-styles";

import { useMutation, gql } from "@apollo/client";
import {
  AddPinToUserFavoriteMutation,
  AddPinToUserFavoriteMutationVariables,
  RemovePinFromUserFavoriteMutation,
  RemovePinFromUserFavoriteMutationVariables,
} from "../../gql/graphql";
import PinMeLogo from "../../media/logo.png";
import { FaHeart, FaTree } from "react-icons/fa";
import { MdAccessible, MdChildFriendly } from "react-icons/md";

import { DragMarker, PinMarker, FavedMarker } from "components/PinMarkers";
import { getErrorMessage } from "utils";

import "./TooltipStyle.css";
import { useToast } from "@chakra-ui/react";

const ADD_PIN_TO_USER_FAVORITE = gql`
  mutation addPinToUserFavorite($pinId: String!) {
    addPinToUserFavorite(pinId: $pinId) {
      id
      name
    }
  }
`;

const REMOVE_PIN_FROM_USER_FAVORITE = gql`
  mutation removePinFromUserFavorite($pinId: String!) {
    removePinFromUserFavorite(pinId: $pinId) {
      id
      name
    }
  }
`;

type PropType = {
  id: string;
  name: string;
  categories: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  isOutdoor: boolean;
  isAccessible: boolean;
  isChildFriendly: boolean;
  isFavorite: boolean;
};

const Pin = ({
  id,
  name,
  categories,
  latitude,
  longitude,
  address,
  description,
  isOutdoor,
  isAccessible,
  isChildFriendly,
  isFavorite,
}: PropType) => {
  const [isFaved, setIsFaved] = useState(isFavorite);

  const toast = useToast();

  const [favoritePin] = useMutation<
    AddPinToUserFavoriteMutation,
    AddPinToUserFavoriteMutationVariables
  >(ADD_PIN_TO_USER_FAVORITE);

  const [removePin] = useMutation<
    RemovePinFromUserFavoriteMutation,
    RemovePinFromUserFavoriteMutationVariables
  >(REMOVE_PIN_FROM_USER_FAVORITE);

  const onSubmitFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    const pinId = id;
    setIsFaved(!isFaved);

    if (isFaved) {
      try {
        event.preventDefault();
        await removePin({
          variables: {
            pinId,
          },
        });
        toast({
          title: `Pin a été supprimé de la liste de favoris.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: getErrorMessage(error),
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        event.preventDefault();
        await favoritePin({
          variables: {
            pinId,
          },
        });
        toast({
          title: `Pin a été ajouté dans la liste de favoris.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: getErrorMessage(error),
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Marker
      position={[latitude, longitude]}
      icon={isFaved ? FavedMarker : PinMarker}
    >
      <Tooltip>{name}</Tooltip>
      <Popup>
        <header className="row title">
          <span>{name}</span>
        </header>
        <div className="row">
          
          <p> 
            <span>{categories}</span> 
            <br/>
            {description}</p>
          <FavButton onClick={onSubmitFavorite} fave={isFaved ? true : false}>
            {" "}
            <FaHeart />{" "}
          </FavButton>
        </div>
        <footer>
          <p className="adress">{address}</p>
          <Infos>
            {" "}
            {isAccessible && <MdAccessible title="Acessible PMR" />}{" "}
            {isOutdoor && <FaTree title="En exterieur" />}{" "}
            {isChildFriendly && <MdChildFriendly title="Famillial" />}{" "}
          </Infos>
        </footer>
      </Popup>
    </Marker>
  );
};

export default Pin
