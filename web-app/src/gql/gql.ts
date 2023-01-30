/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query MyProfile {\n    myProfile {\n      emailAddress\n    }\n  }\n": types.MyProfileDocument,
    "\n  query getPins {\n    pins {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n": types.GetPinsDocument,
    "\n  query GetPinById($getPinByIdId: String!) {\n    getPinById(id: $getPinByIdId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n": types.GetPinByIdDocument,
    "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n": types.SignUpDocument,
};

export function graphql(source: "\n  query MyProfile {\n    myProfile {\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      emailAddress\n    }\n  }\n"];
export function graphql(source: "\n  query getPins {\n    pins {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getPins {\n    pins {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"];
export function graphql(source: "\n  query GetPinById($getPinByIdId: String!) {\n    getPinById(id: $getPinByIdId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPinById($getPinByIdId: String!) {\n    getPinById(id: $getPinByIdId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"];
export function graphql(source: "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;