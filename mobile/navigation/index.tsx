import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../src/Screens/Home";
import CreatePinScreen from "../src/Screens/CreatePinScreen";
import MapScreen from "../src/Screens/MapScreen";
import SignInScreen from "../src/Screens/SignInScreen";
import SignUpScreen from "../src/Screens/SignUpScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "#222231" } }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="CreatePin" component={CreatePinScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
