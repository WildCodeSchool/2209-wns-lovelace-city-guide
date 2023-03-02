import { gql, useMutation, useQuery } from "@apollo/client";
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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import Select, { MultiValue } from "react-select";
import {
  GetCategoriesQuery,
  UpdatePinMutation,
  UpdatePinMutationVariables,
} from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      categoryName
    }
  }
`;
const UPDATE_PIN = gql`
  mutation UpdatePin(
    $pinId: ID!
    $name: String!
    $address: String!
    $categories: [String!]!
    $description: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    updatePin(
      id: $pinId
      name: $name
      address: $address
      categories: $categories
      description: $description
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
      address
      categories {
        categoryName
        id
      }
      description
      latitude
      longitude
    }
  }
`;

type updatePinModalProps = {
  id: string;
  name: string;
  address: string;
  categories: {
    __typename?: "Category" | undefined;
    categoryName: string;
    id: string;
  }[];
  description: string;
  latitude: number;
  longitude: number;
};

const UpdatePinModal = (pin: updatePinModalProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(pin.id);
  const [name, setName] = useState(pin.name);
  const [address, setAddress] = useState(pin.address);
  const [categories, setCategories] = useState(
    pin.categories.map((category) => category.categoryName)
  );
  const [description, setDescription] = useState(pin.description);
  const [latitude, setLatitude] = useState(pin.latitude);
  const [longitude, setLongitude] = useState(pin.longitude);

  const { data, loading, error } = useQuery<GetCategoriesQuery>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [updatePin] = useMutation<
    UpdatePinMutation,
    UpdatePinMutationVariables
  >(UPDATE_PIN);

  const renderSelectedCategories = () => {
    const result = pin.categories.map((category) => ({
      id: category.id,
      value: category.categoryName,
      label: category.categoryName,
    }));
    return result;
  };
  const selectedCategories = renderSelectedCategories();

  const renderOptions = () => {
    const result = data?.categories?.map((category) => ({
      id: category.id,
      value: category.categoryName,
      label: category.categoryName,
    }));
    return result;
  };
  const optionsCategoies = renderOptions();

  const handleSelect = (
    selectedOptions: MultiValue<{
      id: string;
      value: string;
      label: string;
    }>
  ) => {
    const selected = selectedOptions.map((option) => option.value);
    console.log(selected);
    setCategories(selected);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await updatePin({
        variables: {
          pinId: id,
          name,
          address,
          categories,
          description,
          latitude,
          longitude,
        },
      });
      toast({
        title: `Pin ${name} a été modifié avec succès.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: getErrorMessage(error),
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        <FaPen />
      </Button>

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
              <Select
                options={optionsCategoies}
                isMulti
                value={selectedCategories}
                onChange={handleSelect}
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
