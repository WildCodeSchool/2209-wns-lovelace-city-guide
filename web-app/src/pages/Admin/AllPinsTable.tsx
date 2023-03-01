import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ConfirmationDeleteDialog from "../../components/Dialog/ConfirmationDeleteDialog";
import Loader from "../../components/Loader";
import UpdatePinModal from "../../components/Modal/UpdatePinModal";
import NavbarPage from "../../components/Navbar/NavbarPage";
import { GetPinsQuery } from "../../gql/graphql";

const GET_PINS = gql`
  query getPins {
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
  const { data, loading, error, refetch } = useQuery<GetPinsQuery>(GET_PINS, {
    fetchPolicy: "cache-and-network",
  });

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
        <TableContainer>
          <Table>
            <TableCaption
              placement="top"
              fontSize={32}
              textTransform="uppercase"
            >
              La list de Pin
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nom</Th>
                <Th>Adresse</Th>
                <Th>Catégories</Th>
                <Th colSpan={2}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.pins.map((pin) => {
                return (
                  <Tr key={pin.id}>
                    <Td>{pin.name}</Td>
                    <Td>{pin.address}</Td>
                    <Td>
                      <Link to={`/preview-pin/${pin.id}`}>
                        <Button>Voir Pin</Button>
                      </Link>
                    </Td>
                    <Td>
                      {/* <UpdatePinModal
                        id={pin.id}
                        name={pin.name}
                        address={pin.address}
                        description={pin.description}
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                      /> */}
                    </Td>
                    {/* <Td>
                      <ConfirmationDeleteDialog id={pin.id} refetch={refetch} />
                    </Td> */}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  };
  return <>{renderPins()}</>;
};

export default AllPinsTable;
