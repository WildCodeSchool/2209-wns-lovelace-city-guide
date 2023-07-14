import {
  ApolloQueryResult,
  OperationVariables,
  gql,
  useMutation,
} from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AssignAdminMutation,
  AssignAdminMutationVariables,
  GetUsersQuery,
} from "gql/graphql";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { getErrorMessage } from "utils";

const ASSIGN_ADMIN = gql`
  mutation AssignAdmin($id: String!) {
    assignAdmin(id: $id) {
      firstName
      lastName
      emailAddress
      userStatus
    }
  }
`;

type assignAdminProps = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetUsersQuery>>;
};

const ConfirmAssignAdmin = ({
  id,
  firstName,
  lastName,
  status,
  refetch,
}: assignAdminProps) => {
  const [assignAdmin] = useMutation<
    AssignAdminMutation,
    AssignAdminMutationVariables
  >(ASSIGN_ADMIN);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();

  const onAssignAdmin = async () => {
    try {
      await assignAdmin({ variables: { id } });
      await refetch();
      toast({
        title: `Pinner : ${firstName} ${lastName} a été ajouté en tant qu'admin avec succès.`,
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
      <Button colorScheme="teal" onClick={onOpen}>
        <FaPlusCircle />
        <span>Ajouter Admin</span>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Ajouter un nouveau admin?
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Etes-vous sûr de vouloir ajouter ${firstName} ${lastName} en tant qu'admin?`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                Non
              </Button>
              <Button onClick={onAssignAdmin} colorScheme="teal" ml={3}>
                Oui
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmAssignAdmin;
