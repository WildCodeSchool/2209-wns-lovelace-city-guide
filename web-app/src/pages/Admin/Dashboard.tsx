import { Box, Flex, Heading } from "@chakra-ui/react";
import {
  ADMIN_ALL_PINS_PATH,
  MAP_PATH,
  ADMIN_CATEGORIES,
  ADMIN_ALL_USERS_PATH,
} from "../paths";
import { DashboardButton } from "../../styles/base-styles";
import { Grid, Content } from "./Dashboard.styled";
import {
  FaUser,
  FaMapMarked,
  FaMapMarkerAlt,
  FaClipboardList,
} from "react-icons/fa";
import { ContainerTable } from "./ContainerTable.style";

const Dashboard = () => {
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
            <Box textAlign="center">
              <Heading textTransform="uppercase">Tableau de bord</Heading>
            </Box>
            <Grid>
              <DashboardButton to={MAP_PATH}>
                {" "}
                <Content>
                  {" "}
                  <FaMapMarked /> <p>Afficher la carte</p>{" "}
                </Content>{" "}
              </DashboardButton>
              <DashboardButton to={ADMIN_ALL_PINS_PATH}>
                {" "}
                <Content>
                  {" "}
                  <FaMapMarkerAlt /> <p>Gestion des Pin</p>{" "}
                </Content>{" "}
              </DashboardButton>
              <DashboardButton to={ADMIN_CATEGORIES}>
                {" "}
                <Content>
                  {" "}
                  <FaClipboardList /> <p>Gestion des Catégories</p>{" "}
                </Content>{" "}
              </DashboardButton>
              <DashboardButton to={ADMIN_ALL_USERS_PATH}>
                {" "}
                <Content>
                  {" "}
                  <FaUser /> <p>Gestion des Pinners</p>{" "}
                </Content>{" "}
              </DashboardButton>
            </Grid>
          </Box>
        </Flex>
      </ContainerTable>
    </>
  );
};

export default Dashboard;
