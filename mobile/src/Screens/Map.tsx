import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { useQuery, gql } from "@apollo/client";
import { GetPinsQuery } from "../gql/graphql";

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

export default function Map() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const { data, loading, error, refetch } = useQuery<GetPinsQuery>(GET_PINS, {
    fetchPolicy: "cache-and-network",
  });

  console.log(data?.pins);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView showsUserLocation={true} style={styles.map}>
        {data?.pins.map((pin) => {
          return (
            <Marker
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
        })}
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
});
