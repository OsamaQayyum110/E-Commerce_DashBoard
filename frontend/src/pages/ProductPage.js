import React from "react";
import SideDrawer from "../component/miscellaneous/SideDrawer";
import Product from "../component/Product";

const ProductPage = () => {
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Product />
    </div>
  );
};

export default ProductPage;
