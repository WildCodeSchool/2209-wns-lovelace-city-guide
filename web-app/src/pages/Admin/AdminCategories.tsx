import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import BackToDashboardButton from "components/BackToDashboardButton";
import ConfirmDeleteCategory from "components/Dialog/ConfirmDeleteCategory";
import CreateCategory from "components/Modal/CreateCategory";
import UpdateCategory from "components/Modal/UpdateCategory";
import { GetCategoriesQuery } from "gql/graphql";
import { ContainerTable } from "./ContainerTable.style";

const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      categoryName
    }
  }
`;
const AdminCategories = () => {
  const { data, loading, error, refetch } = useQuery<GetCategoriesQuery>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const renderCategories = () => {
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
                  La liste des catégories
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
    if (!data?.categories.length) {
      return "Aucune catégories à afficher.";
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
                  La liste des catégories
                </Heading>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <CreateCategory refetch={refetch} />
              </Box>

              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Nom</Th>
                      <Th colSpan={2}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.categories.map((category) => {
                      return (
                        <Tr key={category.id}>
                          <Td>{category.categoryName}</Td>
                          <Td colSpan={2}>
                            <UpdateCategory
                              categoryId={category.id}
                              categoryName={category.categoryName}
                            />
                            <span style={{ paddingRight: "10px" }}></span>
                            <ConfirmDeleteCategory
                              categoryId={category.id}
                              categoryName={category.categoryName}
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
  return <>{renderCategories()}</>;
};

export default AdminCategories;
