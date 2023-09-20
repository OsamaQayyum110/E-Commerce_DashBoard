import {
  Box,
  Button,
  Image,
  Text,
  useToast,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [company, setCompany] = useState([]);
  const [price, setPrice] = useState([]);
  const [category, setCategory] = useState([]);
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const SubmitProduct = async () => {
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
      const data = await axios.post(
        "/api/product/addproduct",
        { name, company, price, category, pic },
        config
      );

      toast({
        title: "Product Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("product", JSON.stringify(data.data));

      console.log(data.data);

      onClose();
      FetchProduct();
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

  const FetchProduct = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/product/productList", config);
      console.log(data);
      setProducts(data);
    } catch (error) {
      toast({
        title: "Failed to Load the Products",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
    }
  };

  const HandleSearch = async (event) => {
    try {
      let key = event.target.value;
      if (key) {
        const user = JSON.parse(localStorage.getItem("userinfo"));
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/product/search/${key}`, config);

        setProducts(data);
        console.log(data);
        console.log(user.token);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
    }
    FetchProduct();
  };

  const DeleteProduct = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/product/deleteProduct/${id}`,
        config
      );
      if (data) {
        toast({
          title: "Record is Deleted",
          description: "The Selected Item is Deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      console.log(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
    }
    FetchProduct();
  };

  useEffect(() => {
    console.log("Fetching products...");
    FetchProduct();
  }, []);

  return (
    <>
      <VStack display="flex" bg="white" p="5px 10px 5px 10px" borderWidth="5px">
        <Box width={"80%"} display={"flex"} m={3} ps={60}>
          <InputGroup display={"flex"}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              fontFamily="work sans"
              placeholder="Search"
              mr={2}
              width={"80%"}
              onChange={HandleSearch}
            />
          </InputGroup>

          <Button onClick={onOpen} colorScheme="green">
            Add Product
          </Button>

          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={"5px"}>
                  <FormControl id="product-name" isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      placeholder="Enter Product Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="company" isRequired>
                    <FormLabel>Company</FormLabel>
                    <Input
                      placeholder="Enter Company"
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="Price" isRequired>
                    <FormLabel>Price</FormLabel>
                    <InputGroup size={"md"}>
                      <Input
                        placeholder="Enter Price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="category" isRequired>
                    <FormLabel>Category</FormLabel>
                    <InputGroup size={"md"}>
                      <Input
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="pic">
                    <FormLabel>Upload Product Picture</FormLabel>
                    <Input
                      type="file"
                      p={1.5}
                      accept="image/*"
                      onChange={(e) => PostDetails(e.target.files[0])}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    SubmitProduct();
                  }}
                  isLoading={picLoading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        {/* problem hovi thi jb "Array.IsArray(product) &&" ni likha tha product.length say phlay madad chat gpt say mili after multiple regerations */}
        {Array.isArray(products) && products.length > 0 ? (
          products.map((item) => (
            <Box
              overflow="hidden"
              justifyContent={"space-between"}
              display={"flex"}
              width={"100%"}
              height={"20%"}
              p={2}
              px={10}
              key={item._id}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "10%", sm: "200px" }}
                src={item.pic}
                alt="Caffe Latte"
              />

              <Text my={"auto"} fontSize={"2xl"}>
                {item.name}
              </Text>

              <Text my={"auto"}>{item.category}</Text>
              <Text my={"auto"}>{item.company}</Text>
              <Text my={"auto"} fontSize="2xl" color="blue.600">
                {item.price}PKR
              </Text>

              <Box my={"auto"} spacing="2">
                <Link to={"/updateproduct/" + item._id}>
                  <Button
                    onClick={() => {
                      onOpen();
                    }}
                    colorScheme="blue"
                  >
                    Update
                  </Button>
                </Link>

                <Button
                  variant="solid"
                  onClick={() => DeleteProduct(item._id)}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <h1>No result found</h1>
        )}
      </VStack>
    </>
  );
};

export default Product;
