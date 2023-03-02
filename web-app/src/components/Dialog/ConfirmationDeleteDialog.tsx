import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  DeletePinMutation,
  DeletePinMutationVariables,
  GetPinsAdminPageQuery,
} from "../../gql/graphql";

const DELETE_PIN = gql`
  mutation DeletePin($id: String!) {
    deletePin(id: $id) {
      id
      name
    }
  }
`;

type confirmationDeleteDialogProps = {
  id: string;
  name: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetPinsAdminPageQuery>>;
};

const ConfirmationDeleteDialog = ({
  id,
  name,
  refetch,
}: confirmationDeleteDialogProps) => {
  const [deletePin] = useMutation<
    DeletePinMutation,
    DeletePinMutationVariables
  >(DELETE_PIN);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();

  const onDelete = async () => {
    await deletePin({ variables: { id } });
    await refetch();
    toast({
      title: `Pin ${name} a été supprimé avec succès.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Supprimer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer ce Pin?
            </AlertDialogHeader>

            <AlertDialogBody>
              Etes-vous sûr de vouloir supprimer ce Pin?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDeleteDialog;
