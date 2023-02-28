import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Select, { MultiValue } from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  CreatePinMutation,
  CreatePinMutationVariables,
  GetCategoriesQuery,
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
    description
    latitude
    longitude
    createdAt
  }
}
`;

const CreatePin = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
      toast.success(`Pin ${name} a été créé avec succès.`);
      console.log(name, address, categories, description, latitude, longitude);
      setName("");
      setAddress("");
      setCategories([]);
      setDescription("");
      setLatitude(0);
      setLongitude(0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Text fontSize={32} textTransform="uppercase">
        Ajouter un nouveau Pin
      </Text>

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
        <Select options={optionsCategoies} isMulti onChange={handleSelect} />
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
      <Button onClick={onSubmit} colorScheme="teal" mt={3}>
        Envoyer
      </Button>
    </>
  );
};

export default CreatePin;
