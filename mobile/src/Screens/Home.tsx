import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import { RootStackScreenProps } from "../../types";

const Home = ({ navigation, route }: RootStackScreenProps<"Home">) => {
  return (
    <>
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.textStyle}>Manger un morceau</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.textStyle}>Se Connecter</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  centeredView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
