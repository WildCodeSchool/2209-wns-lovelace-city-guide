import { gql, useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { AppContext } from "context/AppContext";
import {
  AddCommentToPinMutation,
  AddCommentToPinMutationVariables,
} from "gql/graphql";
import { useContext, useState } from "react";
import { getErrorMessage } from "utils";

const CREATE_COMMENT = gql`
  mutation AddCommentToPin(
    $userEmail: String!
    $rating: Float!
    $content: String!
    $pinId: String!
  ) {
    addCommentToPin(
      userEmail: $userEmail
      rating: $rating
      content: $content
      pinId: $pinId
    ) {
      id
      name
      comments {
        content
        rating
      }
    }
  }
`;

const Comment = () => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const toast = useToast();
  const pinId = "37fb7b31-2c5f-4229-8fa4-52372736f576";
  const appContext = useContext(AppContext);
  const userEmail = appContext?.userProfile?.myProfile.emailAddress as string;

  const [createComment] = useMutation<
    AddCommentToPinMutation,
    AddCommentToPinMutationVariables
  >(CREATE_COMMENT);
  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await createComment({
        variables: {
          userEmail,
          rating,
          content,
          pinId,
        },
      });
      toast({
        title: `Votre commentaire a été ajouté avec succès.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setContent("");
      setRating(0);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: getErrorMessage(error),
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Heading color="white">Ajoute un Pin</Heading>
      <FormControl>
        <FormLabel color="white">Content</FormLabel>
        <Input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel color="white">Rating</FormLabel>
        <Input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          onChange={(event) => {
            setRating(parseFloat(event.target.value));
          }}
        />
      </FormControl>
      <Button onClick={onSubmit} colorScheme="teal" width="full" mt={4}>
        Envoyer
      </Button>
    </>
  );
};
export default Comment;
