import React from "react";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import Navbar from "../../navbar/Navbar";
import SalesProducts from "../salesProducts/SalesProducts";
import { Link, Navigate } from "react-router-dom";

import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./salesform.scss";
import { useNavigate } from "react-router-dom";

const SalesForm = () => {
  const { change, changeChange } = useContext(UserContext);
  const states = [
    {
      state_name: "Haryana",
    },
    {
      state_name: "Delhi",
    },
    {
      state_name: "Punjab",
    },
  ];

  const gst = [
    // {
    //   value: "taxExempted",
    //   label1: "Tax Exempted",
    //   label2: "(NO GST)",
    // },
    {
      value: "gst0",
      label1: 0,
      label2: 0,
      label3: 0,
    },
    {
      value: "gst0_1", // 0_1 => 0.1
      label1: 0.1,
      label2: 0.05,
      label3: 0.05,
    },
    {
      value: "gst0_25", // 0_25 => 0.25
      label1: 0.25,
      label2: 0.125,
      label3: 0.125,
    },
    {
      value: "gst3",
      label1: 3,
      label2: 1.5,
      label3: 1.5,
    },
    {
      value: "gst5",
      label1: 5,
      label2: 2.5,
      label3: 2.5,
    },
    {
      value: "gst6",
      label1: 6,
      label2: 3,
      label3: 3,
    },
    {
      value: "gst7_5", // 7_5  =>  7.5
      label1: 7.5,
      label2: 3.75,
      label3: 3.75,
    },
    {
      value: "gst12",
      label1: 12,
      label2: 6,
      label3: 6,
    },
    {
      value: "gst18",
      label1: 18,
      label2: 9,
      label3: 9,
    },
    {
      value: "gst28",
      label1: 28,
      label2: 14,
      label3: 14,
    },
  ];

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [select, setSelect] = useState(false);

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [gstValue1, setGstValue1] = useState("GST %");
  const [gstValue2, setGstValue2] = useState("");
  const [hsnCode, setHsnCode] = useState("HSN Code");
  const [hsnValue1, setHsnValue1] = useState(null);
  const [customGst, setcustomGst] = useState("");
  const [customeCess, setCustomeCess] = useState(null);

  const custom_gst_details =
    "(" +
    customGst / 2 +
    "% CSTS + " +
    customGst / 2 +
    "% SGST/UT GST ; " +
    customGst +
    "% IGST ; " +
    customeCess +
    "% CESS )";

  const [customerList, setCustomerList] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const [productList, setProductList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [businessdata, setBusinessdata] = useState([]);

  const [hsnCodes, setHsnCodes] = useState([]);
  const [salesPrefixData, setSalesPrefixData] = useState([]);
  const [defaultPrefixNo, setDefaultPrefixNo] = useState(0);
  const [defaultPrefixValue, setDefaultPrefixValue] = useState("");

  const [businessGst, setBusinessGst] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetch`)
      .then((response) => {
        setCustomerData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/act/fetchData")
      .then((response) => {
        setBusinessdata(response.data);
        setBusinessGst(response.data[0].business_gst);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData`)
      .then((response) => {
        setProductList(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchData`)
      .then((response) => {
        setServicesList(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sale/fetchSalesPrefixData`)
      .then((response) => {
        setSalesPrefixData(response.data);
        setDefaultPrefixNo(response.data[0].sale_prefix_no);
        setDefaultPrefixValue(
          response.data[0].sale_prefix == "Invoice"
            ? response.data[0].sale_prefix
            : ("Invoice", setDefaultPrefixNo(0))
        );
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductHsnCodes`)
      .then((response) => {
        setHsnCodes(response.data);
      });
  }, []);

  const [custAddress, setCustAddress] = useState(false);
  const [custData, setCustData] = useState({
    cust_id: "",
    cust_name: "",
    cust_number: "",
    cust_gst: "",
    cust_flat: "",
    cust_area: "",
    cust_city: "",
    cust_state: "",
    cust_pin: "",
  });

  const [searchValue, setSearchValue] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [addPrefix, setAddPrefix] = useState(false);
  const [prefixValue, setPrefixValue] = useState("");
  const [temp, setTemp] = useState("");

  const [addInvoiceItems, setAddInvoiceItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState(false);

  const [prefixSelected, setprefixSelected] = useState(true);
  const prefixSelectorHandler = () => {
    setprefixSelected(!prefixSelected);
  };

  const { enqueueSnackbar } = useSnackbar();

  const [nerArr, setNerArr] = useState([]);
  const handleChange2 = (item) => {
    addProducts
      ? setNerArr([
          {
            item_id: item.product_id,
            item_name: item.product_name,
            item_unit: item.primary_unit,
            item_price: item.sale_price,
            item_tax: item.tax,
            item_b_stock: item.balance_stock,
            item_code: item.hsn_code,
            item_desc: item.hsn_desc,
            item_qty: 1,
            item_igst: item.igst,
            item_cgst: item.cgst,
            item_cess: item.cess,
            item_discount_value: item.discount_value,
            item_discount_unit: item.discount_unit,
            add_hsn: false,
            add_gst: false,
            item_cat: 1,
          },
          ...nerArr,
        ])
      : setNerArr([
          {
            item_id: item.ser_id,
            item_name: item.ser_name,
            item_unit: item.ser_unit,
            item_price: item.ser_price,
            item_tax: item.ser_tax_included,
            item_code: item.ser_sac,
            item_desc: item.ser_sac_desc,
            item_qty: 1,
            item_igst: item.ser_igst,
            item_cgst: item.ser_cgst,
            item_cess: item.ser_cess,
            item_discount_value: item.discount_value,
            item_discount_unit: item.discount_unit,
            add_hsn: false,
            add_gst: false,
            item_cat: 0,
          },
          ...nerArr,
        ]);
  };

  const handleAddHsnCode = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              add_hsn: item.add_hsn === false ? true : false,
              add_gst: false,
            }
          : item
      )
    );
  };

  const handleAddGst = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              add_gst: item.add_gst === false ? true : false,
              add_hsn: false,
            }
          : item
      )
    );
  };

  const handleTaxIncluded = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_tax: item.item_tax === "yes" ? "no" : "yes",
            }
          : item
      )
    );
  };

  const handlePriceChange = (productId, e) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_price: e.target.value,
            }
          : item
      )
    );
  };

  const handleDiscountUnit = (productId, e) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_discount_unit: e.target.value,
            }
          : item
      )
    );
  };

  const handleDiscountValue = (productId, e) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_discount_value: e.target.value,
            }
          : item
      )
    );
  };

  const handleGstChange = (productId, igst, sgst, cgst) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_igst: igst,
              //item_sgst: sgst,
              item_cgst: cgst,
            }
          : item
      )
    );
  };

  const handleHsnChange = (productId, hsn, desc, igst, sgst, cgst) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_code: hsn,
              item_desc: desc,
              item_igst: igst,
              item_cgst: cgst,
            }
          : item
      )
    );
  };

  const handleCustomGstChange = (productId, igst, cess) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_igst: igst,
              item_cgst: igst / 2,
              item_cess: cess,
            }
          : item
      )
    );
  };

  const handleIncrease = (productId) => {
    addProducts
      ? setProductList((productList) =>
          productList.map((item) =>
            productId === item.product_id
              ? {
                  ...item,
                  qty: item.qty + 1,
                }
              : item
          )
        )
      : setServicesList((servicesList) =>
          servicesList.map((item) =>
            productId === item.ser_id
              ? {
                  ...item,
                  ser_qty: item.ser_qty + 1,
                }
              : item
          )
        );
  };

  const handleIncrease2 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_qty: item.item_qty + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    console.log(productId);
    addProducts
      ? setProductList((productList) =>
          productList.map((item) =>
            productId === item.product_id
              ? {
                  ...item,
                  qty: item.qty - 1,
                }
              : item
          )
        )
      : setServicesList((servicesList) =>
          servicesList.map((item) =>
            productId === item.ser_id
              ? {
                  ...item,
                  ser_qty: item.ser_qty - 1,
                }
              : item
          )
        );
  };

  const handleDecrease2 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id && item.item_qty >= 1
          ? {
              ...item,
              item_qty: item.item_qty - 1,
            }
          : item
      )
    );
  };

  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  const [prefixNo, setPrefixNo] = useState(0);
  useEffect(() => {
    salesPrefixData
      .filter((code) => code.sale_prefix === prefixValue)
      .map((item) => setPrefixNo(parseInt(item.sale_prefix_no) + 1));
  }, [addPrefix]);

  const [editCustAddress, setEditCustAddress] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [addProducts, setAddProducts] = useState(true);
  const [addServices, setAddServices] = useState(false);

  const [invoiceItems, setInvoiceItems] = useState({
    in_serial_no: 0,
    in_items: "Ghee",
    in_hsn_sac: "4533",
    in_qty: "6",
    in_unit: "KG",
    in_sale_price: "500",
    in_discount_value: "10%",
    in_discount_price: "450",
    in_discount_unit: "%",
    in_gst_prectentage: "10",
    in_gst_amt: "50",
    in_total_amt: "500",
  });

  const handleContinue2 = () => {
    setInvoiceItems({
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              in_items: item.item_name,
              in_hsn_sac: item.item_code,
              in_qty: item.item_qty,
              in_unit: item.item_unit,
              in_sale_price: item.item_price,
              in_discount_value: item.item_discount_value,
              in_b_stock: item.item_b_stock,
              in_discount_price:
                item.item_discount_unit === "percentage"
                  ? item.item_price -
                    (item.item_price *
                      (item.item_discount_value
                        ? item.item_discount_value
                        : 1)) /
                      100
                  : item.item_price -
                    (item.item_discount_value ? item.item_discount_value : 0),

              in_discount_unit: item.item_discount_unit
                ? item.item_discount_unit
                : "amount",
              in_total_amt: "",
              in_cat: item.item_cat,
            }
          : invoiceItems
      )
    );
    setSelectedItems(true);
  };

  const handleContinue3 = () => {
    console.log("nerlist : ", nerArr);
    setInvoiceItems({
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "amount",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              in_id: item.item_id,
              in_items: item.item_name,
              in_hsn_sac: item.item_code,
              in_qty: item.item_qty,
              in_unit: item.item_unit,
              in_sale_price: item.item_price,
              in_b_stock: item.item_b_stock - item.item_qty,

              in_discount_value: item.item_discount_value,

              in_discount_price:
                item.item_tax === "no"
                  ? item.item_discount_unit === "percentage"
                    ? parseFloat(item.item_price) -
                      (item.item_price *
                        (item.item_discount_value
                          ? item.item_discount_value
                          : 1)) /
                        100
                    : item.item_price -
                      (item.item_discount_value ? item.item_discount_value : 0)
                  : item.discount_unit === "percentage"
                  ? ((item.item_price / (item.igst / 100 + 1)) *
                      (100 -
                        (item.item_discount_value
                          ? item.item_discount_value
                          : 0))) /
                    100
                  : item.item_price / (item.item_igst / 100 + 1) -
                    (item.item_discount_value ? item.item_discount_value : 0),

              in_discount_unit: item.item_discount_unit
                ? item.item_discount_unit
                : "amount",

              in_gst_prectentage: item.item_igst ? item.item_igst : "-",
              in_gst_amt:
                item.item_tax === "no"
                  ? (item.item_igst *
                      (item.item_discount_unit === "percentage"
                        ? item.item_price -
                          (item.item_price * item.item_discount_value) / 100
                        : item.item_price)) /
                    100
                  : item.item_discount_unit === "percentage"
                  ? ((item.item_price / (item.item_igst / 100 + 1)) *
                      ((100 - item.item_discount_value) / 100) *
                      item.item_igst) /
                    100
                  : item.item_price -
                    item.item_price / (item.item_igst / 100 + 1),
              in_total_amt: "",
              in_cat: item.item_cat,
            }
          : invoiceItems
      )
    );
    setSelectedItems(true);
  };

  const filteredInvoiceItems = [];
  for (let i = 0; i < invoiceItems.length; i++) {
    if (invoiceItems[i].in_qty !== "") {
      filteredInvoiceItems.push(invoiceItems[i]);
    }
  }

  const totalGrossValue = filteredInvoiceItems
    .map(
      (item) =>
        parseFloat(item.in_qty) *
        (parseFloat(item.in_discount_price) +
          parseFloat(item.in_gst_amt ? item.in_gst_amt : 0))
    )
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  const [amtPayMethod, setAmtPayMethod] = useState("unpaid");
  const handlePayStatus = (event) => {
    setAmtPayMethod(event.target.value);
  };

  const [amountPaid, setAmountPaid] = useState(0);

  const [saleData, setSaleData] = useState({
    cust_cnct_id: "",
    sale_prefix: "",
    sale_prefix_no: "",
    sale_date: filteredDate,
    sale_name: "",
    sale_amt: "2500",
    invoiceItemsList: filteredInvoiceItems,
    sale_amt_paid: "",
    sale_amt_due: "",
    sale_amt_type: "",
    sale_desc: "",
  });

  const total_amt = filteredInvoiceItems
    .map(
      (item) =>
        parseFloat(item.in_qty) *
        (parseFloat(item.in_discount_price ? item.in_discount_price : 0) +
          parseFloat(item.in_gst_amt ? item.in_gst_amt : 0))
    )
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  const [state, setState] = useState({
    add: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box sx={{ width: 450 }} role="presentation">
      {anchor === "add" ? (
        <>
          <div>
            <div className="flex justify-between p-3 text-center items-center ">
              <div className="flex justify-between flex-row category  ">
                <button
                  className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
                  onClick={() => setAddInvoiceItems(false)}
                >
                  Back
                </button>
              </div>
              <div>
                <p className="font-semibold text-blue-500">
                  Select Expense Items
                </p>
              </div>
            </div>
            <div className=" bg-blue-100 p-4 text-sm  bg-opacity-50 flex gap-4">
              <div>
                <p
                  onClick={() => {
                    setAddProducts(true), setAddServices(false);
                  }}
                  class={addProducts ? "border-b-4" : ""}
                >
                  Products
                </p>
              </div>
              <div>
                <p
                  onClick={() => {
                    setAddProducts(false), setAddServices(true);
                  }}
                  class={addServices ? "border-b-4" : ""}
                >
                  Services
                </p>
              </div>
            </div>

            <div className="add-sales-section-wrapper">
              <div className="section-2 ">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      placeholder="Search for an expense item "
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                  </Box>

                  <Box>
                    {(addProducts ? productList : servicesList)
                      // .filter(
                      //   (code) =>
                      //     code.product_name.startsWith(searchValue) ||
                      //     code.product_id === searchValue
                      // )
                      .map((filteredItem) => (
                        <div
                          key={filteredItem.id}
                          className="category border-b-2"
                        >
                          <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded  flex flex-row justify-between">
                            <div>
                              <h2 className="pr-4 py-1">
                                {addProducts
                                  ? filteredItem.product_name
                                  : filteredItem.ser_name}
                              </h2>
                              <div className="flex gap-[10px] place-items-center">
                                <p className="text-slate-500 text-sm">PRICE</p>
                                <p className="text-slate-800 font-semibold text-lg">
                                  ₹{" "}
                                  {addProducts
                                    ? filteredItem.sale_price
                                    : filteredItem.ser_price}
                                </p>
                              </div>
                            </div>

                            {(addProducts
                              ? filteredItem.qty
                              : filteredItem.ser_qty) !== null &&
                            (addProducts
                              ? filteredItem.qty
                              : filteredItem.ser_qty) !== 0 ? (
                              <div>
                                <div>
                                  <span className="border border-blue-600 py-1 px-2 rounded">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          handleDecrease(
                                            addProducts
                                              ? filteredItem.product_id
                                              : filteredItem.ser_id
                                          ),
                                          handleDecrease2(
                                            addProducts
                                              ? filteredItem.product_id
                                              : filteredItem.ser_id
                                          );
                                      }}
                                      className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                    >
                                      -
                                    </button>
                                    <span className="px-2">
                                      {addProducts
                                        ? filteredItem.qty
                                        : filteredItem.ser_qty}
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleIncrease(
                                          addProducts
                                            ? filteredItem.product_id
                                            : filteredItem.ser_id
                                        ),
                                          handleIncrease2(
                                            addProducts
                                              ? filteredItem.product_id
                                              : filteredItem.ser_id
                                          );
                                      }}
                                      className="px-3 text-blue-600 hover:bg-blue-200 transition-all ease-in"
                                    >
                                      +
                                    </button>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault(),
                                    handleChange2(filteredItem);
                                  handleIncrease(
                                    addProducts
                                      ? filteredItem.product_id
                                      : filteredItem.ser_id
                                  );
                                }}
                                className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                              >
                                Add
                              </button>
                            )}
                          </div>

                          {(addProducts
                            ? filteredItem.qty
                            : filteredItem.ser_qty) !== null &&
                          (addProducts
                            ? filteredItem.qty
                            : filteredItem.ser_qty) !== 0 ? (
                            <div>
                              {nerArr
                                .filter(
                                  (code) =>
                                    code.item_id ===
                                    (addProducts
                                      ? filteredItem.product_id
                                      : filteredItem.ser_id)
                                )
                                .map((item) => (
                                  <div>
                                    <div>
                                      {item.item_tax === "yes" ? (
                                        <Box className="box-sec margin-top-zero ">
                                          <label className="pl-2 ">
                                            Tax Included?
                                          </label>
                                          <Switch
                                            {...label}
                                            defaultChecked
                                            color="success"
                                            onChange={() =>
                                              handleTaxIncluded(item.item_id)
                                            }
                                          />
                                        </Box>
                                      ) : (
                                        <Box className="box-sec margin-top-zero ">
                                          <label className="pl-2 ">
                                            Tax Included?
                                          </label>
                                          <Switch
                                            {...label}
                                            color="success"
                                            onChange={() =>
                                              handleTaxIncluded(item.item_id)
                                            }
                                          />
                                        </Box>
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <Box className="box-sec ">
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          label="Selling Price"
                                          className="w-[50%] sec-1"
                                          size="small"
                                          name="sale_price"
                                          defaultValue={item.item_price}
                                          onChange={(e) =>
                                            handlePriceChange(item.item_id, e)
                                          }
                                        />

                                        <Box className="sec-2 w-[50%]">
                                          <select
                                            className=" py-[8.5px] border"
                                            name="discount_unit"
                                            onChange={(e) =>
                                              handleDiscountUnit(
                                                item.item_id,
                                                e
                                              )
                                            }
                                            defaultValue="amount"
                                          >
                                            <option value="amount">
                                              Amount
                                            </option>
                                            <option value="percentage">
                                              Percentage
                                            </option>
                                          </select>
                                          <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) =>
                                              handleDiscountValue(
                                                item.item_id,
                                                e
                                              )
                                            }
                                            name="discount_value"
                                            className=" w-[35%]"
                                            required
                                          />
                                        </Box>
                                      </Box>
                                    </div>

                                    {isGstBusiness ? (
                                      <Box className="box-sec box-sex-1 ">
                                        <TextField
                                          id="outlined-read-only-input"
                                          value={
                                            item.item_code !== null &&
                                            item.item_code !== ""
                                              ? item.item_code
                                              : "HSN Code"
                                          }
                                          helperText={item.item_desc}
                                          className="sec-1 w-full"
                                          size="small"
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                          onClick={() => {
                                            handleAddHsnCode(item.item_id);
                                          }}
                                        />

                                        <TextField
                                          id="outlined-read-only-input"
                                          value={
                                            item.item_igst !== null
                                              ? item.item_igst + " GST %"
                                              : "GST %"
                                          }
                                          helperText={
                                            item.item_igst !== "" &&
                                            item.item_cess === ""
                                              ? item.item_cess !== ""
                                                ? "(" +
                                                  item.item_cgst +
                                                  "% CGST + " +
                                                  item.item_cgst +
                                                  "% SGST/UT GST ; " +
                                                  item.item_igst +
                                                  "% IGST ; " +
                                                  item.item_cess +
                                                  "% CESS )"
                                                : "(" +
                                                  item.item_cgst +
                                                  "% CGST + " +
                                                  item.item_cgst +
                                                  "% SGST/UT GST ; " +
                                                  item.item_igst +
                                                  "% IGST ; )"
                                              : ""
                                          }
                                          className="sec-2 w-full"
                                          size="small"
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                          onClick={() => {
                                            handleAddGst(item.item_id);
                                          }}
                                        />
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                    <>
                                      {item.add_hsn ? (
                                        <>
                                          <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Search By"
                                            className=" my-0 z-0"
                                            size="small"
                                            placeholder="HSN Code or Product Name "
                                            onChange={(e) => {
                                              setSearchValue(e.target.value);
                                            }}
                                          />

                                          {hsnCodes
                                            .filter(
                                              (code) =>
                                                code.hsn_code
                                                  .toString()
                                                  .startsWith(searchValue) ||
                                                code.hsn_desc.startsWith(
                                                  searchValue
                                                )
                                            )
                                            .map((hsnItem) => (
                                              <div
                                                key={hsnItem.hsn_code}
                                                className="flex card-sec"
                                                onClick={() => {
                                                  setHsnCode(hsnItem.hsn_code),
                                                    setHsnValue1(
                                                      hsnItem.hsn_desc
                                                    ),
                                                    setGstValue1(hsnItem.igst),
                                                    setGstValue2(
                                                      "( " +
                                                        hsnItem.cgst +
                                                        "% CGST + " +
                                                        hsnItem.sgst +
                                                        "% SGST/UT GST ; " +
                                                        hsnItem.igst +
                                                        "% IGST )"
                                                    );

                                                  handleAddHsnCode(
                                                    item.item_id
                                                  );
                                                  handleHsnChange(
                                                    item.item_id,
                                                    hsnItem.hsn_code,
                                                    hsnItem.hsn_desc,
                                                    hsnItem.igst,
                                                    hsnItem.cgst,
                                                    hsnItem.sgst
                                                  );
                                                }}
                                              >
                                                <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded">
                                                  <div className="flex gap-6 pb-4">
                                                    <h2 className=" rounded bg-slate-300 px-6 py-1 ">
                                                      {hsnItem.hsn_code}
                                                    </h2>
                                                    <h2 className=" rounded bg-slate-300 px-4 py-1 ">
                                                      {hsnItem.igst + "% GST"}
                                                    </h2>
                                                  </div>
                                                  <p>{hsnItem.hsn_desc}</p>
                                                </div>
                                              </div>
                                            ))}
                                        </>
                                      ) : (
                                        <span className="m-0"></span>
                                      )}
                                    </>
                                    {item.add_gst ? (
                                      <>
                                        <Box className="box-sec">
                                          <div className="gst-section-wrapper">
                                            <div className="gst-section">
                                              {gst.map((gstItem, index) => (
                                                <div
                                                  className="flex card-sec"
                                                  key={index}
                                                >
                                                  <div className="gst-card-text">
                                                    <h2 className=" font-medium">
                                                      {"GST@ " +
                                                        gstItem.label1 +
                                                        "%"}
                                                    </h2>
                                                    <p className=" text-sm">
                                                      {"( " +
                                                        gstItem.label2 +
                                                        "% CGST ; " +
                                                        gstItem.label3 +
                                                        "% SGST/UT GST ; " +
                                                        gstItem.label1 +
                                                        "% IGST )"}
                                                    </p>
                                                  </div>
                                                  <div className="customer-info-icon-wrapper">
                                                    <input
                                                      type="radio"
                                                      id="gst_on_selected_item"
                                                      name="gst"
                                                      onChange={() => {
                                                        setGstValue1(
                                                          gstItem.label1
                                                        ),
                                                          setGstValue2(
                                                            "( " +
                                                              gstItem.label1 +
                                                              "% IGST + " +
                                                              gstItem.label2 +
                                                              "% SGST/UT GST ; " +
                                                              gstItem.label3 +
                                                              "% CGST )"
                                                          );
                                                        handleAddGst(
                                                          item.item_id
                                                        );
                                                        handleGstChange(
                                                          item.item_id,
                                                          gstItem.label1,
                                                          gstItem.label2,
                                                          gstItem.label3
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </Box>
                                        <div>Custom Tax %</div>
                                        <Box className="box-sec">
                                          <TextField
                                            label="GST"
                                            id="outlined-basic"
                                            variant="outlined"
                                            className="sec-1 w-full"
                                            size="small"
                                            required
                                            onChange={(e) => {
                                              setcustomGst(
                                                e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                )
                                              );
                                            }}
                                          />
                                          <TextField
                                            label="CESS"
                                            id="outlined-basic"
                                            variant="outlined"
                                            className="sec-2 w-full"
                                            size="small"
                                            required
                                            onChange={(e) => {
                                              setCustomeCess(
                                                e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                )
                                              );
                                            }}
                                          />
                                        </Box>
                                        <Box className="box-sec">
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault(),
                                                setGstValue1(customGst),
                                                setGstValue2(
                                                  custom_gst_details
                                                );
                                              setIsClicked2(false);
                                              handleCustomGstChange(
                                                item.item_id,
                                                customGst,
                                                customeCess ? customeCess : 0
                                              );
                                            }}
                                          >
                                            Add Custome Gst
                                          </button>
                                        </Box>
                                      </>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                  </Box>
                </Box>
              </div>
            </div>
          </div>
          <div
            onClick={
              isGstBusiness === false ? handleContinue2 : handleContinue3
            }
            className="flex justify-between p-3 px-5"
          >
            <button
              onClick={() => {
                setSelectedItems(true), setAddInvoiceItems(false);
              }}
              className="text-blue-600  py-2 px-4 rounded-[5px] hover:text-white hover:bg-blue-600 transition-all ease-in"
              style={{ border: "1px solid rgb(37, 99, 235)" }}
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </Box>
  );

  saleData.sale_amt_paid = amountPaid;
  saleData.sale_amt_due = totalGrossValue - parseInt(amountPaid);
  saleData.sale_amt_type = amtPayMethod;
  const navigate = useNavigate();
  console.log("totalGrossValue : ", totalGrossValue, total_amt);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      (saleData.sale_amt = total_amt),
        (saleData.sale_name = custData.cust_name),
        (saleData.cust_cnct_id = custData.cust_id);

      prefixValue === ""
        ? ((saleData.sale_prefix = "Invoice"),
          (saleData.sale_prefix_no = parseInt(defaultPrefixNo) + 1))
        : ((saleData.sale_prefix = temp), (saleData.sale_prefix_no = prefixNo));

      saleData.invoiceItemsList = filteredInvoiceItems;

      saleData.sale_amt_type !== "unpaid"
        ? (saleData.sale_desc = "PAYMENT IN")
        : null;
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sale/addSales",
        saleData
      );
      
      navigate("/sales");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["add"]}
        onClose={toggleDrawer("add", false)}
      >
        {list("add")}
      </Drawer>
      <div className="salesform">
        <Navbar />
        <div className="p-4 bg-slate-100 h-[90vh]">
          <div className="w-full bg-white rounded-lg border border-slate-300 p-2 flex items-center justify-between">
            <div className="flex gap-5">
              <Link
                to="/Sales"
                className="rounded-full p-1 hover:bg-slate-200"
                style={{ transition: "all 400ms ease-in-out" }}
              >
                <IconArrowLeft />
              </Link>
              <div className="text-md font-semibold">Create Sale</div>
            </div>
            <div className="flex items-center font-semibold gap-8">
              <div className="flex items-center">
                GST Registered Business ?
                <Switch defaultChecked onChange={handleBusinessGst} />
              </div>
              <button
                className="p-2 rounded text-green-600 hover:bg-green-600 hover:text-white"
                style={{
                  border: "1px solid #109E5B",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Create Sale
              </button>
            </div>
            {/* <div className="text-md font-semibold">
            {submitDisabled ? (
              <button
                disabled={submitDisabled}
                className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              >
                Create Sale
              </button>
            ) : (
              <button
                onClick={handleClick}
                disabled={submitDisabled}
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
              >
                Create Sale
              </button>
            )}
          </div> */}
          </div>
          <div className="flex gap-4 mt-4">
            <div className="w-full bg-white rounded-xl border border-slate-300 p-5">
              <div className="font-semibold text-slate-700 text-lg">
                Party Details
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Party Name"
                  onClick={(e) => setCustomerList(true)}
                  value={custData.cust_name}
                />
                {customerList ? (
                  <div className="absolute bg-white z-10 p-3">
                    {customerData.map((item, index) => (
                      <div
                        className="flex justify-between"
                        onClick={() => {
                          setCustomerList(false),
                            setCustData({
                              ...custData,
                              cust_id: item.cust_id,
                              cust_name: item.cust_name,
                              cust_number: item.cust_number,
                              cust_gst: item.cust_gstin,
                              cust_flat: item.cust_sflat,
                              cust_area: item.cust_sarea,
                              cust_city: item.cust_scity,
                              cust_state: item.cust_sstate,
                              cust_pin: item.cust_spin,
                            });
                        }}
                      >
                        <div>{item.cust_name}</div>
                        <div>{item.cust_amt}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}

                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Phone Number"
                  value={custData.cust_number}
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    onClick={() => setEditCustAddress(true)}
                    value={
                      custData.cust_flat +
                      ", " +
                      custData.cust_area +
                      ", " +
                      custData.cust_city +
                      ", " +
                      custData.cust_state +
                      ", " +
                      custData.cust_pin
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="GSTIN (Optional)"
                  value={custData.cust_gst}
                />
              </div>
            </div>
            <div className="w-full bg-white rounded-xl border border-slate-300 p-5">
              <div className="font-semibold text-slate-700 text-lg">
                Invoice Details
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[58%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={prefixValue === "" ? "Invoice" : prefixValue}
                    onClick={() => setAddPrefix(true)}
                  />
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[32%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={
                      prefixValue === "" || prefixValue === undefined
                        ? parseInt(defaultPrefixNo) + 1
                        : prefixNo
                    }
                    name="prefix_number"
                  />
                </div>
                <div className=" absolute z-10 bg-white">
                  {addPrefix ? (
                    <div className=" category p-3 shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
                      <div className="w-full ">
                        {/* <TextField
                          label="Enter Prefix"
                          name="enter_prefix_name"
                          id="outlined-basic"
                          variant="outlined"
                          className="w-full"
                          size="small"
                          onChange={(e) => {
                            setTemp(e.target.value), setPrefixNo(1);
                          }}
                          required
                        /> */}
                        <input
                          type="text"
                          className="border p-2 rounded-lg w-[58%] border-slate-400 h-[90%]"
                          placeholder="Invoice Number"
                          onChange={(e) => {
                            setTemp(e.target.value), setPrefixNo(1);
                          }}
                        />
                      </div>

                      <div>
                        <p className="py-3">Select from added prefixes </p>
                        <div className="flex gap-3">
                          {defaultPrefixNo === 0 ? (
                            <p
                              className={`border cursor-pointer rounded-[10px] py-2 px-3 ${
                                temp === "Invoice" ? "selected_prefix" : ""
                              }`}
                              onClick={() => {
                                setTemp("Invoice");
                                setPrefixValue(prefixSelectorHandler);
                                setPrefixNo(1);
                              }}
                            >
                              Invoice
                            </p>
                          ) : (
                            ""
                          )}
                          {salesPrefixData.map((item) => (
                            <div
                              className={`flex flex-wrap  border cursor-pointer rounded-[10px] py-2 px-3 ${
                                temp === item.sale_prefix
                                  ? "selected_prefix"
                                  : ""
                              }`}
                              onClick={() => {
                                setTemp(item.sale_prefix);
                                setPrefixValue(prefixSelectorHandler);
                              }}
                            >
                              {item.sale_prefix}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full flex py-3 pt-5">
                        <div
                          className=" pr-6"
                          onClick={() => {
                            setPrefixValue(temp), setAddPrefix(false);
                          }}
                        >
                          <button
                            className="text-green-600 w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                            style={{ border: "1px solid #16a34a" }}
                          >
                            Save
                          </button>
                        </div>
                        <div className="" onClick={() => setAddPrefix(false)}>
                          <button
                            className="text-red-600 w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
                            style={{ border: "1px solid #dc2626" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={transactionDate}
                    onChange={(newValue) => setTransactionDate(newValue)}
                    format="LL"
                    className="w-[90%]"
                    maxDate={todaysDate}
                    sx={{ height: "50px" }}
                  />
                </LocalizationProvider>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Your GSTIN"
                  value={businessGst}
                />

                <Autocomplete
                  options={states.map((item) => item.state_name)}
                  //   onChange={(event, newValue) => {
                  //     setSecondaryUnitValue(newValue);
                  //   }}

                  id="disable-close-on-select"
                  className=" w-[90%] border-slate-400"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="State Of Supply"
                      className="border p-2 rounded-lg"
                      size="small"
                      name="cust_state"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg border border-slate-300 mt-4">
            <div className="font-semibold text-slate-700 text-lg p-4 border-b border-slate-300">
              Items On The Invoice
            </div>
            <div>
              <div className="grid grid-cols-9 place-items-center border-b border-slate-300 bg-slate-50 py-3">
                <div>SNo.</div>
                <div>Items</div>
                <div>HSN/SAC</div>
                <div>Quantity | Unit</div>
                <div>Selling Price | Rate (Incl. Discount)</div>
                <div>Discount | Unit</div>
                <div>GST | Amount</div>
                <div>Amount</div>
                <div>Action</div>
              </div>
              <div className="h-[37vh] overflow-y-scroll">
                {console.log("filteredInvoiceItems : ", filteredInvoiceItems)}
                <SalesProducts filteredInvoiceItems={filteredInvoiceItems} />
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-xl border border-slate-300 p-5 mt-4 flex justify-between">
            <button
              className="flex items-center gap-1 p-2 rounded-md text-blue-700 hover:bg-blue-600 hover:text-white"
              style={{
                border: "1px solid #2563eb",
                transition: "all 400ms ease-in-out",
              }}
              onClick={toggleDrawer("add", true)}
            >
              <IconPlus className="w-5 h-5" />
              Add Items from Inventory
            </button>
            <div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={amtPayMethod}
                  onChange={handlePayStatus}
                >
                  <FormControlLabel
                    value="unpaid"
                    control={<Radio />}
                    label="unpaid"
                  />
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online"
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {amtPayMethod !== "unpaid" ? (
              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                {/* <div>Amount Paid (₹) :</div> */}
                <div>
                  {" "}
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Amount Paid (₹)"
                    defaultValue={totalGrossValue}
                    onChange={(e) =>
                      setAmountPaid(
                        e.target.value <= totalGrossValue ? e.target.value : 0
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex gap-2 text-lg font-semibold text-slate-600">
              <div>Balance Due :</div>
              <div>
                ₹ {totalGrossValue - parseInt(amountPaid ? amountPaid : 0)}
              </div>
            </div>
            <div className="flex gap-2 text-lg">
              <div className="font-semibold">Total Amount :</div>
              <div>{totalGrossValue > 0 ? totalGrossValue : "0"}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SalesForm;
