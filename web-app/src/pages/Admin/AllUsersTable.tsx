import { gql, useQuery } from "@apollo/client";
import {
  Flex,
  Heading,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";
import ConfirmAssignAdmin from "components/Dialog/ConfirmAssignAdmin";
import ConfirmDeleteUser from "components/Dialog/ConfirmDeleteUser";
import ConfirmRemoveAdmin from "components/Dialog/ConfirmRemoveAdmin";
import { GetUsersQuery, UserStatus } from "gql/graphql";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
      emailAddress
      userStatus
    }
  }
`;

const AllUsersTable = () => {
  const { data, loading, error, refetch } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });

  const renderUsers = () => {
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
                <Heading>La list de Pinners</Heading>
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
    if (!data?.getUsers?.length) {
      return "Aucun Pinner à afficher.";
    }
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
              <Heading>La list de Pinners</Heading>
            </Box>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Prénom</Th>
                    <Th>Nom</Th>
                    <Th>Email</Th>
                    <Th>Status</Th>
                    <Th colSpan={3}>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.getUsers.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td>{user.firstName}</Td>
                        <Td>{user.lastName}</Td>
                        <Td>{user.emailAddress}</Td>
                        <Td>{user.userStatus}</Td>
                        <Td>
                          {user.userStatus !== UserStatus.Admin ? (
                            <ConfirmAssignAdmin
                              id={user.id}
                              firstName={user.firstName}
                              lastName={user.lastName}
                              status={user.userStatus}
                              refetch={refetch}
                            />
                          ) : (
                            <ConfirmRemoveAdmin
                              id={user.id}
                              firstName={user.firstName}
                              lastName={user.lastName}
                              status={user.userStatus}
                              refetch={refetch}
                            />
                          )}
                        </Td>
                        <Td>
                          <ConfirmDeleteUser
                            id={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName}
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
  return <>{renderUsers()}</>;
};

export default AllUsersTable;
