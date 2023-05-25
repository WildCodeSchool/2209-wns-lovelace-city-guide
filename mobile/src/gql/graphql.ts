/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AppUser = {
  __typename?: 'AppUser';
  emailAddress: Scalars['String']['output'];
  favoritePins: Array<Pin>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  pins?: Maybe<Array<Pin>>;
  userStatus: UserStatus;
};

export type Category = {
  __typename?: 'Category';
  categoryName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pins: Array<Pin>;
};

export type Image = {
  __typename?: 'Image';
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pin: Pin;
};

export type Mutation = {
  __typename?: 'Mutation';
  addImage: Image;
  addImageToPin: Pin;
  addPinToUserFavorite: Pin;
  createCategory: Category;
  createPin: Pin;
  deleteCategory: Category;
  deletePin: Pin;
  removePinFromUserFavorite: Pin;
  signIn: AppUser;
  signOut: AppUser;
  signUp: AppUser;
  updateCategory: Category;
  updatePin: Pin;
};


export type MutationAddImageArgs = {
  fileName: Scalars['String']['input'];
};


export type MutationAddImageToPinArgs = {
  fileName: Scalars['String']['input'];
  pinId: Scalars['String']['input'];
};


export type MutationAddPinToUserFavoriteArgs = {
  pinId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  categoryName: Scalars['String']['input'];
};


export type MutationCreatePinArgs = {
  address: Scalars['String']['input'];
  categories: Array<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  isAccessible: Scalars['Boolean']['input'];
  isChildFriendly: Scalars['Boolean']['input'];
  isOutdoor: Scalars['Boolean']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePinArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePinFromUserFavoriteArgs = {
  pinId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignOutArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  categoryName: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdatePinArgs = {
  address: Scalars['String']['input'];
  categories: Array<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  isAccessible: Scalars['Boolean']['input'];
  isChildFriendly: Scalars['Boolean']['input'];
  isOutdoor: Scalars['Boolean']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type Pin = {
  __typename?: 'Pin';
  address: Scalars['String']['output'];
  categories: Array<Category>;
  createdAt?: Maybe<Scalars['String']['output']>;
  currentUser: AppUser;
  description: Scalars['String']['output'];
  favoriteUsers: Array<AppUser>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Image>>;
  isAccessible: Scalars['Boolean']['output'];
  isChildFriendly: Scalars['Boolean']['output'];
  isOutdoor: Scalars['Boolean']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  getPinById: Pin;
  getPinsFromUserFavorites: Array<Pin>;
  getUsers: Array<AppUser>;
  images: Array<Image>;
  myProfile: AppUser;
  pins: Array<Pin>;
};


export type QueryGetPinByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPinsFromUserFavoritesArgs = {
  userId: Scalars['String']['input'];
};

export enum UserStatus {
  Admin = 'ADMIN',
  BannedUser = 'BANNED_USER',
  User = 'USER'
}

export type GetPinsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPinsQuery = { __typename?: 'Query', pins: Array<{ __typename?: 'Pin', id: string, name: string, address: string, description: string, latitude: number, longitude: number, isOutdoor: boolean, isAccessible: boolean, isChildFriendly: boolean, createdAt?: string | null, categories: Array<{ __typename?: 'Category', id: string, categoryName: string }> }> };


export const GetPinsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"isOutdoor"}},{"kind":"Field","name":{"kind":"Name","value":"isAccessible"}},{"kind":"Field","name":{"kind":"Name","value":"isChildFriendly"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetPinsQuery, GetPinsQueryVariables>;