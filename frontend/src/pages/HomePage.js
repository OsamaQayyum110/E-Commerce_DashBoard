import React, { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";
import Signup from "../component/authentication/Signup";
import Login from "../component/authentication/Login";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("userinfo"));
    if (auth) navigate("/product");
  }, [navigate]);

  return (
    <>
      <Container maxW="container.sm" centerContent>
        <Box
          d="flex"
          textAlign="center"
          justifyContent="center"
          w="100%"
          p="4"
          m="40px 0px 15px 0px"
          borderRadius="lg"
          borderWidth="1px"
          background={"#ffff"}
        >
          <Text
            textAlign={"center"}
            justifyContent={"center"}
            fontSize={"4xl"}
            fontFamily={"Work sans"}
            color={"black"}
          >
            DashBoard
          </Text>
        </Box>
        <Box
          bg="white"
          textAlign="center"
          p={4}
          w="100%"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign-Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
