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
  RemovePinFromUserFavoriteMutation,
  RemovePinFromUserFavoriteMutationVariables,
  GetPinByIdQuery,
  GetPinsFromUserFavoritesQuery
} from "../../gql/graphql";
import { useEffect, useState } from "react";
import { getErrorMessage } from "utils";
import {FavButton} from "../../styles/base-styles";

const userId = "db792161-00a0-4ada-9a52-78715979834f";


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

const GET_FAVORITE_PIN = gql`
query GetPinsFromUserFavorites($userId: String!) {
  getPinsFromUserFavorites(userId: $userId) {
    id
  }
}`


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

const REMOVE_PIN_FROM_USER_FAVORITE = gql`
mutation removePinFromUserFavorite($userId: String!, $pinId: String!) {
  removePinFromUserFavorite(userId: $userId, pinId: $pinId) {
    id
    name
  }
}`

interface idParams {
  pinId?: any;
}
const PreviewPin = () => {
  const { data: userFavoritePins } = useQuery<GetPinsFromUserFavoritesQuery>(GET_FAVORITE_PIN, {
    variables: { userId },
  });

  const { pinId } = useParams() as idParams;
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState((userFavoritePins !== undefined && userFavoritePins.getPinsFromUserFavorites.find(o => o.id === pinId)) ? true : false);

  const { data, loading, error } = useQuery<GetPinByIdQuery>(GET_PIN_BY_ID, {
    variables: { pinId },
  });

  const [favoritePin] = useMutation<
    AddPinToUserFavoriteMutation,
    AddPinToUserFavoriteMutationVariables
  >(ADD_PIN_TO_USER_FAVORITE);

  const [removePin] = useMutation<
    RemovePinFromUserFavoriteMutation,
    RemovePinFromUserFavoriteMutationVariables
  >(REMOVE_PIN_FROM_USER_FAVORITE);




  useEffect(() => {
    console.log(isFavorite);
    console.log(userFavoritePins !== undefined && userFavoritePins.getPinsFromUserFavorites)
  });

  const onSubmitFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    setIsFavorite(!isFavorite)

      if(userFavoritePins !== undefined && userFavoritePins.getPinsFromUserFavorites.find(o => o.id === pinId)) {
        try {
          event.preventDefault();
          await removePin({
            variables: {
              pinId,
              userId,
            },
          });
          toast({
            title: `Pin a été supprimé de la liste de favoris.`,
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
      } else {
        try {
          event.preventDefault();
          await favoritePin({
            variables: {
              pinId,
              userId,
            },
          });
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
              <FavButton onClick={onSubmitFavorite} fave={isFavorite ? true : false} > <FaHeart /> </FavButton>

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
