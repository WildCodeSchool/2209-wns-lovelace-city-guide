import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { SignInMutation, SignInMutationVariables } from "../gql/graphql";
import { RootStackScreenProps } from "../../types";

const SIGN_IN = gql`
  mutation SignIn($emailAddress: String!, $password: String!) {
    signIn(emailAddress: $emailAddress, password: $password) {
      id
      emailAddress
      firstName
      lastName
    }
  }
`;
const logoPinMe = require("./../media/logoFull.png");
export default function SignInScreen({
  navigation,
  route,
}: RootStackScreenProps<"SignIn">) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN
  );

  const submit = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
      navigation.navigate("Map");
    } catch (error) {
      console.log(error);
    }
  };

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
        <View style={styles.boxView}>
          <Text style={styles.titleText}>Se Connecter</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            defaultValue={emailAddress}
            value={emailAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={(password) => setPassword(password)}
            value={password}
            secureTextEntry={true}
          />
          <View style={styles.buttonView}>
            <Pressable style={[styles.buttonGo]} onPress={() => submit()}>
              <Text style={styles.textStyle}>Let's go!</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.linkStyle}>Pas de compte? Clique ici</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
  },
  buttonView: {
    flexDirection: "row",
  },
  boxView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
  buttonGo: {
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
  linkStyle: {
    color: "#028b87",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  logoStyle: {
    width: 180,
    height: 180,
  },
  logoContainer: {
    padding: 10,
  },
});
