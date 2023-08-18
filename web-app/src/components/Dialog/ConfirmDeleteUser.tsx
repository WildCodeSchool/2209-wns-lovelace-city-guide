import {
  ApolloQueryResult,
  OperationVariables,
  gql,
  useMutation,
} from "@apollo/client";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import {
  DeletePinMutation,
  DeletePinMutationVariables,
  GetUsersQuery,
} from "gql/graphql";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { getErrorMessage } from "utils";

const DELETE_USER = gql`
  mutation Deletepin($id: String!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      emailAddress
      userStatus
    }
  }
`;
type confirmDeleteUserProps = {
  id: string;
  firstName: string;
  lastName: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetUsersQuery>>;
};
const ConfirmDeleteUser = ({
  id,
  firstName,
  lastName,
  refetch,
}: confirmDeleteUserProps) => {
  const [deleteUser] = useMutation<
    DeletePinMutation,
    DeletePinMutationVariables
  >(DELETE_USER);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();

  const onDelete = async () => {
    try {
      await deleteUser({ variables: { id } });
      await refetch();
      toast({
        title: `Pinner : ${firstName} ${lastName} a été supprimé avec succès.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        status: "error",
        description: getErrorMessage(error),
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        <FaTrashAlt />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer ce Pinner?
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Etes-vous sûr de vouloir supprimer Pinner: ${firstName} ${lastName} ?`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button onClick={onDelete} colorScheme="red" ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmDeleteUser;
