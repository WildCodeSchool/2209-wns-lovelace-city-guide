import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
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

const Comment = ({pinId}: {pinId: string}) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const toast = useToast();
  const appContext = useContext(AppContext);
  const userEmail = appContext?.userProfile?.myProfile.emailAddress as string;
  console.log(userEmail)

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
    <Flex justifyContent='space-between'>
      <FormControl>
        <Textarea
        width='80'
        mr='1rem'
        resize='none'
        placeholder='Qu&apos;en avez vous pensé ?'
        id="content"
        name="content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        />
      </FormControl>
      <FormControl>

      <NumberInput size='md' maxW={16} step={1} defaultValue={3} min={0} max={5} 
      id="rating"
      name="rating"
      value={rating}
      onChange={(event) => {
        setRating(parseFloat(event));
      }}>
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper color='#FBC63F' />
          <NumberDecrementStepper color='#FBC63F'/>
        </NumberInputStepper>
      </NumberInput>      
      </FormControl>
      </Flex>
      <Button onClick={onSubmit} colorScheme="teal" width="full" mt={4}>
        Envoyer
      </Button>
    </>
  );
};
export default Comment;
