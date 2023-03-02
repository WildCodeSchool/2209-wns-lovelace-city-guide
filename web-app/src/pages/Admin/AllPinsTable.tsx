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
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmationDeleteDialog from "../../components/Dialog/ConfirmationDeleteDialog";
import Loader from "../../components/Loader";
import UpdatePinModal from "../../components/Modal/UpdatePinModal";
import NavbarPage from "../../components/Navbar/NavbarPage";
import { GetPinsAdminPageQuery } from "../../gql/graphql";

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
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.pins?.length) {
      return "Aucun Pin à afficher.";
    }
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
            <Box textAlign="center">
              <Heading>La list de Pin</Heading>
            </Box>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nom</Th>
                    <Th>Adresse</Th>
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
                            categories={pin.categories}
                            description={pin.description}
                            latitude={pin.latitude}
                            longitude={pin.longitude}
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
      </>
    );
  };
  return <>{renderPins()}</>;
};

export default AllPinsTable;
