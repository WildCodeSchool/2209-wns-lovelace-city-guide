import { useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";

import {
  Infos,
  Footer,
  PinModalFooter,
  SmallText,
  PinModalContent,
  Slideshow,
  Row
} from "./Map.styled";
import { FavButton, BtnBlueRounded  } from "../../styles/base-styles";

import { useMutation, gql } from "@apollo/client";
import {
  AddPinToUserFavoriteMutation,
  AddPinToUserFavoriteMutationVariables,
  RemovePinFromUserFavoriteMutation,
  RemovePinFromUserFavoriteMutationVariables,
} from "../../gql/graphql";
import { FaHeart, FaPlus, FaTree } from "react-icons/fa";

import { MdAccessible, MdChildFriendly } from "react-icons/md";

import { DragMarker, PinMarker, FavedMarker } from "components/PinMarkers";
import { getErrorMessage } from "utils";

import "./TooltipStyle.css";
import { Image, Button, Card, CardBody, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";

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
  categories: any;
  images: any;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  zipcode: string;
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
  images,
  latitude,
  longitude,
  address,
  city,
  zipcode,
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

  const BasicUsage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <BtnBlueRounded onClick={onOpen}> Voir +</BtnBlueRounded> 
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'/>
          <PinModalContent>
            <ModalHeader> 
              <h1>
                {name} 
              </h1>
              <br/> 
              <SmallText>
                {categories[0].categoryName} {categories[1] && '/ ' + categories[1].categoryName}  
              </SmallText>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div className="row">
              <p>
                {description}
              </p>
                <p>
                <FavButton onClick={onSubmitFavorite} fave={isFaved ? true : false}>
                  {" "}
                  <FaHeart />{" "}
                </FavButton>
                </p>
            </div>
            <div className="row">
              <SmallText>
              {address} <br/>
              {zipcode}, {city}
              </SmallText>
              <Infos>
                {isAccessible && <MdAccessible title="Acessible PMR" />}{" "}
                {isOutdoor && <FaTree title="En exterieur" />}{" "}
                {isChildFriendly && <MdChildFriendly title="Famillial" />}{" "}
              </Infos>
            </div>
            {images[0] && (
              <>
              <h2>Galerie</h2>
              <Slideshow> 
                <Row>
                {images.map((image: any) => (
                        <Image
                          objectFit="cover"
                          key={image.id}
                          src={`/uploader/${image.fileName}`}
                          fallbackSrc='https://via.placeholder.com/150'
                          alt={image.fileName}
                          mr="1rem"
                        />
                  ))}
                  </Row>
              </Slideshow>
              </>
            )}
            </ModalBody>
  
            <PinModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </PinModalFooter>
          </PinModalContent>
        </Modal>
      </>
    )
  }
  

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
            {description}
          </p>
            <p>
            <FavButton onClick={onSubmitFavorite} fave={isFaved ? true : false}>
              {" "}
              <FaHeart />{" "}
            </FavButton>
            </p>
        </div>
        <Footer>
          <Infos>
            {isAccessible && <MdAccessible title="Acessible PMR" />}{" "}
            {isOutdoor && <FaTree title="En exterieur" />}{" "}
            {isChildFriendly && <MdChildFriendly title="Famillial" />}{" "}
          </Infos>
          
          <BasicUsage />
        </Footer>
      </Popup>
    </Marker>
  );
};

export default Pin
