import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const [picLoading, setPicLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const PostDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Edashboard");
      data.append("cloud_name", "gapshap");
      fetch("https://api.cloudinary.com/v1_1/gapshap/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })

        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "/api/user/sign-in",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userinfo", JSON.stringify(data.data));

      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  return (
    <>
      <VStack spacing={"5px"}>
        <FormControl id="email" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
          </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Upload Your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => PostDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          w={"100%"}
          m={"20px 0 0px 0"}
          colorScheme="blue"
          onClick={submitHandler}
        >
          sign-Up
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
