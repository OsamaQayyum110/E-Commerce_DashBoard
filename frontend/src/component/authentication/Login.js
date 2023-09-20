import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
 
  const handleClick = () => setShow(!show);

  const submitHandlers = async () => {
    setLoading(true);
    if (!password || !email) {
      toast({
        title: "Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      console.log({ email, password });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userinfo", JSON.stringify(data.data));

      setLoading(false);
      navigate("/product");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle authentication error (e.g., show a message to the user)
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        // Handle other errors
        console.error(error);
        toast({
          title: "Error Occured!",
          description: error,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setLoading(false);
    }
  };

  

  return (
    <>
      <VStack spacing={"5px"}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          w={"100%"}
          m={"20px 0 0px 0"}
          colorScheme="blue"
          onClick={submitHandlers}
        >
          Login
        </Button>
        <Button
          w={"100%"}
          m={""}
          colorScheme="red"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("12345");
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;
