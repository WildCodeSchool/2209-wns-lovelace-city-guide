import { gql, useQuery } from "@apollo/client";
import { MyProfileQuery } from "gql/graphql";
import React, { createContext, useEffect, useState } from "react";

const MY_PROFILE = gql`
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
  refetch: () => void;
};

export const AppContext = createContext<ValueType | null>(null);

export function ContextProvider({ children }: any) {
  const { data, error, refetch } = useQuery<MyProfileQuery | null>(MY_PROFILE);
  const [userProfile, setUserProfile] = useState<MyProfileQuery | null>(null);

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data, error]);

  return (
    <AppContext.Provider value={{ userProfile, refetch }}></AppContext.Provider>
  );
}
