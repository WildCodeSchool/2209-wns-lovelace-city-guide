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
import BackToDashboardButton from "components/BackToDashboardButton";
import ConfirmAssignAdmin from "components/Dialog/ConfirmAssignAdmin";
import ConfirmDeleteUser from "components/Dialog/ConfirmDeleteUser";
import ConfirmRemoveAdmin from "components/Dialog/ConfirmRemoveAdmin";
import { AppContext } from "context/AppContext";
import { GetUsersQuery, UserStatus } from "gql/graphql";
import { useContext } from "react";
import { ContainerTable } from "./ContainerTable.style";

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
  const appContext = useContext(AppContext);
  const currentUserStatus = appContext?.userProfile?.myProfile.userStatus;

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
                <Heading textTransform="uppercase" mb="20px">
                  La liste des Pinners
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
    if (!data?.getUsers?.length) {
      return "Aucun Pinner à afficher.";
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
                  La liste des Pinners
                </Heading>
              </Box>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Prénom</Th>
                      <Th>Nom</Th>
                      <Th>Email</Th>
                      <Th>Status</Th>
                      {currentUserStatus === "SUPER_ADMIN" ? (
                        <Th colSpan={3}>Actions</Th>
                      ) : (
                        ""
                      )}
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
                          {currentUserStatus === "SUPER_ADMIN" ? (
                            <Td>
                              {user.userStatus === UserStatus.SuperAdmin ? (
                                <span></span>
                              ) : (
                                <>
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
                                </>
                              )}
                            </Td>
                          ) : (
                            ""
                          )}
                          {currentUserStatus === "SUPER_ADMIN" ? (
                            <Td>
                              {user.userStatus === UserStatus.SuperAdmin ? (
                                <span></span>
                              ) : (
                                <ConfirmDeleteUser
                                  id={user.id}
                                  firstName={user.firstName}
                                  lastName={user.lastName}
                                  refetch={refetch}
                                />
                              )}
                            </Td>
                          ) : (
                            ""
                          )}
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
  return <>{renderUsers()}</>;
};

export default AllUsersTable;
