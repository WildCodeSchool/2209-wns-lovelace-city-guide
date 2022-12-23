import { gql, useMutation } from "@apollo/client";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  UpdatePinMutation,
  UpdatePinMutationVariables,
} from "../../gql/graphql";
import { getErrorMessage } from "../../utils";

const UPDATE_PIN = gql`
  mutation UpdatePin(
    $id: ID!
    $name: String!
    $address: String!
    $category: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    updatePin(
      id: $id
      name: $name
      address: $address
      category: $category
      description: $description
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
    }
  }
`;

type updatePinModalProps = {
  id: string;
  name: string;
  address: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
};

const UpdatePinModal = (pin: updatePinModalProps) => {
  const [updatePin] = useMutation<
    UpdatePinMutation,
    UpdatePinMutationVariables
  >(UPDATE_PIN);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(pin.id);
  const [name, setName] = useState(pin.name);
  const [address, setAddress] = useState(pin.address);
  const [category, setCategory] = useState(pin.category);
  const [description, setDescription] = useState(pin.description);
  const [latitude, setLatitude] = useState(pin.latitude);
  const [longitude, setLongitude] = useState(pin.longitude);

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await updatePin({
        variables: {
          id,
          name,
          address,
          category,
          description,
          latitude,
          longitude,
        },
      });
      toast.success(`succès.`);
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Modifier</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier ce Pin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Adresse</FormLabel>
              <Input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Catégorie</FormLabel>
              <Input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="textarea"
                id="description"
                name="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Latitude</FormLabel>
              <Input
                type="number"
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={(event) => {
                  setLatitude(parseFloat(event.target.value));
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Longitude</FormLabel>
              <Input
                type="number"
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={(event) => {
                  setLongitude(parseFloat(event.target.value));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} colorScheme="teal" mr={3}>
              Sauvegarder
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePinModal;
