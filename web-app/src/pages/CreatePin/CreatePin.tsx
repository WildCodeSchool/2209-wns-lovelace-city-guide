import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  CreatePinMutation,
  CreatePinMutationVariables,
} from "../../gql/graphql";
import { getErrorMessage } from "../../utils";

const CREATE_PIN = gql`
  mutation CreatePin(
    $name: String!
    $address: String!
    $category: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createPin(
      name: $name
      address: $address
      category: $category
      description: $description
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
      category
      address
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
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [createPin] = useMutation<
    CreatePinMutation,
    CreatePinMutationVariables
  >(CREATE_PIN);

  const submit = async () => {
    try {
      await createPin({
        variables: {
          name,
          address,
          category,
          description,
          latitude,
          longitude,
        },
      });
      toast.success(`Pin ${name} a été créé avec succès.`);
      console.log(name, address, category, description, latitude, longitude);
      setName("");
      setAddress("");
      setCategory("");
      setDescription("");
      setLatitude(0);
      setLongitude(0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Text>Ajouter un nouveau Pin</Text>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}
      >
        <label>Nom</label>
        <input
          type="text"
          required
          id="name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br />
        <label>Adresse</label>
        <input
          type="text"
          required
          id="address"
          name="address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <br />
        <label>Catégorie</label>
        <input
          type="text"
          required
          id="category"
          name="category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <br />
        <label>Description</label>
        <input
          type="text"
          required
          id="description"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <br />
        <label>Latitude</label>
        <input
          type="number"
          required
          id="latitude"
          name="latitude"
          value={latitude}
          onChange={(event) => {
            setLatitude(parseFloat(event.target.value));
          }}
        />
        <br />
        <label>Logitude</label>
        <input
          type="number"
          required
          id="longitude"
          name="longitude"
          value={longitude}
          onChange={(event) => {
            setLongitude(parseFloat(event.target.value));
          }}
        />
        <br />
        <button>Envoyer</button>
      </form>
    </>
  );
};

export default CreatePin;
