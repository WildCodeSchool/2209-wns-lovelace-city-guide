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
  Image,
} from "react-native";
import { RootStackScreenProps } from "../../types";
import Icon from "react-native-vector-icons/FontAwesome";

const logoPinMe = require("./../media/logoFull.png");
const Home = ({ navigation, route }: RootStackScreenProps<"Home">) => {
  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            style={styles.logoStyle}
            source={logoPinMe}
          />
        </View>
        <Pressable
          style={[styles.buttonMap]}
          onPress={() => navigation.navigate("Map")}
        >
          <View style={styles.buttonContent}>
            <Icon name="map" size={20} style={styles.icon} />
            <Text style={styles.textStyle}>Afficher la carte</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.buttonConnect]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <View style={styles.buttonContent}>
            <Icon name="user" size={20} style={styles.icon} />
            <Text style={styles.textStyle}>Se Connecter</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  centeredView: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100,
  },
  buttonMap: {
    backgroundColor: "#FF8787",
    padding: 14,
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
  buttonConnect: {
    backgroundColor: "#93CFD2",
    padding: 14,
    margin: 8,
    display: "flex",
    justifyContent: "center",
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
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: "#222231",
    textAlign: "center",
    fontSize: 18,
  },
  logoStyle: {
    width: 180,
    height: 180,
  },
  logoContainer: {
    padding: 10,
  },
  icon: {
    marginRight: 8,
    color: "#000",
  },
});
