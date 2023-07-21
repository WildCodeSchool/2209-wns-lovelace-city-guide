import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { SignInMutation, SignInMutationVariables } from "../gql/graphql";
import { NavigationContainer } from "@react-navigation/native";

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

function ModalLogin() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { loading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);

  const submit = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Se Connecter</Text>
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
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Se connecter</Text>
      </Pressable>
    </View>
  );
}

export default ModalLogin;

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
  modalView: {
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
