import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
// import {
//   CreatePinMutation,
//   CreatePinMutationVariables,
// } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";

// const CREATE_PIN = gql`
//   mutation CreatePin(
//     $name: String!
//     $address: String!
//     $category: String!
//     $description: String!
//     $latitude: Float!
//     $longitude: Float!
//   ) {
//     createPin(
//       name: $name
//       address: $address
//       category: $category
//       description: $description
//       latitude: $latitude
//       longitude: $longitude
//     ) {
//       id
//       name
//       address
//       category
//       description
//       latitude
//       longitude
//       createdAt
//     }
//   }
// `;

const CreatePin = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const [createPin] = useMutation<
  //   CreatePinMutation,
  //   CreatePinMutationVariables
  // >(CREATE_PIN);

  // const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
  //   try {
  //     event.preventDefault();
  //     await createPin({
  //       variables: {
  //         name,
  //         address,
  //         category,
  //         description,
  //         latitude,
  //         longitude,
  //       },
  //     });
  //     toast.success(`Pin ${name} a été créé avec succès.`);
  //     console.log(name, address, category, description, latitude, longitude);
  //     setName("");
  //     setAddress("");
  //     setCategory("");
  //     setDescription("");
  //     setLatitude(0);
  //     setLongitude(0);
  //   } catch (error) {
  //     toast.error(getErrorMessage(error));
  //   }
  // };

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
      {/* <Button onClick={onSubmit} colorScheme="teal" mt={3}>
        Envoyer
      </Button> */}
    </>
  );
};

export default CreatePin;
