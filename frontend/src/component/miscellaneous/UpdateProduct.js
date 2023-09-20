import {
  Box,
  Button,

  useToast,
  VStack,
  InputGroup,

  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [pic, setPic] = useState();
  const [picloading, setPicLoading] = useState(false);

    const toast = useToast();
    
    const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getsingleproductdetails();
  }, []);
    
  const getsingleproductdetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/product/singleProduct/${params.id}`,
        config
      );
      console.log(data);
      setName(data.name);
      setCategory(data.category);
      setCompany(data.company);
      setPrice(data.price);
      setPic(data.pic);
    } catch (error) {
      toast({
        title: "Failed to Load the product",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
    }
    };
    
  const updateproduct = async () => {
    setPicLoading(true);
    if (!name || !company || !price || !category || !pic) {
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
    try {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = await axios.put(
        `/api/product/updateProduct/${params.id}`,
        { name, company, price, category, pic },
        config
      );

      toast({
        title: "Product Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("product", JSON.stringify(data.data));

      console.log(data.data);

        if (data) {
            navigate("/product");
        }
      setPicLoading(false);
    } catch (error) {
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

      setPicLoading(false);
    }
  };
  return (
    <>
      <VStack
        width={"100%"}
        display="flex"
        bg="white"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Box width={"50%"} m={3}>
          <VStack spacing={"5px"}>
            <FormControl id="product-name" isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="company" isRequired>
              <FormLabel>Company</FormLabel>
              <Input
                placeholder="Enter Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormControl>
            <FormControl id="Price" isRequired>
              <FormLabel>Price</FormLabel>
              <InputGroup size={"md"}>
                <Input
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <InputGroup size={"md"}>
                <Input
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="teal"
              m={9}
              px={20}
              py={6}
              onClick={() => updateproduct()}
            >
              Update Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default UpdateProduct;
