import {
  ApolloQueryResult,
  OperationVariables,
  gql,
  useMutation,
} from "@apollo/client";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  GetUsersQuery,
  RemoveAdminMutation,
  RemoveAdminMutationVariables,
} from "gql/graphql";
import React from "react";
import { FaMinusCircle } from "react-icons/fa";
import { getErrorMessage } from "utils";

const REMOVE_ADMIN = gql`
  mutation removeAdmin($id: String!) {
    removeAdmin(id: $id) {
      id
      firstName
      lastName
      userStatus
      emailAddress
    }
  }
`;

type removeAdminProps = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetUsersQuery>>;
};

const ConfirmRemoveAdmin = ({
  id,
  firstName,
  lastName,
  status,
  refetch,
}: removeAdminProps) => {
  const [removeAdmin] = useMutation<
    RemoveAdminMutation,
    RemoveAdminMutationVariables
  >(REMOVE_ADMIN);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();

  const onRemoveAdmin = async () => {
    try {
      await removeAdmin({ variables: { id } });
      await refetch();
      toast({
        title: `Pinner : ${firstName} ${lastName} a été retiré en tant qu'admin avec succès.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
      <Button bgColor="#ff8787" color="#fff" onClick={onOpen}>
        <FaMinusCircle />
        <span>Retirer Admin</span>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Retirer cet admin?
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Etes-vous sûr de vouloir retirer ${firstName} ${lastName} en tant qu'admin?`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                Non
              </Button>
              <Button onClick={onRemoveAdmin} colorScheme="teal" ml={3}>
                Oui
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmRemoveAdmin;
