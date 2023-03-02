import {
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {
  ADMIN_ALL_PINS_PATH,
  MAP_PATH,

} from "../paths";
import { DashboardButton } from "../../styles/base-styles"
import { Grid, Content } from "./Dashboard.styled"
import NavbarPage from "../../components/Navbar/NavbarPage";
import { FaUser, FaMapMarked, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
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
          <Heading>Tableau de bord</Heading>
        </Box>
        <Grid>
          <DashboardButton to={MAP_PATH}> <Content> <FaMapMarked/> <p>Afficher la carte</p> </Content> </DashboardButton>
          <DashboardButton to={ADMIN_ALL_PINS_PATH}> <Content> <FaMapMarkerAlt/> <p>Gestion des Pin</p> </Content> </DashboardButton>
          <DashboardButton to=""> <Content> <FaClipboardList/> <p>Gestion des Catégories</p> </Content> </DashboardButton>
          <DashboardButton to=""> <Content> <FaUser/> <p>Gestion des Pinners</p> </Content> </DashboardButton>
        </Grid>

        </Box>
        </Flex>
      </>
  )
};

export default Dashboard;
