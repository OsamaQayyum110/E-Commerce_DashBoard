import React, { useEffect } from "react";
import { Button, Box, Text, Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("userinfo"));
    if (!auth) navigate("/");
  }, [navigate]);
  const LogOut = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Box>
          <Text fontSize={"3xl"} p={2}>
            E-commerce Dashboard/
            <Avatar
              size={"md"}
              mx={2}
              cursor={"pointer"}
              src={JSON.parse(localStorage.getItem("userinfo")).pic}
            />
            {JSON.parse(localStorage.getItem("userinfo")).name}
          </Text>
        </Box>

        <Button colorScheme="red" m={3} onClick={LogOut}>
          Log out
        </Button>
      </Box>
    </>
  );
};

export default SideDrawer;
