import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import {
  useDisclosure,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  GetCategoriesQuery,
} from "gql/graphql";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getErrorMessage } from "utils";

const CREATE_CATEGORY = gql`
  mutation createCategory($categoryName: String!) {
    createCategory(categoryName: $categoryName) {
      id
      categoryName
    }
  }
`;

type crateCategoryProps = {
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetCategoriesQuery>>;
};

const CreateCategory = ({ refetch }: crateCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = useState("");
  const toast = useToast();

  const [createCategory] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY);

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await createCategory({
        variables: {
          categoryName,
        },
      });
      refetch();
      toast({
        title: `Categorie ${categoryName} a été créé avec succès.`,
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
        <FaPlus /> <Text pl="5px">Category</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une categorie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                type="text"
                id="categoryName"
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

export default CreateCategory;
