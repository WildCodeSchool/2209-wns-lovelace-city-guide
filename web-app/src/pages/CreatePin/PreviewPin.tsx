import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import NavbarPage from "../../components/Navbar/NavbarPage";
import {
  AddPinToUserFavoriteMutation,
  AddPinToUserFavoriteMutationVariables,
  GetPinByIdQuery,
} from "../../gql/graphql";
import { useEffect, useState } from "react";
import { getErrorMessage } from "utils";

const GET_PIN_BY_ID = gql`
  query GetPinById($pinId: String!) {
    getPinById(id: $pinId) {
      id
      name
      address
      categories {
        id
        categoryName
      }
      description
      images {
        id
        fileName
      }
      latitude
      longitude
      createdAt
    }
  }
`;

const ADD_PIN_TO_USER_FAVORITE = gql`
  mutation addPinToUserFavorite($pinId: String!, $userId: String!) {
    addPinToUserFavorite(pinId: $pinId, userId: $userId) {
      id
      name
      # currentUser {
      #   id
      #   firstName
      # }
    }
  }
`;

interface idParams {
  pinId?: any;
}
const PreviewPin = () => {
  const { pinId } = useParams() as idParams;
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, loading, error } = useQuery<GetPinByIdQuery>(GET_PIN_BY_ID, {
    variables: { pinId },
  });

  const [favoritePin] = useMutation<
    AddPinToUserFavoriteMutation,
    AddPinToUserFavoriteMutationVariables
  >(ADD_PIN_TO_USER_FAVORITE);

  const userId = "4284430c-a88c-4b8e-a19f-89fbee66db4b";

  useEffect(() => {
    console.log(isFavorite);
  });

  const onSubmitFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await favoritePin({
        variables: {
          pinId,
          userId,
        },
      });
      //setIsFavorite(true);
      console.log(isFavorite);
      toast({
        title: `Pin a été ajouté dans la liste de favoris.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: getErrorMessage(error),
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const renderPin = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.getPinById) {
      return "Pin not found";
    }
    const images = data?.getPinById?.images;
    return (
      <>
        <NavbarPage />
        <Flex width="full" align="center" justifyContent="center">
          <Box
            bg="#fff"
            p={8}
            width="1000px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Flex justifyContent="flex-end">
              <Button onClick={onSubmitFavorite} bgColor="#ff8787" color="#fff">
                <FaHeart onChange={() => setIsFavorite(true)} />
              </Button>
            </Flex>
            <Box textAlign="center">
              <Heading>{data.getPinById.name}</Heading>
            </Box>
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {images &&
                images.map((image) => (
                  <Card maxW="md" key={image.id}>
                    <CardBody>
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        key={image.id}
                        src={`/uploader/${image.fileName}`}
                        alt="pin"
                      />
                    </CardBody>
                  </Card>
                ))}
            </SimpleGrid>
            <Stack mt="6" spacing="3">
              <Heading size="md">{data.getPinById.address}</Heading>
              <Text>{data.getPinById.description}</Text>
            </Stack>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Link to={`/upload-image/${pinId}`}>
                <Button colorScheme="teal" width="full" mt={4}>
                  Ajoute image
                </Button>
              </Link>
            </Box>
          </Box>
        </Flex>
      </>
    );
  };
  return <>{renderPin()}</>;
};

export default PreviewPin;
