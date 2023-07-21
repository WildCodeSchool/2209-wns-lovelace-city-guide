import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import {
  CreatePinMutation,
  CreatePinMutationVariables,
  GetCategoriesQuery,
} from "../gql/graphql";
import { RootStackScreenProps } from "../../types";

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
    $city: String!
    $zipcode: String!
    $categories: [String!]!
    $description: String!
    $latitude: Float!
    $longitude: Float!
    $isAccessible: Boolean!
    $isChildFriendly: Boolean!
    $isOutdoor: Boolean!
  ) {
    createPin(
      name: $name
      address: $address
      city: $city
      zipcode: $zipcode
      categories: $categories
      description: $description
      latitude: $latitude
      longitude: $longitude
      isAccessible: $isAccessible
      isChildFriendly: $isChildFriendly
      isOutdoor: $isOutdoor
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
      isAccessible
      isChildFriendly
      isOutdoor
      city
      zipcode
    }
  }
`;
export default function CreatePinScreen({
  navigation,
  route,
}: RootStackScreenProps<"CreatePin">) {
  const { dragablePosition } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(dragablePosition.latitude);
  const [longitude, setLongitude] = useState(dragablePosition.longitude);
  const [isAccessible, setIsAccessible] = useState(false);
  const [isChildFriendly, setIsChildFriendly] = useState(false);
  const [isOutdoor, setIsOutdoor] = useState(false);

  const { data } = useQuery<GetCategoriesQuery>(GET_CATEGORIES, {
    fetchPolicy: "cache-and-network",
  });

  const [createPin] = useMutation<
    CreatePinMutation,
    CreatePinMutationVariables
  >(CREATE_PIN);

  const renderOptions = () => {
    const result = data?.categories?.map((category) => ({
      id: category.id,
      value: category.categoryName,
    }));
    return result;
  };

  const optionsCategoies = renderOptions() as {}[];

  const handleCheckIsAccessible = () => {
    setIsAccessible(!isAccessible);
  };

  const handleCheckIsChildFriendly = () => {
    setIsChildFriendly(!isChildFriendly);
  };

  const handleCheckIsOutDoor = () => {
    setIsOutdoor(!isOutdoor);
  };

  const onSubmit = async () => {
    console.log(categories);
    try {
      await createPin({
        variables: {
          name,
          address,
          city,
          zipcode,
          categories,
          description,
          latitude,
          longitude,
          isAccessible,
          isChildFriendly,
          isOutdoor,
        },
      });
      console.log(
        name,
        address,
        city,
        zipcode,
        categories,
        description,
        latitude,
        longitude,
        isAccessible,
        isChildFriendly,
        isOutdoor
      );
      navigation.navigate("Map");
      setName("");
      setAddress("");
      setCity("");
      setZipcode("");
      setCategories([]);
      setDescription("");
      setLatitude(0);
      setLongitude(0);
      setIsAccessible(false);
      setIsChildFriendly(false);
      setIsOutdoor(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.inputBoxView}>
          <Text style={styles.titleText}>Ajoute un Pin</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onChangeText={(name) => setName(name)}
            defaultValue={name}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            onChangeText={(address) => setAddress(address)}
            defaultValue={address}
            value={address}
          />
          <TextInput
            style={styles.input}
            placeholder="Ville"
            onChangeText={(city) => setCity(city)}
            defaultValue={city}
            value={city}
          />
          <TextInput
            style={styles.input}
            placeholder="Code Postal"
            onChangeText={(zipcode) => setZipcode(zipcode)}
            defaultValue={zipcode}
            value={zipcode}
          />
          <MultipleSelectList
            data={optionsCategoies}
            label="Catégories"
            setSelected={(value: any) => setCategories(value)}
            notFoundText="Catégorie non trouvable"
            badgeStyles={{ backgroundColor: "#31777A" }}
          />
          <TextInput
            style={styles.textarea}
            multiline={true}
            numberOfLines={5}
            placeholder="Description"
            onChangeText={(description) => setDescription(description)}
            defaultValue={description}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={latitude.toString()}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={longitude.toString()}
            keyboardType="numeric"
          />
          <BouncyCheckbox
            size={20}
            fillColor="#31777A"
            unfillColor="#b4eaef"
            text="Acessible"
            iconStyle={{ borderColor: "#31777A" }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={(isChecked: boolean) => {
              handleCheckIsAccessible;
            }}
          />
          <BouncyCheckbox
            size={20}
            fillColor="#31777A"
            unfillColor="#b4eaef"
            text="Child Friendly"
            iconStyle={{ borderColor: "#31777A" }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={(isChecked: boolean) => {
              handleCheckIsChildFriendly;
            }}
          />
          <BouncyCheckbox
            size={20}
            fillColor="#31777A"
            unfillColor="#b4eaef"
            text="Outdoor"
            iconStyle={{ borderColor: "#31777A" }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={(isChecked: boolean) => {
              handleCheckIsOutDoor;
            }}
          />
          <Pressable style={[styles.buttonSubmit]} onPress={() => onSubmit()}>
            <Text style={styles.textStyle}>Envoyer</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    margin: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBoxView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderRadius: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "#b4eaef",
    margin: 10,
    shadowColor: "#31777A",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderWidth: 2,
    borderColor: "#31777A",
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  textarea: {
    width: "100%",
    padding: 10,
    backgroundColor: "#b4eaef",
    height: 100,
    textAlignVertical: "top",
    shadowColor: "#31777A",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderWidth: 2,
    borderColor: "#31777A",
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  titleText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonSubmit: {
    backgroundColor: "#FF8787",
    padding: 10,
    margin: 8,
    display: "flex",
    justifyContent: "center",
    shadowColor: "#912B2B",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderWidth: 2,
    borderColor: "#912B2B",
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
