import { Button, Box, Text } from "@chakra-ui/react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackToDashboardButton = () => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Link to="/admin">
          <Button colorScheme="teal">
            <FaArrowCircleLeft />
            <Text pl="5px">Tableau de bord</Text>
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default BackToDashboardButton;
