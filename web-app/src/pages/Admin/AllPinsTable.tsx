import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmationDeleteDialog from "../../components/Dialog/ConfirmationDeleteDialog";
import UpdatePinModal from "../../components/Modal/UpdatePinModal";
import { GetPinsAdminPageQuery } from "../../gql/graphql";
import BackToDashboardButton from "components/BackToDashboardButton";
import { ContainerTable } from "./ContainerTable.style";

const GET_PINS_ADMIN_PAGE = gql`
  query getPinsAdminPage {
    pins {
      id
      name
      address
      categories {
        categoryName
        id
      }
      description
      latitude
      longitude
      createdAt
      images {
        id
        fileName
      }
      isAccessible
      isChildFriendly
      isOutdoor
      city
      zipcode
    }
  }
`;

const AllPinsTable = () => {
  const { data, loading, error, refetch } = useQuery<GetPinsAdminPageQuery>(
    GET_PINS_ADMIN_PAGE,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const renderPins = () => {
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
                <Heading textTransform="uppercase" mb="20px">
                  La liste des Pins
                </Heading>
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
    if (!data?.pins?.length) {
      return "Aucun Pin à afficher.";
    }
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
              <BackToDashboardButton />
              <Box textAlign="center">
                <Heading textTransform="uppercase" mb="20px">
                  La liste des Pins
                </Heading>
              </Box>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Nom</Th>
                      <Th>Adresse</Th>
                      <Th>Ville</Th>
                      <Th>Catégories</Th>
                      <Th colSpan={3}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.pins.map((pin) => {
                      return (
                        <Tr key={pin.id}>
                          <Td>{pin.name}</Td>
                          <Td>{pin.address}</Td>
                          <Td>{pin.city}</Td>
                          <Td>
                            {pin.categories.map(
                              (category) => category.categoryName
                            )}
                          </Td>
                          <Td>
                            <Link to={`/preview-pin/${pin.id}`}>
                              <Button bgColor="#ff8787" color="#fff">
                                <FaMapMarkerAlt />
                              </Button>
                            </Link>
                          </Td>
                          <Td>
                            <UpdatePinModal
                              id={pin.id}
                              name={pin.name}
                              address={pin.address}
                              city={pin.city}
                              zipcode={pin.zipcode}
                              categories={pin.categories}
                              description={pin.description}
                              latitude={pin.latitude}
                              longitude={pin.longitude}
                              isAccessible={pin.isAccessible}
                              isChildFriendly={pin.isChildFriendly}
                              isOutdoor={pin.isOutdoor}
                            />
                          </Td>
                          <Td>
                            <ConfirmationDeleteDialog
                              id={pin.id}
                              name={pin.name}
                              refetch={refetch}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </ContainerTable>
      </>
    );
  };
  return <>{renderPins()}</>;
};

export default AllPinsTable;
