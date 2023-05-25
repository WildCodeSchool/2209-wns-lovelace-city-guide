/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AppUser = {
  __typename?: "AppUser";
  emailAddress: Scalars["String"];
  favoritePins: Array<Pin>;
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  pins?: Maybe<Array<Pin>>;
  userStatus: UserStatus;
};

export type Category = {
  __typename?: "Category";
  categoryName: Scalars["String"];
  id: Scalars["ID"];
  pins: Array<Pin>;
};

export type Image = {
  __typename?: "Image";
  fileName: Scalars["String"];
  id: Scalars["ID"];
  pin: Pin;
};

export type Mutation = {
  __typename?: "Mutation";
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
  fileName: Scalars["String"];
};

export type MutationAddImageToPinArgs = {
  fileName: Scalars["String"];
  pinId: Scalars["String"];
};

export type MutationAddPinToUserFavoriteArgs = {
  pinId: Scalars["String"];
};

export type MutationCreateCategoryArgs = {
  categoryName: Scalars["String"];
};

export type MutationCreatePinArgs = {
  address: Scalars["String"];
  categories: Array<Scalars["String"]>;
  description: Scalars["String"];
  isAccessible: Scalars["Boolean"];
  isChildFriendly: Scalars["Boolean"];
  isOutdoor: Scalars["Boolean"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
  userEmail: Scalars["String"];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["String"];
};

export type MutationDeletePinArgs = {
  id: Scalars["String"];
};

export type MutationRemovePinFromUserFavoriteArgs = {
  pinId: Scalars["String"];
};

export type MutationSignInArgs = {
  emailAddress: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignOutArgs = {
  id: Scalars["String"];
};

export type MutationSignUpArgs = {
  emailAddress: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateCategoryArgs = {
  categoryName: Scalars["String"];
  id: Scalars["String"];
};

export type MutationUpdatePinArgs = {
  address: Scalars["String"];
  categories: Array<Scalars["String"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  isAccessible: Scalars["Boolean"];
  isChildFriendly: Scalars["Boolean"];
  isOutdoor: Scalars["Boolean"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
  userEmail: Scalars["String"];
};

export type Pin = {
  __typename?: "Pin";
  address: Scalars["String"];
  categories: Array<Category>;
  createdAt?: Maybe<Scalars["String"]>;
  currentUser: AppUser;
  description: Scalars["String"];
  favoriteUsers: Array<AppUser>;
  id: Scalars["ID"];
  images?: Maybe<Array<Image>>;
  isAccessible: Scalars["Boolean"];
  isChildFriendly: Scalars["Boolean"];
  isOutdoor: Scalars["Boolean"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  categories: Array<Category>;
  getPinById: Pin;
  getPinsFromUserFavorites: Array<Pin>;
  getUsers: Array<AppUser>;
  images: Array<Image>;
  myProfile: AppUser;
  pins: Array<Pin>;
};

export type QueryGetPinByIdArgs = {
  id: Scalars["String"];
};

export enum UserStatus {
  Admin = "ADMIN",
  BannedUser = "BANNED_USER",
  User = "USER",
}

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyProfileQuery = {
  __typename?: "Query";
  myProfile: {
    __typename?: "AppUser";
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    userStatus: UserStatus;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars["String"];
}>;

export type DeleteCategoryMutation = {
  __typename?: "Mutation";
  deleteCategory: { __typename?: "Category"; id: string; categoryName: string };
};

export type DeletePinMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeletePinMutation = {
  __typename?: "Mutation";
  deletePin: { __typename?: "Pin"; id: string; name: string };
};

export type CreateCategoryMutationVariables = Exact<{
  categoryName: Scalars["String"];
}>;

export type CreateCategoryMutation = {
  __typename?: "Mutation";
  createCategory: { __typename?: "Category"; id: string; categoryName: string };
};

export type UpdateCategoryMutationVariables = Exact<{
  categoryId: Scalars["String"];
  categoryName: Scalars["String"];
}>;

export type UpdateCategoryMutation = {
  __typename?: "Mutation";
  updateCategory: { __typename?: "Category"; id: string; categoryName: string };
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: "Query";
  categories: Array<{
    __typename?: "Category";
    id: string;
    categoryName: string;
  }>;
};

export type UpdatePinMutationVariables = Exact<{
  updatePinId: Scalars["ID"];
  name: Scalars["String"];
  address: Scalars["String"];
  categories: Array<Scalars["String"]> | Scalars["String"];
  description: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  isAccessible: Scalars["Boolean"];
  isChildFriendly: Scalars["Boolean"];
  isOutdoor: Scalars["Boolean"];
  userEmail: Scalars["String"];
}>;

export type UpdatePinMutation = {
  __typename?: "Mutation";
  updatePin: {
    __typename?: "Pin";
    id: string;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    createdAt?: string | null;
    isAccessible: boolean;
    isChildFriendly: boolean;
    isOutdoor: boolean;
    categories: Array<{
      __typename?: "Category";
      categoryName: string;
      id: string;
    }>;
  };
};

export type SignOutMutationVariables = Exact<{
  currentUserId: Scalars["String"];
}>;

export type SignOutMutation = {
  __typename?: "Mutation";
  signOut: { __typename?: "AppUser"; id: string };
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  __typename?: "Query";
  categories: Array<{
    __typename?: "Category";
    id: string;
    categoryName: string;
  }>;
};

export type GetPinsAdminPageQueryVariables = Exact<{ [key: string]: never }>;

export type GetPinsAdminPageQuery = {
  __typename?: "Query";
  pins: Array<{
    __typename?: "Pin";
    id: string;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    createdAt?: string | null;
    isAccessible: boolean;
    isChildFriendly: boolean;
    isOutdoor: boolean;
    categories: Array<{
      __typename?: "Category";
      categoryName: string;
      id: string;
    }>;
    images?: Array<{
      __typename?: "Image";
      id: string;
      fileName: string;
    }> | null;
  }>;
};

export type CreatePinMutationVariables = Exact<{
  name: Scalars["String"];
  address: Scalars["String"];
  categories: Array<Scalars["String"]> | Scalars["String"];
  description: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  isAccessible: Scalars["Boolean"];
  isChildFriendly: Scalars["Boolean"];
  isOutdoor: Scalars["Boolean"];
  userEmail: Scalars["String"];
}>;

export type CreatePinMutation = {
  __typename?: "Mutation";
  createPin: {
    __typename?: "Pin";
    id: string;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    createdAt?: string | null;
    isAccessible: boolean;
    isChildFriendly: boolean;
    isOutdoor: boolean;
    categories: Array<{
      __typename?: "Category";
      id: string;
      categoryName: string;
    }>;
    currentUser: { __typename?: "AppUser"; emailAddress: string };
  };
};

export type GetPinByIdQueryVariables = Exact<{
  pinId: Scalars["String"];
}>;

export type GetPinByIdQuery = {
  __typename?: "Query";
  getPinById: {
    __typename?: "Pin";
    id: string;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    createdAt?: string | null;
    categories: Array<{
      __typename?: "Category";
      id: string;
      categoryName: string;
    }>;
    images?: Array<{
      __typename?: "Image";
      id: string;
      fileName: string;
    }> | null;
  };
};

export type GetPinsFromUserFavoritesQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetPinsFromUserFavoritesQuery = {
  __typename?: "Query";
  getPinsFromUserFavorites: Array<{ __typename?: "Pin"; id: string }>;
};

export type AddPinToUserFavoriteMutationVariables = Exact<{
  pinId: Scalars["String"];
}>;

export type AddPinToUserFavoriteMutation = {
  __typename?: "Mutation";
  addPinToUserFavorite: { __typename?: "Pin"; id: string; name: string };
};

export type RemovePinFromUserFavoriteMutationVariables = Exact<{
  pinId: Scalars["String"];
}>;

export type RemovePinFromUserFavoriteMutation = {
  __typename?: "Mutation";
  removePinFromUserFavorite: { __typename?: "Pin"; id: string; name: string };
};

export type AddImageToPinMutationVariables = Exact<{
  fileName: Scalars["String"];
  pinId: Scalars["String"];
}>;

export type AddImageToPinMutation = {
  __typename?: "Mutation";
  addImageToPin: {
    __typename?: "Pin";
    id: string;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    createdAt?: string | null;
    categories: Array<{
      __typename?: "Category";
      id: string;
      categoryName: string;
    }>;
    images?: Array<{
      __typename?: "Image";
      id: string;
      fileName: string;
    }> | null;
  };
};

export type GetPinsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPinsQuery = {
  __typename?: "Query";
  pins: Array<{
    __typename?: "Pin";
    id: string;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    isOutdoor: boolean;
    isAccessible: boolean;
    isChildFriendly: boolean;
    createdAt?: string | null;
    categories: Array<{
      __typename?: "Category";
      id: string;
      categoryName: string;
    }>;
  }>;
};

export type SignInMutationVariables = Exact<{
  emailAddress: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "AppUser";
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
  };
};

export type SignUpMutationVariables = Exact<{
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  emailAddress: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "AppUser";
    id: string;
    emailAddress: string;
    userStatus: UserStatus;
  };
};

export const MyProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "emailAddress" },
                },
                { kind: "Field", name: { kind: "Name", value: "userStatus" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const DeleteCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categoryId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export const DeletePinDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePinMutation, DeletePinMutationVariables>;
export const CreateCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "categoryName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categoryName" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const UpdateCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categoryId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "categoryName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categoryName" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export const GetCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const UpdatePinDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updatePinId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categories" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "String" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "latitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "longitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAccessible" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isChildFriendly" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isOutdoor" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userEmail" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updatePinId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "categories" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categories" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "latitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "latitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "longitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "longitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isAccessible" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isAccessible" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isChildFriendly" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isChildFriendly" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isOutdoor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isOutdoor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userEmail" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userEmail" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categories" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "latitude" } },
                { kind: "Field", name: { kind: "Name", value: "longitude" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAccessible" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isChildFriendly" },
                },
                { kind: "Field", name: { kind: "Name", value: "isOutdoor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePinMutation, UpdatePinMutationVariables>;
export const SignOutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignOut" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "currentUserId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signOut" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "currentUserId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const CategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "categories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const GetPinsAdminPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getPinsAdminPage" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categories" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "latitude" } },
                { kind: "Field", name: { kind: "Name", value: "longitude" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileName" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAccessible" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isChildFriendly" },
                },
                { kind: "Field", name: { kind: "Name", value: "isOutdoor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPinsAdminPageQuery,
  GetPinsAdminPageQueryVariables
>;
export const CreatePinDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createPin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categories" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "String" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "latitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "longitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAccessible" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isChildFriendly" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isOutdoor" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userEmail" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createPin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "categories" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categories" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "latitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "latitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "longitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "longitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isAccessible" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isAccessible" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isChildFriendly" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isChildFriendly" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isOutdoor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isOutdoor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userEmail" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userEmail" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categories" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryName" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "latitude" } },
                { kind: "Field", name: { kind: "Name", value: "longitude" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAccessible" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isChildFriendly" },
                },
                { kind: "Field", name: { kind: "Name", value: "isOutdoor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "currentUser" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "emailAddress" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePinMutation, CreatePinMutationVariables>;
export const AddImageToPinDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addImageToPin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fileName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pinId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addImageToPin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "fileName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fileName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pinId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pinId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categories" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryName" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileName" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "latitude" } },
                { kind: "Field", name: { kind: "Name", value: "longitude" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddImageToPinMutation,
  AddImageToPinMutationVariables
>;
export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "emailAddress" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "emailAddress" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "emailAddress" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "emailAddress" },
                },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "emailAddress" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "emailAddress" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "emailAddress" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "emailAddress" },
                },
                { kind: "Field", name: { kind: "Name", value: "userStatus" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
