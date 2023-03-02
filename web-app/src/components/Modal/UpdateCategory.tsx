import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from "gql/graphql";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { getErrorMessage } from "utils";

const UPDATE_CATEGORY = gql`
  mutation updateCategory($categoryId: String!, $categoryName: String!) {
    updateCategory(id: $categoryId, categoryName: $categoryName) {
      id
      categoryName
    }
  }
`;

type updateCategoryProps = {
  categoryId: string;
  categoryName: string;
};

const UpdateCategory = (category: updateCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryId, setCategoryId] = useState(category.categoryId);
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const toast = useToast();

  const [updateCategory] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY);

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await updateCategory({
        variables: {
          categoryId,
          categoryName,
        },
      });
      toast({
        title: `Categoies ${categoryName} a été modifié avec succès.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        status: "error",
        description: getErrorMessage(error),
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        <FaPen />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier categorie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                type="text"
                id="categoryName"
                value={categoryName}
                name="categoryName"
                onChange={(event) => {
                  setCategoryName(event.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} colorScheme="teal" mr={3}>
              Sauvegarder
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCategory;
