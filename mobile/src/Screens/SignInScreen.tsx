import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
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
    <View style={styles.centeredView}>
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
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => submit()}
          >
            <Text style={styles.textStyle}>Let's go!</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkStyle}>Pas de compte? Clique ici</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    borderRadius: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "#b4eaef",
    margin: 10,
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
  buttonClose: {
    backgroundColor: "#03a368",
  },
  buttonCancel: {
    backgroundColor: "#f36021",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkStyle: {
    color: "#0b76b8",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
