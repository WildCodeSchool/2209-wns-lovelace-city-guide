import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import * as Location from "expo-location";
import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../gql/graphql";
import { RootStackScreenProps } from "../../types";

const GET_PINS = gql`
  query GetPins {
    pins {
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
      isOutdoor
      isAccessible
      isChildFriendly
      createdAt
    }
  }
`;

export default function Map({ navigation }: RootStackScreenProps<"Map">) {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [newPin, setNewPin] = useState<boolean>(false);
  const [dragablePosition, setDragablePosition] = useState({
    latitude: 45.7581,
    longitude: 4.8357,
  });
  const [region, setRegion] = useState({
    latitude: 45.75088588536057,
    latitudeDelta: 0.10482262209595916,
    longitude: 4.840543192529955,
    longitudeDelta: 0.08504697188845611,
  });

  const { data, refetch } = useQuery<GetPinsQuery>(GET_PINS, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    refetch();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  const displayPin = () => {
    return data?.pins.map((pin) => {
      return (
        <Marker
          key={pin.id}
          coordinate={{
            latitude: pin.latitude,
            longitude: pin.longitude,
          }}
          title={pin.name}
        >
          <Callout tooltip>
            <View style={styles.bubble}>
              <Text>{pin.name}</Text>
              <Text>{pin.address}</Text>
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  const CreateNewPin = ({ navigation, newPin }: any) => {
    if (!newPin) {
      return (
        <>
          <Pressable
            style={[styles.button, styles.buttonAddPin]}
            onPress={() => {
              setNewPin(true);
            }}
          >
            <Text style={styles.textStyle}>Ajoute un Pin</Text>
          </Pressable>
        </>
      );
    } else {
      return (
        <>
          <Pressable
            style={[styles.button, styles.buttonPlacePin]}
            onPress={() => {
              navigation.navigate("CreatePin", { dragablePosition });
              setNewPin(false);
            }}
          >
            <Text style={styles.textStyle}>On le met ici ?</Text>
          </Pressable>
        </>
      );
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        onRegionChange={onRegionChange}
        initialRegion={region}
        showsUserLocation={true}
        style={styles.map}
      >
        {displayPin()}
        {newPin && (
          <Marker
            draggable
            pinColor="rgb(21, 43, 214)"
            coordinate={dragablePosition}
            onDragEnd={(e) => setDragablePosition(e.nativeEvent.coordinate)}
          />
        )}
        {CreateNewPin({ newPin, navigation })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonAddPin: {
    backgroundColor: "#ffe894",
  },
  buttonPlacePin: {
    backgroundColor: "#4ec8d3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
