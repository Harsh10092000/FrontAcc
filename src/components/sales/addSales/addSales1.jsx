import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  IconX,
  IconCheck,
  IconChevronLeft,
  IconCategory,
  IconPlus,
  IconEdit,
  IconTrash,
  IconTrashFilled,
} from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import Autocomplete from "@mui/material/Autocomplete";
import "./addsales1.scss";
import Switch from "@mui/material/Switch";
import { common } from "@mui/material/colors";

const AddSales = (props) => {
  const prefixSuggestions = [
    {
      option: "None",
    },
    {
      option: "Office",
    },
    {
      option: "Travel",
    },
  ];

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

  const { changeChange, change } = useContext(UserContext);
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

  const handleAddHsnCode = () => {
    setIsClicked(!isClicked);
    setIsClicked2(false);
  };

  const handleAddGst = () => {
    setIsClicked2(!isClicked2);
    setIsClicked(false);
  };

  const [addItemsForm, setAddItemsForm] = useState(false);

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
    axios.get(`http://localhost:8000/api/auth/fetch`).then((response) => {
      setCustomerData(response.data);
    });
    axios.get("http://localhost:8000/api/act/fetchData").then((response) => {
      setBusinessdata(response.data);
      setBusinessGst(response.data[0].business_gst);
    });
    axios
      .get(`http://localhost:8000/api/auth/fetchProductData`)
      .then((response) => {
        setProductList(response.data);
      });

    axios.get(`http://localhost:8000/api/ser/fetchData`).then((response) => {
      setServicesList(response.data);
    });

    axios
      .get(`http://localhost:8000/api/sale/fetchSalesPrefixData`)
      .then((response) => {
        setSalesPrefixData(response.data);
        setDefaultPrefixNo(response.data[0].sale_prefix_no);
        setDefaultPrefixValue(
          response.data[0].sale_prefix === "Invoice"
            ? response.data[0].sale_prefix
            : ("Invoice", setDefaultPrefixNo(0))
        );
      });

    axios
      .get(`http://localhost:8000/api/auth/fetchProductHsnCodes`)
      .then((response) => {
        setHsnCodes(response.data);
      });
  }, []);



  const handleChange = () => {};
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

  const handleTaxIncluded = (productId, e) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              tax: item.tax === "yes" ? "no" : "yes",
            }
          : item
      )
    );
  };

  const handlePriceChange = (productId, e) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              sale_price: e.target.value,
            }
          : item
      )
    );
  };

  const handleDiscountUnit = (productId, e) => {
    console.log(productId, e.target.value)
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              discount_unit: e.target.value,
            }
          : item
      )
    );
  };
  const handleDiscountValue = (productId, e) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              discount_value: e.target.value,
            }
          : item
      )
    );
  };

  const handleGstChange = (productId, igst, sgst, cgst) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              igst: igst,
              sgst: sgst,
              cgst: cgst,
            }
          : item
      )
    );
  };

  const handleHsnChange = (productId, hsn, desc, igst, sgst, cgst) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              hsn_code: hsn,
              hsn_desc: desc,
              igst: igst,
              sgst: sgst,
              cgst: cgst,
            }
          : item
      )
    );
  };

  const handleIncrease = (productId) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id && item.qty >= 1
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
    );
  };

  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  let [list, setList] = useState({
    id: "",
    expense_name: "",
    price: "",
    qty: "",
    total_price: 0,
  });

  let sum = 0;
  for (var i = 0; i < list.length; i++) {
    sum = parseInt(list[i].total_price) + parseInt(sum);
  }

  const [prefixNo, setPrefixNo] = useState(0);
  useEffect(() => {
    salesPrefixData
      .filter((code) => code.sale_prefix === prefixValue)
      .map(
        (item) => setPrefixNo(parseInt(item.sale_prefix_no) + 1)
        
      ) ;
      
  }, [addPrefix]);
 
  const [editCustAddress, setEditCustAddress] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // useEffect(() => {
  //   if (sum !== "" && sum !== 0) {
  //     setSubmitDisabled(false);
  //   } else {
  //     setSubmitDisabled(true);
  //   }
  // }, [sum]);

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
    console.log(productList);
    setInvoiceItems({
      in_serial_no: 0,
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "Amount",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
    });
    setInvoiceItems((invoiceItems) =>
      productList.map((item) =>
        item.qty > 0
          ? {
              in_serial_no:
                invoiceItems.in_serial_no == 0
                  ? 1
                  : invoiceItems.in_serial_no + 1,
              in_items: item.product_name,
              in_hsn_sac: item.hsn_code,
              in_qty: item.qty,
              in_unit: item.primary_unit,
              in_sale_price: item.sale_price,
              in_discount_value: item.discount_value,

              in_discount_price:
                item.discount_unit === "percentage"
                  ? item.sale_price -
                    (item.sale_price * item.discount_value) / 100
                  : item.sale_price - item.discount_value,

              in_discount_unit: item.discount_unit,
              in_total_amt: "",
            }
          : invoiceItems
      )
    );
    setSelectedItems(true);
  };

  const handleContinue3 = () => {
    console.log("product list : ", productList);
    setInvoiceItems({
      in_serial_no: 0,
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "Amount",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
    });
    setInvoiceItems((invoiceItems) =>
    
      productList.map((item) =>
        item.qty > 0
          ? {
              in_serial_no:
                invoiceItems.in_serial_no == 0
                  ? 1
                  : invoiceItems.in_serial_no + 1,
              in_items: item.product_name,
              in_hsn_sac: item.hsn_code,
              in_qty: item.qty,
              in_unit: item.primary_unit,
              in_sale_price: item.sale_price,
              in_discount_value: item.discount_value,

              // in_discount_price:
              //   item.tax === "no"
              //     ? item.discount_unit === "percentage"
              //       ? parseFloat(item.sale_price) -
              //         (item.sale_price * item.discount_value ? item.discount_value : 1) / 100
              //       : item.sale_price - item.discount_value ? item.discount_value : 0
              //     : item.discount_unit === "percentage"
              //     ? ((item.sale_price / (item.igst ? item.igst : 1 / 100 + 1)) *
              //         (100 - item.discount_value ? item.discount_value : 0)) /
              //       100
                    
              //     : item.sale_price / ((item.igst ? item.igst : 0) / 100 + 1) -
              //       item.discount_value ? item.discount_value : 0,
                     
              in_discount_price:
                item.tax === "no"
                  ? item.discount_unit === "percentage"
                    ? parseFloat(item.sale_price) -
                      (item.sale_price * item.discount_value ? item.discount_value : 1) / 100
                    : item.sale_price - item.discount_value ? item.discount_value : 0
                  : item.discount_unit === "percentage"
                  ? ((item.sale_price / (item.igst / 100 + 1)) *
                      (100 - item.discount_value ? item.discount_value : 0)) /
                    100
                  : (item.sale_price / (item.igst / 100 + 1) ) -
                    item.discount_value ? item.discount_value : 0,

                  
              in_discount_unit: item.discount_unit,
              in_gst_prectentage: item.igst ? item.igst : "-",
              in_gst_amt:
                item.tax === "no"
                  ? (item.igst *
                      (item.discount_unit === "percentage"
                        ? item.sale_price -
                          (item.sale_price * item.discount_value) / 100
                        : item.sale_price)) /
                    100
                  : item.discount_unit === "percentage"
                  ? ((item.sale_price / (item.igst / 100 + 1)) *
                      ((100 - item.discount_value) / 100) *
                      item.igst) /
                    100
                  : item.sale_price - item.sale_price / (item.igst / 100 + 1),
              in_total_amt: "",
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


  const [printInvoice, setPrintInvoice] = useState(false);

  const [saleData, setSaleData] = useState({
    cust_cnct_id: "",
    sale_prefix: "",
    sale_prefix_no: "",
    sale_date: filteredDate,
    sale_name: "",
    sale_amt: "2500",
    invoiceItemsList: filteredInvoiceItems,
  });

  const total_amt = filteredInvoiceItems
    .map((item) => parseFloat(item.in_qty) * (parseFloat(item.in_discount_price ? item.in_discount_price : 0) + parseFloat(item.in_gst_amt ? item.in_gst_amt : 0)))
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      
      saleData.sale_amt = total_amt,
      saleData.sale_name = custData.cust_name,
      saleData.cust_cnct_id = custData.cust_id;
      saleData.invoiceItemsList = filteredInvoiceItems;
      prefixValue === ""
        ? ((saleData.sale_prefix = "Invoice"),
          (saleData.sale_prefix_no = parseInt(defaultPrefixNo) + 1 ))
        : ((saleData.sale_prefix = temp),
          (saleData.sale_prefix_no = prefixNo));
          console.log(saleData.sale_prefix_no)
      console.log("values : ", saleData);
      await axios.post("http://localhost:8000/api/sale/addSales", saleData);
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {addInvoiceItems === false ? (
        <>
          <div>
            <Box>
              <div>
                <h1 className="text_left heading">Create Sale</h1>
                <Box className="box-sec margin-top-zero ">
                  <label className="pl-2 ">GST Registered Business?</label>
                  <Switch
                    {...label}
                    defaultChecked
                    color="success"
                    onChange={handleBusinessGst}
                  />
                </Box>
              </div>
              <div className="add-sales-section-wrapper">
                <div className="section-2">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Box className="box-sec ">
                      <Box className="sec-1 w-[50%] pt-2">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={prefixValue === "" ? "Invoice" : prefixValue}
                          name="prefix_name"
                          className=" w-[65%]"
                          required
                          onClick={() => setAddPrefix(true)}
                        />
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={
                            prefixValue === "" || prefixValue === undefined
                              ? parseInt(defaultPrefixNo) + 1
                              : prefixNo
                          }
                          name="prefix_number"
                          onChange={handleChange}
                          className=" w-[35%]"
                          required
                        />
                      </Box>
                      <Box className="sec-2 w-[50%]">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className="pt-0"
                        >
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <DatePicker
                              label="Date"
                              value={todaysDate}
                              format="LL"
                              maxDate={todaysDate}
                              onChange={(e) => setTransactionDate(e)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </Box>
                    <Box>
                      {addPrefix ? (
                        <Box className=" category p-3 shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
                          <div className="w-full ">
                            <TextField
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
                            />
                          </div>

                          <div>
                            <p className="py-3">Select from added prefixes </p>
                            <div className="flex gap-3">
                              
                              
                                {salesPrefixData.filter(i => i.sale_prefix !== "Invoice") ? (
                                <p
                                  className={`border cursor-pointer rounded-[10px] py-2 px-3 ${ temp === "Invoice"
                                  ? "selected_prefix"
                                  : ""
                              }`}
                                  onClick={() => {
                                    setTemp("Invoice");
                                    setPrefixValue(prefixSelectorHandler);
                                    setPrefixNo(1)
                                  }}
                                >
                                  {console.log("temp : " , temp)}
                                  Invoice
                                </p>
                              ) : (
                                ""
                              )}
                              {salesPrefixData.map((item) => (
                                <p
                                  className={` border cursor-pointer rounded-[10px] py-2 px-3 ${
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
                                </p>
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
                            <div
                              className=""
                              onClick={() => setAddPrefix(false)}
                            >
                              <button
                                className="text-red-600 w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
                                style={{ border: "1px solid #dc2626" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box className="box-sec ">
                      <Autocomplete
                        options={states.map((item) => item.state_name)}
                        //   onChange={(event, newValue) => {
                        //     setSecondaryUnitValue(newValue);
                        //   }}
                        id="disable-close-on-select"
                        className="w-full sec-1 mt-0 pb-3"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="outlined-basic"
                            variant="outlined"
                            label="State of Supply"
                            className="w-full"
                            size="small"
                            name="state_of_supply"
                          />
                        )}
                      />
                      <Box className="pr-3 pb-3 w-full">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Your GSTIN"
                          className="sec-2 w-full pr-3 pb-3"
                          size="small"
                          name="your_gst"
                          required
                          value={businessGst}
                        />
                      </Box>
                    </Box>

                    {/* ///////////// party details ////////// */}
                    <div>
                      <Box className="box-sec ">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Party Name"
                          className="w-full"
                          size="small"
                          name="cust_name"
                          onClick={(e) => setCustomerList(true)}
                          value={custData.cust_name}
                        />

                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Phone Number"
                          className="sec-2 w-full pr-3 pb-3"
                          size="small"
                          name="cust_no"
                          required
                          value={custData.cust_number}
                        />
                      </Box>
                      {customerList ? (
                        <div>
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
                      <Box className="box-sec">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="GSTIN (optional)"
                          className=" w-full"
                          //className="{`${isGstBusiness ? color: red}`}"
                          //disabled={isGstBusiness ? false : true}
                          size="small"
                          name="cust_gst"
                          required
                          value={custData.cust_gst}
                        />
                      </Box>
                      <Box className="box-sec">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Party Address"
                          className="w-full"
                          size="small"
                          name="cust_address"
                          required
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
                      </Box>

                      {editCustAddress ? (
                        <div>
                          <Box className="box-sec">
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              label="Flat/Building No."
                              className="w-full"
                              size="small"
                              name="cust_flat"
                              required
                              value={custData.cust_flat}
                            />
                          </Box>
                          <Box className="box-sec">
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              label="Area/Locality"
                              className="sec-1 w-full"
                              size="small"
                              required
                              name="cust_area"
                              value={custData.cust_area}
                            />

                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              label="City"
                              className="sec-2 w-full"
                              size="small"
                              name="cust_city"
                              value={custData.cust_city}
                            />
                          </Box>
                          <Box className="box-sec ">
                            <Autocomplete
                              options={states.map((item) => item.state_name)}
                              //   onChange={(event, newValue) => {
                              //     setSecondaryUnitValue(newValue);
                              //   }}

                              id="disable-close-on-select"
                              className="w-full sec-1 mt-0 pb-3"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  id="outlined-basic"
                                  variant="outlined"
                                  label="State"
                                  className="w-full"
                                  size="small"
                                  name="cust_state"
                                />
                              )}
                            />
                            <Box className="pr-3 pb-3 w-full">
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Pin Code"
                                className="sec-2 w-full pr-3 pb-3"
                                size="small"
                                name="cust_pin"
                                required
                                value={custData.cust_pin}
                              />
                            </Box>
                          </Box>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <Box className="border rounded-[4px]">
                      <div className="p-3">
                        <div className="flex justify-between">
                          <p className="text-slate-800 font-semibold text-xl pb-3">
                            Items On the Invoice
                          </p>
                          {selectedItems ? (
                            <p
                              className="text-blue-600 font-semibold text-lg p-2 cursor-pointer rounded hover:bg-blue-100"
                              style={{ transition: "all 400ms ease-in-out" }}
                              onClick={() => setAddInvoiceItems(true)}
                            >
                              Edit List
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        {selectedItems
                          ? filteredInvoiceItems
                              .filter((i) => i.in_qty > 0)
                              .map((item, index) => (
                                <div className="flex justify-between border-b p-3 ">
                                  <div>
                                    <p className="text-xl text-slate-600">
                                      {item.in_items}
                                    </p>
                                    <p className="text-slate-500">
                                      Qty : {item.in_qty}
                                    </p>
                                  </div>
                                  <div>
                                    <p className=" font-[500] text-lg">
                                      ₹
                                      {(
                                        item.in_qty *
                                        (item.in_discount_price +
                                        item.in_gst_amt
                                          ? item.in_gst_amt
                                          : 0)
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))
                          : ""}
                        <p
                          className="text-green-600 border rounded-[10px] text-lg py-2 text-center mt-3 cursor-pointer hover:bg-green-100"
                          onClick={() => setAddInvoiceItems(true)}
                          style={{ transition: "all 400ms ease-in-out" }}
                        >
                          Select Items Ftom Inventory
                        </p>
                      </div>
                      <div className=" bg-slate-100 p-3 text-sm text-center">
                        <p>
                          𝒊 Inventory will NOT be updated if changes are made on
                          an invoice
                        </p>
                      </div>
                    </Box>
                    <Box className="box-sec">
                      <TextField
                        label="Amount Paid"
                        name="amount_paid"
                        value={sum > 0 ? sum : "0"}
                        id="outlined-basic"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        required
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
              </div>
            </Box>
          </div>
          <div className="add-customer-btn-wrapper1">
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
          </div>
        </>
      ) : (
        <>
          <div>
            <Box
              sx={{
                width: 450,
              }}
            >
              <div className="flex justify-between p-3 text-center items-center ">
                <div className="flex justify-between flex-row category  ">
                  <button
                    className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
                    onClick={() => setAddInvoiceItems(false)}
                  >
                    <IconChevronLeft />
                    Back
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-blue-500">
                    Select Expense Items
                  </p>
                </div>
              </div>
              <div className=" bg-blue-100 p-4 text-sm text-center bg-opacity-50">
                <p>
                  𝒊 Expense Items will not affect your regular inventory items
                </p>
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
                      {productList
                        .filter(
                          (code) =>
                            code.product_name.startsWith(searchValue) ||
                            code.product_id === searchValue
                        )
                        .map((filteredItem) => (
                          <div
                            key={filteredItem.id}
                            className="category border-b-2"
                          >
                            <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded  flex flex-row justify-between">
                              <div>
                                <h2 className="pr-4 py-1">
                                  {filteredItem.product_name}
                                </h2>
                                <div className="flex gap-[10px] place-items-center">
                                  <p className="text-slate-500 text-sm">
                                    PRICE
                                  </p>
                                  <p className="text-slate-800 font-semibold text-lg">
                                    ₹ {filteredItem.sale_price}
                                  </p>
                                </div>
                              </div>

                              {filteredItem.qty !== null &&
                              filteredItem.qty !== 0 ? (
                                <div>
                                  <div>
                                    <span className="border border-blue-600 py-1 px-2 rounded">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault(),
                                            handleDecrease(
                                              filteredItem.product_id
                                            );
                                        }}
                                        className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                      >
                                        -
                                      </button>
                                      <span className="px-2">
                                        {filteredItem.qty}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleIncrease(
                                            filteredItem.product_id
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
                                      handleIncrease(filteredItem.product_id);
                                  }}
                                  className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                >
                                  Add
                                </button>
                              )}
                            </div>

                            {filteredItem.qty !== null &&
                            filteredItem.qty !== 0 ? (
                              <div>
                                <div>
                                  {filteredItem.tax === "yes" ? (
                                    <Box className="box-sec margin-top-zero ">
                                      <label className="pl-2 ">
                                        Tax Included?
                                      </label>
                                      <Switch
                                        {...label}
                                        defaultChecked
                                        color="success"
                                        onChange={() =>
                                          handleTaxIncluded(
                                            filteredItem.product_id
                                          )
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
                                          handleTaxIncluded(
                                            filteredItem.product_id
                                          )
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
                                      //onClick={(e) => setCustomerList(true)}
                                      defaultValue={filteredItem.sale_price}
                                      onChange={(e) =>
                                        handlePriceChange(
                                          filteredItem.product_id,
                                          e
                                        )
                                      }
                                    />

                                    <Box className="sec-2 w-[50%]">
                                      <select
                                        className=" py-[8.5px] border"
                                        name="discount_unit"
                                        onChange={(e) =>
                                          handleDiscountUnit(
                                            filteredItem.product_id,
                                            e
                                          )
                                        }
                                        defaultValue="Amount"
                                      >
                                        <option
                                          value="amount"
                                          //onChange={() => handleDiscountUnit(filteredItem.product_id,e)}
                                        >
                                          Amount
                                        </option>
                                        <option
                                          value="percentage"
                                          //onChange={() => handleDiscountUnit(filteredItem.product_id,e)}
                                        >
                                          Percentage
                                        </option>
                                      </select>
                                      <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          handleDiscountValue(
                                            filteredItem.product_id,
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
                                        filteredItem.hsn_code !== null &&
                                        filteredItem.hsn_code !== ""
                                          ? filteredItem.hsn_code
                                          : "HSN Code"
                                      }
                                      helperText={filteredItem.hsn_desc}
                                      className="sec-1 w-full"
                                      size="small"
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      onClick={() => {
                                        handleAddHsnCode();
                                      }}
                                    />

                                    <TextField
                                      id="outlined-read-only-input"
                                      value={
                                        filteredItem.igst !== null
                                          ? filteredItem.igst + " GST %"
                                          : "GST %"
                                      }
                                      helperText={
                                        filteredItem.igst !== "" &&
                                        filteredItem.cess === ""
                                          ? filteredItem.cess !== ""
                                            ? "(" +
                                              filteredItem.cgst +
                                              "% CGST + " +
                                              filteredItem.sgst +
                                              "% SGST/UT GST ; " +
                                              filteredItem.igst +
                                              "% IGST ; " +
                                              filteredItem.cess +
                                              "% CESS )"
                                            : "(" +
                                              filteredItem.cgst +
                                              "% CGST + " +
                                              filteredItem.sgst +
                                              "% SGST/UT GST ; " +
                                              filteredItem.igst +
                                              "% IGST ; )"
                                          : ""
                                      }
                                      className="sec-2 w-full"
                                      size="small"
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      onClick={() => {
                                        handleAddGst();
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  ""
                                )}
                                <>
                                  {isClicked ? (
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
                                                setHsnValue1(hsnItem.hsn_desc),
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
                                              setIsClicked(false);
                                              handleHsnChange(
                                                filteredItem.product_id,
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
                                    <span className=" m-0"></span>
                                  )}
                                </>
                                {isClicked2 ? (
                                  <>
                                    <Box className="box-sec">
                                      <div className="gst-section-wrapper">
                                        <div className="gst-section">
                                          {gst.map((item, index) => (
                                            <div
                                              className="flex card-sec"
                                              key={index}
                                            >
                                              <div className="gst-card-text">
                                                <h2 className=" font-medium">
                                                  {"GST@ " + item.label1 + "%"}
                                                </h2>
                                                <p className=" text-sm">
                                                  {"( " +
                                                    item.label2 +
                                                    "% CGST ; " +
                                                    item.label3 +
                                                    "% SGST/UT GST ; " +
                                                    item.label1 +
                                                    "% IGST )"}
                                                </p>
                                              </div>
                                              <div className="customer-info-icon-wrapper">
                                                <input
                                                  type="radio"
                                                  id="gst_on_selected_item"
                                                  name="gst"
                                                  onChange={() => {
                                                    //setGstOnItem(item.value),
                                                    setGstValue1(item.label1),
                                                      setGstValue2(
                                                        "( " +
                                                          item.label1 +
                                                          "% IGST + " +
                                                          item.label2 +
                                                          "% SGST/UT GST ; " +
                                                          item.label3 +
                                                          "% CGST )"
                                                      );
                                                    setIsClicked2(false);

                                                    handleGstChange(
                                                      filteredItem.product_id,
                                                      item.label1,
                                                      item.label2,
                                                      item.label3
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
                                            e.target.value.replace(/\D/g, "")
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
                                            e.target.value.replace(/\D/g, "")
                                          );
                                        }}
                                      />
                                    </Box>
                                    <Box className="box-sec">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault(),
                                            setGstValue1(customGst),
                                            setGstValue2(custom_gst_details);
                                          setIsClicked2(false);
                                          // setIgst(customGst),
                                          //   setCgst(customGst / 2),
                                          //   setStategst(customGst / 2),
                                          //   setCustomeCess(customeCess);
                                          // {
                                          //   console.log(productData);
                                          // }
                                          setProductData({
                                            ...productData,
                                            igst: customGst,
                                            cgst: customGst / 2,
                                            sgst: customGst / 2,
                                            cess: customeCess,
                                          });
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
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                    </Box>
                  </Box>
                </div>
              </div>
            </Box>

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
          </div>
        </>
      )}
    </div>
  );
};

export default AddSales;
