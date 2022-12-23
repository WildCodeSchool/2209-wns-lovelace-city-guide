/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query MyProfile {\n    myProfile {\n      emailAddress\n    }\n  }\n": types.MyProfileDocument,
    "\n  mutation DeletePin($id: String!) {\n    deletePin(id: $id) {\n      id\n      name\n    }\n  }\n": types.DeletePinDocument,
    "\n  mutation UpdatePin(\n    $id: ID!\n    $name: String!\n    $address: String!\n    $category: String!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    updatePin(\n      id: $id\n      name: $name\n      address: $address\n      category: $category\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n    }\n  }\n": types.UpdatePinDocument,
    "\n  mutation DeleteWilder($id: String!) {\n    deleteWilder(id: $id) {\n      id\n      firstName\n    }\n  }\n": types.DeleteWilderDocument,
    "\n  query GetPins {\n    pins {\n      id\n      name\n      address\n      category\n      description\n      latitude\n      longitude\n      isOutdoor\n      isAccessible\n      isChildFriendly\n      createdAt\n    }\n  }\n": types.GetPinsDocument,
    "\n  mutation CreatePin(\n    $name: String!\n    $address: String!\n    $category: String!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    createPin(\n      name: $name\n      address: $address\n      category: $category\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n      category\n      address\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n": types.CreatePinDocument,
    "\n  mutation CreateWilder($firstName: String!, $lastName: String!) {\n    createWilder(firstName: $firstName, lastName: $lastName) {\n      id\n      firstName\n    }\n  }\n": types.CreateWilderDocument,
    "\n  query GetWilders {\n    wilders {\n      id\n      firstName\n      lastName\n      skills {\n        id\n        skillName\n      }\n    }\n  }\n": types.GetWildersDocument,
    "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n": types.SignUpDocument,
};

export function graphql(source: "\n  query MyProfile {\n    myProfile {\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      emailAddress\n    }\n  }\n"];
export function graphql(source: "\n  mutation DeletePin($id: String!) {\n    deletePin(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePin($id: String!) {\n    deletePin(id: $id) {\n      id\n      name\n    }\n  }\n"];
export function graphql(source: "\n  mutation UpdatePin(\n    $id: ID!\n    $name: String!\n    $address: String!\n    $category: String!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    updatePin(\n      id: $id\n      name: $name\n      address: $address\n      category: $category\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePin(\n    $id: ID!\n    $name: String!\n    $address: String!\n    $category: String!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    updatePin(\n      id: $id\n      name: $name\n      address: $address\n      category: $category\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n    }\n  }\n"];
export function graphql(source: "\n  mutation DeleteWilder($id: String!) {\n    deleteWilder(id: $id) {\n      id\n      firstName\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWilder($id: String!) {\n    deleteWilder(id: $id) {\n      id\n      firstName\n    }\n  }\n"];
export function graphql(source: "\n  query GetPins {\n    pins {\n      id\n      name\n      address\n      category\n      description\n      latitude\n      longitude\n      isOutdoor\n      isAccessible\n      isChildFriendly\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPins {\n    pins {\n      id\n      name\n      address\n      category\n      description\n      latitude\n      longitude\n      isOutdoor\n      isAccessible\n      isChildFriendly\n      createdAt\n    }\n  }\n"];
export function graphql(source: "\n  mutation CreatePin(\n    $name: String!\n    $address: String!\n    $category: String!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    createPin(\n      name: $name\n      address: $address\n      category: $category\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n      category\n      address\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePin(\n    $name: String!\n    $address: String!\n    $category: String!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    createPin(\n      name: $name\n      address: $address\n      category: $category\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n      category\n      address\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"];
export function graphql(source: "\n  mutation CreateWilder($firstName: String!, $lastName: String!) {\n    createWilder(firstName: $firstName, lastName: $lastName) {\n      id\n      firstName\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWilder($firstName: String!, $lastName: String!) {\n    createWilder(firstName: $firstName, lastName: $lastName) {\n      id\n      firstName\n    }\n  }\n"];
export function graphql(source: "\n  query GetWilders {\n    wilders {\n      id\n      firstName\n      lastName\n      skills {\n        id\n        skillName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWilders {\n    wilders {\n      id\n      firstName\n      lastName\n      skills {\n        id\n        skillName\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;