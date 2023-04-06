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
  loading: boolean;
  refetch:
    | ((
        variables?: Partial<OperationVariables> | undefined
      ) => Promise<ApolloQueryResult<MyProfileQuery>>)
    | (() => void);
  isLoggedIn: boolean;
  isAdmin: boolean;
};

export const AppContext = createContext<ValueType>({
  userProfile: null,
  loading: true,
  refetch: () => {},
  isLoggedIn: false,
  isAdmin: false,
});

export function ContextProvider({ children }: any) {
  const { data, refetch, error, loading } = useQuery<MyProfileQuery | null>(
    MY_PROFILE
  );
  const [userProfile, setUserProfile] = useState<MyProfileQuery | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (error || !data) {
      setUserProfile(null);
    } else if (data) {
      const userStatus = data?.myProfile.userStatus;
      if (userStatus === "ADMIN") {
        setIsAdmin(true);
      }
      setUserProfile(data);
      setIsLoggedIn(true);
    }
  }, [data, error]);

  return (
    <AppContext.Provider
      value={{
        userProfile,
        loading,
        refetch,
        isLoggedIn,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
