import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import Navigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cookie from "cookie";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL_API_URL = "http://192.168.1.15:4000";

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const cookies = context.response.headers.get("Set-Cookie");
    if (cookies) {
      const sessionId = cookie.parse(cookies);
      const setCookie = cookie.serialize("sessionId", sessionId.sessionId);
      console.log(setCookie, "set-cookie");
      AsyncStorage.setItem("Cookie", setCookie);
    }
    return response;
  });
});

const authLink = setContext(async (_, { headers }) => {
  const sessionId = await AsyncStorage.getItem("Cookie");
  return {
    headers: {
      ...headers,
      Cookie: sessionId,
    },
  };
});

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });

const client = new ApolloClient({
  link: authLink.concat(authMiddleware).concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
