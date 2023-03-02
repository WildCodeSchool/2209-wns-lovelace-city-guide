import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import Select, { MultiValue } from "react-select";
import { useState } from "react";
import {
  CreatePinMutation,
  CreatePinMutationVariables,
  GetCategoriesQuery,
} from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import NavbarPage from "../../components/Navbar/NavbarPage";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PATH } from "pages/paths";

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      categoryName
    }
  }
`;

const CREATE_PIN = gql`
  mutation createPin(
    $name: String!
    $address: String!
    $categories: [String!]!
    $description: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createPin(
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
        id
        categoryName
      }
      description
      latitude
      longitude
      createdAt
    }
  }
`;
const CreatePin = () => {
  let { state } = useLocation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(state.position.lat);
  const [longitude, setLongitude] = useState(state.position.lng);
  const toast = useToast();

  const navigate = useNavigate();

  const { data, loading, error } = useQuery<GetCategoriesQuery>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const [createPin] = useMutation<
    CreatePinMutation,
    CreatePinMutationVariables
  >(CREATE_PIN);

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
    setCategories(selected);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await createPin({
        variables: {
          name,
          address,
          categories,
          description,
          latitude,
          longitude,
        },
      });
      toast({
        title: `Pin ${name} a été créé avec succès.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setName("");
      setAddress("");
      setCategories([]);
      setDescription("");
      setLatitude(0);
      setLongitude(0);
      navigate(HOME_PATH);
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
      <NavbarPage />
      <Flex width="full" align="center" justifyContent="center">
        <Box
          bg="#fff"
          p={8}
          width="500px"
          maxWidth="800px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Ajoute un Pin</Heading>
          </Box>
          <Box my={4} textAlign="left">
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
                value={state.position.lat}
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
                value={state.position.lng}
                onChange={(event) => {
                  setLongitude(parseFloat(event.target.value));
                }}
              />
            </FormControl>
            <Button onClick={onSubmit} colorScheme="teal" width="full" mt={4}>
              Envoyer
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default CreatePin;
