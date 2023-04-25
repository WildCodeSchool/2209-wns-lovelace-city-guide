/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query MyProfile {\n    myProfile {\n      id\n      firstName\n      lastName\n      emailAddress\n      userStatus\n    }\n  }\n": types.MyProfileDocument,
    "\n  mutation DeleteCategory($categoryId: String!) {\n    deleteCategory(id: $categoryId) {\n      id\n      categoryName\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation DeletePin($id: String!) {\n    deletePin(id: $id) {\n      id\n      name\n    }\n  }\n": types.DeletePinDocument,
    "\n  mutation createCategory($categoryName: String!) {\n    createCategory(categoryName: $categoryName) {\n      id\n      categoryName\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation updateCategory($categoryId: String!, $categoryName: String!) {\n    updateCategory(id: $categoryId, categoryName: $categoryName) {\n      id\n      categoryName\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  query getCategories {\n    categories {\n      id\n      categoryName\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  mutation UpdatePin(\n    $updatePinId: ID!\n    $name: String!\n    $address: String!\n    $categories: [String!]!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n    $isAccessible: Boolean!\n    $isChildFriendly: Boolean!\n    $isOutdoor: Boolean!\n    $userEmail: String!\n  ) {\n    updatePin(\n      id: $updatePinId\n      name: $name\n      address: $address\n      categories: $categories\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n      isAccessible: $isAccessible\n      isChildFriendly: $isChildFriendly\n      isOutdoor: $isOutdoor\n      userEmail: $userEmail\n    ) {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      isAccessible\n      isChildFriendly\n      isOutdoor\n    }\n  }\n": types.UpdatePinDocument,
    "\n    query MyProfile {\n      myProfile {\n        id\n        firstName\n        lastName\n        emailAddress\n        userStatus\n      }\n    }\n  ": types.MyProfileDocument,
    "\n  mutation SignOut($currentUserId: String!) {\n    signOut(id: $currentUserId) {\n      id\n    }\n  }\n": types.SignOutDocument,
    "\n  query categories {\n    categories {\n      id\n      categoryName\n    }\n  }\n": types.CategoriesDocument,
    "\n  query getPinsAdminPage {\n    pins {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      images {\n        id\n        fileName\n      }\n      isAccessible\n      isChildFriendly\n      isOutdoor\n    }\n  }\n": types.GetPinsAdminPageDocument,
    "\n  mutation createPin(\n    $name: String!\n    $address: String!\n    $categories: [String!]!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n    $isAccessible: Boolean!\n    $isChildFriendly: Boolean!\n    $isOutdoor: Boolean!\n    $userEmail: String!\n  ) {\n    createPin(\n      name: $name\n      address: $address\n      categories: $categories\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n      isAccessible: $isAccessible\n      isChildFriendly: $isChildFriendly\n      isOutdoor: $isOutdoor\n      userEmail: $userEmail\n    ) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      isAccessible\n      isChildFriendly\n      isOutdoor\n      currentUser {\n        emailAddress\n      }\n    }\n  }\n": types.CreatePinDocument,
    "\n  query GetPinById($pinId: String!) {\n    getPinById(id: $pinId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      images {\n        id\n        fileName\n      }\n      latitude\n      longitude\n      createdAt\n    }\n  }\n": types.GetPinByIdDocument,
    "\n  mutation addImageToPin($fileName: String!, $pinId: String!) {\n    addImageToPin(fileName: $fileName, pinId: $pinId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      images {\n        id\n        fileName\n      }\n      latitude\n      longitude\n      createdAt\n    }\n  }\n": types.AddImageToPinDocument,
    "\n  query GetPins {\n    pins {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      isOutdoor\n      isAccessible\n      isChildFriendly\n      createdAt\n    }\n  }\n": types.GetPinsDocument,
    "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n      userStatus\n    }\n  }\n": types.SignUpDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyProfile {\n    myProfile {\n      id\n      firstName\n      lastName\n      emailAddress\n      userStatus\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      id\n      firstName\n      lastName\n      emailAddress\n      userStatus\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCategory($categoryId: String!) {\n    deleteCategory(id: $categoryId) {\n      id\n      categoryName\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($categoryId: String!) {\n    deleteCategory(id: $categoryId) {\n      id\n      categoryName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePin($id: String!) {\n    deletePin(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePin($id: String!) {\n    deletePin(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCategory($categoryName: String!) {\n    createCategory(categoryName: $categoryName) {\n      id\n      categoryName\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($categoryName: String!) {\n    createCategory(categoryName: $categoryName) {\n      id\n      categoryName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCategory($categoryId: String!, $categoryName: String!) {\n    updateCategory(id: $categoryId, categoryName: $categoryName) {\n      id\n      categoryName\n    }\n  }\n"): (typeof documents)["\n  mutation updateCategory($categoryId: String!, $categoryName: String!) {\n    updateCategory(id: $categoryId, categoryName: $categoryName) {\n      id\n      categoryName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCategories {\n    categories {\n      id\n      categoryName\n    }\n  }\n"): (typeof documents)["\n  query getCategories {\n    categories {\n      id\n      categoryName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePin(\n    $updatePinId: ID!\n    $name: String!\n    $address: String!\n    $categories: [String!]!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n    $isAccessible: Boolean!\n    $isChildFriendly: Boolean!\n    $isOutdoor: Boolean!\n    $userEmail: String!\n  ) {\n    updatePin(\n      id: $updatePinId\n      name: $name\n      address: $address\n      categories: $categories\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n      isAccessible: $isAccessible\n      isChildFriendly: $isChildFriendly\n      isOutdoor: $isOutdoor\n      userEmail: $userEmail\n    ) {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      isAccessible\n      isChildFriendly\n      isOutdoor\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePin(\n    $updatePinId: ID!\n    $name: String!\n    $address: String!\n    $categories: [String!]!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n    $isAccessible: Boolean!\n    $isChildFriendly: Boolean!\n    $isOutdoor: Boolean!\n    $userEmail: String!\n  ) {\n    updatePin(\n      id: $updatePinId\n      name: $name\n      address: $address\n      categories: $categories\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n      isAccessible: $isAccessible\n      isChildFriendly: $isChildFriendly\n      isOutdoor: $isOutdoor\n      userEmail: $userEmail\n    ) {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      isAccessible\n      isChildFriendly\n      isOutdoor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MyProfile {\n      myProfile {\n        id\n        firstName\n        lastName\n        emailAddress\n        userStatus\n      }\n    }\n  "): (typeof documents)["\n    query MyProfile {\n      myProfile {\n        id\n        firstName\n        lastName\n        emailAddress\n        userStatus\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignOut($currentUserId: String!) {\n    signOut(id: $currentUserId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SignOut($currentUserId: String!) {\n    signOut(id: $currentUserId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categories {\n    categories {\n      id\n      categoryName\n    }\n  }\n"): (typeof documents)["\n  query categories {\n    categories {\n      id\n      categoryName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPinsAdminPage {\n    pins {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      images {\n        id\n        fileName\n      }\n      isAccessible\n      isChildFriendly\n      isOutdoor\n    }\n  }\n"): (typeof documents)["\n  query getPinsAdminPage {\n    pins {\n      id\n      name\n      address\n      categories {\n        categoryName\n        id\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      images {\n        id\n        fileName\n      }\n      isAccessible\n      isChildFriendly\n      isOutdoor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPin(\n    $name: String!\n    $address: String!\n    $categories: [String!]!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n    $isAccessible: Boolean!\n    $isChildFriendly: Boolean!\n    $isOutdoor: Boolean!\n    $userEmail: String!\n  ) {\n    createPin(\n      name: $name\n      address: $address\n      categories: $categories\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n      isAccessible: $isAccessible\n      isChildFriendly: $isChildFriendly\n      isOutdoor: $isOutdoor\n      userEmail: $userEmail\n    ) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      isAccessible\n      isChildFriendly\n      isOutdoor\n      currentUser {\n        emailAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createPin(\n    $name: String!\n    $address: String!\n    $categories: [String!]!\n    $description: String!\n    $latitude: Float!\n    $longitude: Float!\n    $isAccessible: Boolean!\n    $isChildFriendly: Boolean!\n    $isOutdoor: Boolean!\n    $userEmail: String!\n  ) {\n    createPin(\n      name: $name\n      address: $address\n      categories: $categories\n      description: $description\n      latitude: $latitude\n      longitude: $longitude\n      isAccessible: $isAccessible\n      isChildFriendly: $isChildFriendly\n      isOutdoor: $isOutdoor\n      userEmail: $userEmail\n    ) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      createdAt\n      isAccessible\n      isChildFriendly\n      isOutdoor\n      currentUser {\n        emailAddress\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPinById($pinId: String!) {\n    getPinById(id: $pinId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      images {\n        id\n        fileName\n      }\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPinById($pinId: String!) {\n    getPinById(id: $pinId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      images {\n        id\n        fileName\n      }\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addImageToPin($fileName: String!, $pinId: String!) {\n    addImageToPin(fileName: $fileName, pinId: $pinId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      images {\n        id\n        fileName\n      }\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation addImageToPin($fileName: String!, $pinId: String!) {\n    addImageToPin(fileName: $fileName, pinId: $pinId) {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      images {\n        id\n        fileName\n      }\n      latitude\n      longitude\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPins {\n    pins {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      isOutdoor\n      isAccessible\n      isChildFriendly\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPins {\n    pins {\n      id\n      name\n      address\n      categories {\n        id\n        categoryName\n      }\n      description\n      latitude\n      longitude\n      isOutdoor\n      isAccessible\n      isChildFriendly\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n      userStatus\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n      userStatus\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;