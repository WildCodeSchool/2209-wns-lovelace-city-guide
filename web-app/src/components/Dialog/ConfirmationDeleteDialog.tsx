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
} from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";
import {
  DeletePinMutation,
  DeletePinMutationVariables,
  GetPinsQuery,
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
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetPinsQuery>>;
};

const ConfirmationDeleteDialog = ({
  id,
  refetch,
}: confirmationDeleteDialogProps) => {
  const [deletePin] = useMutation<
    DeletePinMutation,
    DeletePinMutationVariables
  >(DELETE_PIN);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const onDelete = async () => {
    await deletePin({ variables: { id } });
    await refetch();
    toast.success(`Pin deleted `);
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
