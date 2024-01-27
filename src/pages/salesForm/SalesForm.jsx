import React from "react";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import SalesProducts from "../../components/salesForm/salesProducts/SalesProducts";
import { Link } from "react-router-dom";

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
import { UserContext } from "../../context/UserIdContext";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./salesform.scss";
import { useNavigate } from "react-router-dom";
import { helpertext } from "../../components/HelperText";

const SalesForm = () => {
  const { accountId } = useContext(UserContext);
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

  const [customerList, setCustomerList] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const [productList, setProductList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  const [hsnCodes, setHsnCodes] = useState([]);
  const [salesPrefixData, setSalesPrefixData] = useState([]);
  const [defaultPrefixNo, setDefaultPrefixNo] = useState(0);

  const [businessGst, setBusinessGst] = useState("");
  const [paymentInPrefixNo, setPaymentInPrefixNo] = useState("");
  const [sacCodes, setSacCodes] = useState("");

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;

  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  useEffect(() => {
    setNerArr([]);
    setInvoiceItems({
      in_serial_no: 0,
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: "",
      in_discount_price: "",
      in_discount_unit: "",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
    });
  }, [isGstBusiness]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetch/${accountId}`)
      .then((response) => {
        setCustomerData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${accountId}`)
      .then((response) => {
        setBusinessGst(response.data[0].business_gst);
      });
   
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchSalesPrefixData/${accountId}`
      )
      .then((response) => {
        setSalesPrefixData(response.data);
        setDefaultPrefixNo(response.data[0].sale_prefix_no);
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchPaymentPrefixData/${accountId}`
      )
      .then((response) => {
        setPaymentInPrefixNo(response.data[0].sale_payment_in_prefix_no);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData/${accountId}`
      )
      .then((response) => {
        setProductList(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchData/${accountId}`)
      .then((response) => {
        setServicesList(response.data);
      });
  }, [isGstBusiness]);

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
  const closeDrawer = () => {
    setState(false);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductHsnCodes`)
      .then((response) => {
        setHsnCodes(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchSacCodes1`)
      .then((response) => {
        setSacCodes(response.data);
      });
  }, [state]);

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
  const [searchCode, setSearchCode] = useState("");

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

  const [addNewPrefix, setAddNewPrefix] = useState(false);
  const [prefixSelected, setprefixSelected] = useState(true);
  const prefixSelectorHandler = () => {
    setprefixSelected(!prefixSelected);
  };
  let [nerArr, setNerArr] = useState([]);

  const handleChange2 = (item) => {
    addProducts
      ? setNerArr([
          {
            item_t_id: 1,
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
            item_cat: 1, // products
            sale_item_type: "pro",
          },
          ...nerArr,
        ])
      : setNerArr([
          {
            item_t_id: 1,
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
            item_cat: 0, // Services
            item_sales: item.ser_sales,
            sale_item_type: "ser",
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
              item_tax: item.item_tax === "1" ? "0" : "1",
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
              item_price: e.target.value.replace(numberValidation, "$1"),
              
            }
          : item
      )
    );

    if(e.target.value <= 0) {
      setSubDisabledContinue(true);
    } else  {
      setSubDisabledContinue(false);
    }
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
              item_discount_value: e.target.value.replace(
                numberValidation,
                "$1"
              ),
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
  const handleCustomGstChange = (productId, igst) => {
    console.log(productId, igst);
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_igst: igst ? parseFloat(igst) : 0,
              item_cgst: igst ? parseFloat(igst) / 2 : 0,
            }
          : item
      )
    );
  };
  const handleCustomCessChange = (productId, cess) => {
    console.log(productId, cess);
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_cess: cess ? cess : 0,
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
        productId === item.item_id && item.item_cat === 1
          ? {
              ...item,
              item_qty: item.item_qty + 1,
            }
          : item
      )
    );
  };
  const handleIncrease3 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id && item.item_cat === 0
          ? {
              ...item,
              item_qty: item.item_qty + 1,
            }
          : item
      )
    );
  };
  const handleDecrease = (productId) => {
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
        productId === item.item_id && item.item_qty >= 1 && item.item_cat === 1
          ? {
              ...item,
              item_qty: item.item_qty - 1,
            }
          : item
      )
    );
  };
  const handleDecrease3 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id && item.item_qty >= 1 && item.item_cat === 0
          ? {
              ...item,
              item_qty: item.item_qty - 1,
            }
          : item
      )
    );
  };

  useEffect(() => {
    setNerArr((prevNerArr) => prevNerArr.filter((item) => item.item_qty !== 0));
  }, [nerArr]);

  const [prefixNo, setPrefixNo] = useState(0);
  useEffect(() => {
    salesPrefixData
      .filter((code) => code.sale_prefix === prefixValue)
      .map((item) => setPrefixNo(parseInt(item.sale_prefix_no) + 1));
  }, [addPrefix]);
  const [addProducts, setAddProducts] = useState(true);
  const [addServices, setAddServices] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState({
    in_serial_no: 0,
    in_items: "",
    in_hsn_sac: "",
    in_qty: "",
    in_unit: "",
    in_sale_price: "",
    in_discount_value: "",
    in_discount_price: "",
    in_discount_unit: "",
    in_gst_prectentage: "",
    in_gst_amt: "",
    in_total_amt: "",
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
      in_gst_prectentage: null,
      in_gst_amt: null,
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
      in_sales_no: "",
      sale_item_type: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              sale_item_type: item.sale_item_type,
              in_tax: item.item_tax,
              in_id: item.item_id,
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
              in_sales_no: item.item_sales + item.item_qty,
            }
          : invoiceItems
      )
    );
    closeDrawer();
  };
  const check1 = (item_discount_unit, item_price, item_discount_value) => {
    const discount_value = item_discount_value ? item_discount_value : 0;
    return item_discount_unit === "percentage"
      ? parseFloat(item_price) - (item_price * discount_value) / 100
      : item_price - discount_value;
  };

  const check2 = (
    item_discount_unit,
    item_price,
    item_discount_value,
    item_igst,
    item_cess
  ) => {
    const tax =
      (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
      (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
    return item_discount_unit === "percentage"
      ? ((item_price / (tax / 100 + 1)) *
          (100 - (item_discount_value ? item_discount_value : 0))) /
          100
      : item_price / (tax / 100 + 1) -
          (item_discount_value ? item_discount_value : 0);
  };

  const check3 = (
    item_discount_unit,
    item_price,
    item_discount_value,
    item_igst,
    item_cess
  ) => {
    const tax =
      (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
      (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
    return (
      (tax *
        (item_discount_unit === "percentage"
          ? item_price - (item_price * item_discount_value) / 100
          : item_price)) /
      100
    );
  };

  const check4 = (
    item_discount_unit,
    item_price,
    item_discount_value,
    item_igst,
    item_cess
  ) => {
    const tax =
      (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
      (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
    return item_discount_unit === "percentage"
      ? ((item_price / (tax / 100 + 1)) *
          ((100 - item_discount_value) / 100) *
          tax) /
          100
      : item_price - item_price / ((item_igst !== "-" ? tax : 0) / 100 + 1);
  };

  const handleContinue3 = (e) => {
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
      in_cess_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
      in_sales_no: "",
      sale_item_type: "",
      in_tax: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              in_tax: item.item_tax,
              sale_item_type: item.sale_item_type,
              in_id: item.item_id,
              in_items: item.item_name,
              in_hsn_sac: item.item_code,
              in_qty: item.item_qty,
              in_unit: item.item_unit,
              in_sale_price: item.item_price,
              in_b_stock: item.item_b_stock - item.item_qty,
              in_discount_value: item.item_discount_value,
              in_discount_price:
                item.item_tax === "0"
                  ? check1(
                      item.item_discount_unit,
                      item.item_price,
                      item.item_discount_value
                    )
                  : check2(
                      item.item_discount_unit,
                      item.item_price,
                      item.item_discount_value,
                      item.item_igst,
                      item.item_cess
                    ),

              in_discount_unit: item.item_discount_unit
                ? item.item_discount_unit
                : "amount",

              in_gst_prectentage: item.item_igst
                ? parseFloat(item.item_igst)
                : 0,

              in_cess_prectentage: item.item_cess
                ? parseFloat(item.item_cess)
                : 0,

              in_gst_amt:
                item.item_tax === "0"
                  ? check3(
                      item.item_discount_unit,
                      item.item_price,
                      item.item_discount_value,
                      item.item_igst,
                      item.item_cess
                    )
                  : check4(
                      item.item_discount_unit,
                      item.item_price,
                      item.item_discount_value,
                      item.item_igst,
                      item.item_cess
                    ),
              in_total_amt: "",
              in_cat: item.item_cat,
              in_sales_no: item.item_sales + item.item_qty,
            }
          : invoiceItems
      )
    );
    closeDrawer();
  };
  let filteredInvoiceItems = [];
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
  const [amountPaid, setAmountPaid] = useState("");
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
    payment_in_prefix: "PaymentIn",
    payment_in_prefix_no: "",
    sale_acc_id: "",
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

    const [subDisabledContinue , setSubDisabledContinue] = useState(false);
    // useEffect(() => {
    //   if (nerArr.some((i) => i.item_value <= 0 )) { 
    //     setSubDisabledContinue(true);
       
    //   } else {
    //     setSubDisabledContinue(false);
    //   }

    // }, [nerArr])
    // useEffect(() => {
    //   nerArr.filter((i) => i.item_value <= 0 )
    //   if (items.length > 0) { 
    //     setSubDisabledContinue(false);
    //   } else {
    //     setSubDisabledContinue(true);
    //   }

    // }, [nerArr])

  const list = (anchor) => (
    <Box sx={{ width: 450 }} role="presentation">
      {anchor === "add" ? (
        <>
          <div>
            <div className="flex justify-between p-3 text-center items-center ">
              <div className="flex justify-between flex-row category  ">
                <button className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in">
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
                      .filter((code) =>
                        addProducts
                          ? code.product_name
                              .toLowerCase()
                              .startsWith(searchValue.toLowerCase())
                          : code.ser_name
                              .toLowerCase()
                              .startsWith(searchValue.toLowerCase())
                      )
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
                                  ₹
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
                                          addProducts
                                            ? handleDecrease2(
                                                filteredItem.product_id
                                              )
                                            : handleDecrease3(
                                                filteredItem.ser_id
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
                                          addProducts
                                            ? handleIncrease2(
                                                filteredItem.product_id
                                              )
                                            : handleIncrease3(
                                                filteredItem.ser_id
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
                                  e.preventDefault();
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
                              {(addProducts
                                ? nerArr.filter(
                                    (code) =>
                                      code.item_id ===
                                        filteredItem.product_id &&
                                      code.item_qty !== 0 &&
                                      code.item_cat === 1
                                  )
                                : nerArr.filter(
                                    (code) =>
                                      code.item_id === filteredItem.ser_id &&
                                      code.item_qty !== 0 &&
                                      code.item_cat === 0
                                  )
                              ).map((item) => (
                                
                                <div>
                                  <div>
                                    {isGstBusiness && (
                                      <Box className="box-sec margin-top-zero ">
                                        <label className="pl-2 ">
                                          Tax Included?
                                        </label>
                                        <Switch
                                          {...label}
                                          defaultChecked={
                                            item.item_tax === "1" ? true : false
                                          }
                                          color="success"
                                          onChange={() =>
                                            handleTaxIncluded(item.item_id)
                                          }
                                        />
                                      </Box>
                                    )}
                                  </div>
                                  <div className="flex flex-col">
                                    <Box className="box-sec">
                                      <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Selling Price"
                                        className="w-[50%] sec-1"
                                        size="small"
                                        name="sale_price"
                                        value={item.item_price}
                                        onChange={(e) =>
                                          handlePriceChange(item.item_id, e)
                                        }
                                        
                                        helperText={
                                          item.item_price > 0
                                            ? ""
                                            : helpertext[5].price
                                        }
                                      />

                                      <Box className="sec-2 w-[50%]">
                                        <select
                                          className=" py-[9.5px] border "
                                          name="discount_unit"
                                          onChange={(e) =>
                                            handleDiscountUnit(item.item_id, e)
                                          }
                                          defaultValue="amount"
                                        >
                                          <option value="amount">Amount</option>
                                          <option value="percentage">
                                            Percentage
                                          </option>
                                        </select>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          value={item.item_discount_value}
                                          onChange={(e) =>
                                            handleDiscountValue(item.item_id, e)
                                          }
                                          name="discount_value"
                                          className=" w-[35%]"
                                          required
                                          helperText={
                                            item.item_price > 0 ? "" : " "
                                          }
                                        />
                                      </Box>
                                    </Box>
                                  </div>

                                  {isGstBusiness ? (
                                    <Box className="box-sec box-sec-1 ">
                                      <div className=" mt-3">
                                        <div className="flex">
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
                                              item.item_igst > 0 ||
                                              item.item_cess > 0
                                                ? "(" +
                                                  item.item_cgst +
                                                  "% CGST + " +
                                                  item.item_cgst +
                                                  "% SGST/UT GST ; " +
                                                  item.item_igst +
                                                  "% IGST ; " +
                                                  item.item_cess +
                                                  "% CESS )"
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
                                        </div>

                                        <div className="mb-3 mt-4">
                                          {item.add_hsn && (
                                            <TextField
                                              id="outlined-basic"
                                              variant="outlined"
                                              label="Search By"
                                              className=" my-0 z-0 "
                                              size="small"
                                              placeholder="HSN Code or Product Name "
                                              onChange={(e) => {
                                                setSearchCode(e.target.value);
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </Box>
                                  ) : (
                                    ""
                                  )}
                                  <div>
                                    {item.add_hsn ? (
                                      <>
                                       

                                        {searchCode !== null &&
                                          (searchCode !== "") === true &&
                                          (addProducts ? hsnCodes : sacCodes)

                                            .filter(
                                              (code) =>
                                                code.hsn_code
                                                  .toString()
                                                  .startsWith(searchCode) ||
                                                code.hsn_desc
                                                  .toString()
                                                  .toLowerCase()
                                                  .startsWith(
                                                    searchCode
                                                      .toString()
                                                      .toLowerCase()
                                                  )
                                            )
                                            .map((hsnItem) => (
                                              <div
                                                key={hsnItem.id}
                                                className="flex card-sec"
                                                onClick={() => {
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
                                      <div className="m-0 pt-5"></div>
                                    )}
                                  </div>
                                  {item.add_gst ? (
                                    <>
                                      <Box className="box-sec ">
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
                                          inputProps={{ maxLength: 10 }}
                                          value={
                                            item.item_igst ? item.item_igst : 0
                                          }
                                          onChange={(e) => {
                                            handleCustomGstChange(
                                              item.item_id,
                                              e.target.value.replace(
                                                numberValidation,
                                                "$1"
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
                                          inputProps={{ maxLength: 10 }}
                                          value={item.item_cess}
                                          onChange={(e) => {
                                            handleCustomCessChange(
                                              item.item_id,
                                              e.target.value.replace(
                                                numberValidation,
                                                "$1"
                                              )
                                            );
                                          }}
                                        />
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
              className={subDisabledContinue ?  " py-2 px-4 !border-none cursor-not-allowed text-slate-400 bg-slate-200 p-2 rounded-[5px]  transition-all ease-in" : " text-blue-600  py-2 px-4 rounded-[5px] hover:text-white hover:bg-blue-600 transition-all ease-in" }
              style={{ border: "1px solid rgb(37, 99, 235)" }}
              disabled={subDisabledContinue}
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

  const navigate = useNavigate();

  if (paymentInPrefixNo === null) {
    saleData.payment_in_prefix_no = 1;
  } else {
    saleData.payment_in_prefix_no = parseInt(paymentInPrefixNo) + 1;
  }

  saleData.sale_acc_id = accountId;
  saleData.sale_amt_paid = amountPaid;
  saleData.sale_amt_due = totalGrossValue - parseFloat(amountPaid);
  saleData.sale_amt_type = amtPayMethod;

  saleData.sale_amt = total_amt;
  saleData.sale_name = custData.cust_name;
  saleData.cust_cnct_id = custData.cust_id;

  prefixValue === ""
    ? ((saleData.sale_prefix = "Invoice"),
      (saleData.sale_prefix_no = parseInt(defaultPrefixNo) + 1))
    : ((saleData.sale_prefix = temp), (saleData.sale_prefix_no = prefixNo));

  saleData.invoiceItemsList = filteredInvoiceItems;

  saleData.sale_amt_type !== "unpaid"
    ? (saleData.sale_desc = "PAYMENT IN")
    : null;

  amountPaid === "0" || amountPaid === "" ? (saleData.sale_amt_type = "unpaid") : "";

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sale/addSales",
        saleData
      );
      if (filteredInvoiceItems.some((i) => i.in_cat === 1)) {
        await axios.put(
          import.meta.env.VITE_BACKEND + "/api/sale/updateProductStockQty",
          saleData
        );
      }

      if (filteredInvoiceItems.some((i) => i.in_cat === 0)) {
        await axios.put(
          import.meta.env.VITE_BACKEND + "/api/sale/updateServicesSalesQty",
          saleData
        );
      }

      navigate("/sales");
    } catch (err) {
      console.log(err);
    }
  };

  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      saleData.sale_name !== "" &&
      filteredInvoiceItems.length > 0 &&
      saleData.sale_amt_paid >= 0 &&
      saleData.sale_amt_paid <= saleData.sale_amt &&
      error === null
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [saleData.sale_name, filteredInvoiceItems, saleData.sale_amt_paid, error]);

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
            <div className="flex gap-5 items-center">
              <Link
                to="/sales"
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
                className={
                  submitDisabled === false
                    ? " p-2 rounded text-green-600 hover:bg-green-600 hover:text-white"
                    : " cursor-not-allowed text-slate-400 bg-slate-200 p-2 rounded"
                }
                style={{
                  border: submitDisabled === false ? "1px solid #109E5B" : "",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Create Sale
              </button>
            </div>
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
                  disabled
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    disabled
                    value={
                      (custData.cust_flat ? custData.cust_flat + ", " : "") +
                      (custData.cust_area ? custData.cust_area + ", " : "") +
                      (custData.cust_city ? custData.cust_city + ", " : "") +
                      (custData.cust_state ? custData.cust_state + ", " : "") +
                      custData.cust_pin
                    }
                  />
                </div>
                <input
                  type="text"
                  disabled
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
                    placeholder="Prefix"
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
                    helperText={
                      addNewPrefix ? "Prefix Number Already Exists" : ""
                    }
                    name="prefix_number"
                  />
                </div>
                <div className=" absolute z-10 bg-white">
                  {addPrefix ? (
                    <div className=" category p-3 shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
                      <div className="w-full ">
                        <input
                          type="text"
                          className="border p-2 rounded-lg w-[58%] border-slate-400 h-[90%]"
                          placeholder="Prefix"
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
                    className="w-[90%] "
                    maxDate={todaysDate}
                    sx={{ height: "50px" }}
                    slotProps={{ textField: { size: "small" } }}
                    onError={(newError) => {
                      setError(newError);
                    }}
                  />
                </LocalizationProvider>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Your GSTIN"
                  value={businessGst}
                  disabled
                />

                <Autocomplete
                  options={states.map((item) => item.state_name)}
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
              <div className="grid grid-cols-8 place-items-center border-b border-slate-300 bg-slate-50 py-3">
                <div>SNo.</div>
                <div>Items</div>
                <div>HSN/SAC</div>
                <div>Quantity | Unit</div>
                <div>Selling Price | Rate (Incl. Discount)</div>
                <div>Discount | Unit</div>
                <div>GST | Amount</div>
                <div>Amount</div>
                {/* <div>Action</div> */}
              </div>
              <div className="h-[37vh] overflow-y-scroll">
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
                <div>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Amount Paid (₹)"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    value={amountPaid}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) =>
                      setAmountPaid(
                        e.target.value.replace(numberValidation, "$1")
                      )
                    }
                    helperText={
                      parseFloat(amountPaid) > parseFloat(totalGrossValue)
                        ? helpertext[5].price
                        : ""
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
                ₹
                {(
                  totalGrossValue.toFixed(2) -
                  (amountPaid ? parseFloat(amountPaid).toFixed(2) : 0)
                ).toFixed(2)}
              </div>
            </div>
            <div className="flex gap-2 text-lg">
              <div className="font-semibold">Total Amount :</div>
              <div> ₹
                {totalGrossValue > 0 ? totalGrossValue.toFixed(2) : "0.00"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SalesForm;
