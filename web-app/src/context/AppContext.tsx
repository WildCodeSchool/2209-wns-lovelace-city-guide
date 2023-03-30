import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { MyProfileQuery } from "gql/graphql";
import React, { createContext, useEffect, useState } from "react";

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      firstName
      lastName
      emailAddress
      userStatus
    }
  }
`;

type ValueType = {
  userProfile: MyProfileQuery | null;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<MyProfileQuery | null>>;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: any) {
  const { data, refetch } = useQuery<MyProfileQuery | null>(MY_PROFILE);
  const [userProfile, setUserProfile] = useState<MyProfileQuery | null>(null);

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data]);

  return (
    <AppContext.Provider value={{ userProfile, refetch }}>
      {children}
    </AppContext.Provider>
  );
}
