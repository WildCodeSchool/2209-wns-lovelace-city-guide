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
  isAdmin: boolean | undefined;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: any) {
  const { data, refetch, error, loading } = useQuery<MyProfileQuery | null>(
    MY_PROFILE,
    {
      onError: () => {
        setIsAdmin(false);
        setIsLoggedIn(false);
      },
    }
  );
  const [userProfile, setUserProfile] = useState<MyProfileQuery | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (error || !data) {
      setUserProfile(null);
    } else if (data) {
      const userStatus = data?.myProfile.userStatus;
      if (userStatus === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setUserProfile(data);
      setIsLoggedIn(true);
    }
  }, [data, error, isAdmin, isLoggedIn, userProfile]);

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
