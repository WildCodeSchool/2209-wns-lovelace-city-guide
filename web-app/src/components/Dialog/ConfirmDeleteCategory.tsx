import {
  ApolloQueryResult,
  gql,
  OperationVariables,
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
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  GetCategoriesQuery,
} from "gql/graphql";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { getErrorMessage } from "utils";

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(id: $categoryId) {
      id
      categoryName
    }
  }
`;

type confirmDeleteCategoryProps = {
  categoryId: string;
  categoryName: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetCategoriesQuery>>;
};
const ConfirmDeleteCategory = ({
  categoryId,
  categoryName,
  refetch,
}: confirmDeleteCategoryProps) => {
  const [deleteCategory] = useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DELETE_CATEGORY);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();

  const onDelete = async () => {
    try {
      await deleteCategory({
        variables: { categoryId },
      });
      await refetch();
      toast({
        title: `Catégorie : ${categoryName} a été supprimé avec succès.`,
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
              Supprimer cette catégorie?
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Etes-vous sûr de vouloir supprimer catégorie : ${categoryName}?`}
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

export default ConfirmDeleteCategory;
