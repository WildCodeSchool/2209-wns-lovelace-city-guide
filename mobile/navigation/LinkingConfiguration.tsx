import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: {
        screens: {
          Map: {
            screens: {
              MapScreen: "Map",
              CreatePin: {
                screens: {
                  CreatePinScreen: "CreatePin",
                  screens: {
                    MapScreen: "Map",
                  },
                },
              },
            },
          },
          SignIn: {
            screens: {
              SignInScreen: "SignIn",
            },
          },
          SignUp: {
            screens: {
              SignUpScreen: "SignUp",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
