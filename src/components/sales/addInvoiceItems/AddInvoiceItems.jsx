import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./addinvoiceitems.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const AddInvoiceItems = (props) => {
  const [productList, setProductList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  axios
    .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData`)
    .then((response) => {
      setProductList(response.data);
    });

  const [result2, setResult2] = useState([]);
  axios
    .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchData`)
    .then((response) => {
      setResult2(response.data);
    });

  return (
    <div>
      <div>
        <div>Select Items</div>
        <div>
          <div>Products</div>
          <div>Services</div>
        </div>
        <div>Add New Product</div>
        {productList.map((item, index) => (
          <div key={index} className="border p-3 ">
            <div>{item.product_name}</div>
            <div className="flex justify-between">
              <div>
                <div>Selling Price</div>
                <div>{item.sale_price}</div>
              </div>
              <div>
                <div>Stock</div>
                <div>{item.balance_stock}</div>
              </div>
              <div>Add</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddInvoiceItems;
