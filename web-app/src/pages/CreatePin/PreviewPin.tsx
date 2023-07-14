import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  AddPinToUserFavoriteMutation,
  AddPinToUserFavoriteMutationVariables,
  RemovePinFromUserFavoriteMutation,
  RemovePinFromUserFavoriteMutationVariables,
  GetPinByIdQuery,
  GetPinsFromUserFavoritesQuery,
} from "../../gql/graphql";
import { useState } from "react";
import { getErrorMessage } from "utils";
import { FavButton } from "../../styles/base-styles";
import { ContainerTable } from "pages/Admin/ContainerTable.style";
import { FaPlus } from "react-icons/fa";

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
  query GetPinsFromUserFavorites {
    getPinsFromUserFavorites {
      id
    }
  }
`;

const ADD_PIN_TO_USER_FAVORITE = gql`
  mutation addPinToUserFavorite($pinId: String!) {
    addPinToUserFavorite(pinId: $pinId) {
      id
      name
    }
  }
`;

const REMOVE_PIN_FROM_USER_FAVORITE = gql`
  mutation removePinFromUserFavorite($pinId: String!) {
    removePinFromUserFavorite(pinId: $pinId) {
      id
      name
    }
  }
`;

interface idParams {
  pinId?: any;
}
const PreviewPin = () => {
  const { data: userFavoritePins } =
    useQuery<GetPinsFromUserFavoritesQuery>(GET_FAVORITE_PIN);

  const { pinId } = useParams() as idParams;
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(
    userFavoritePins !== undefined &&
      userFavoritePins.getPinsFromUserFavorites.find((o) => o.id === pinId)
      ? true
      : false
  );

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

  const onSubmitFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    setIsFavorite(!isFavorite);

    if (
      userFavoritePins !== undefined &&
      userFavoritePins.getPinsFromUserFavorites.find((o) => o.id === pinId)
    ) {
      try {
        event.preventDefault();
        await removePin({
          variables: {
            pinId,
          },
        });
        toast({
          title: `Pin a été supprimé de la liste de favoris.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: getErrorMessage(error),
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        event.preventDefault();
        await favoritePin({
          variables: {
            pinId,
          },
        });
        toast({
          title: `Pin a été ajouté dans la liste de favoris.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: getErrorMessage(error),
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const renderPin = () => {
    if (loading) {
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
              <Box textAlign="center">
                <Heading>Loading...</Heading>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
              </Box>
            </Box>
          </Flex>
        </>
      );
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
        <ContainerTable>
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
                <FavButton
                  onClick={onSubmitFavorite}
                  fave={isFavorite ? true : false}
                >
                  {" "}
                  <FaHeart />{" "}
                </FavButton>
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
                    <FaPlus /> <Text pl="5px">Ajouter image</Text>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Flex>
        </ContainerTable>
      </>
    );
  };
  return <>{renderPin()}</>;
};

export default PreviewPin;
