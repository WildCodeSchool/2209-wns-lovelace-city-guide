import { gql, useQuery } from "@apollo/client";
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
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import NavbarPage from "../../components/Navbar/NavbarPage";
import { GetPinByIdQuery } from "../../gql/graphql";

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
const PreviewPin = () => {
  let { pinId } = useParams();
  const { data, loading, error } = useQuery<GetPinByIdQuery>(GET_PIN_BY_ID, {
    variables: { pinId },
  });

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
            p={8}
            width="1000px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
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
                        src={`http://localhost:5000/${image.fileName}`}
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
