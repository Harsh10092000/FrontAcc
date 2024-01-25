import React from "react";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import PurchaseTran from "../../components/purchaseForm/purchaseTran/PurchaseTran";
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

import { useNavigate } from "react-router-dom";

const PurchaseForm = () => {
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
  const [supplierList, setSupplierList] = useState(false);
  const [supplierData, setSupplierData] = useState([]);
  const [productList, setProductList] = useState([]);

  const [hsnCodes, setHsnCodes] = useState([]);
  const [purchasePrefixData, setPurchasePrefixData] = useState([]);
  const [defaultPrefixNo, setDefaultPrefixNo] = useState(0);

  const [businessGst, setBusinessGst] = useState("");
  const [paymentOutPrefixNo, setPaymentOutPrefixNo] = useState("");

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
      in_purchase_price: "",
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
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData/${accountId}`
      )
      .then((response) => {
        setProductList(response.data);
      });
  }, [isGstBusiness]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchData/${accountId}`)
      .then((response) => {
        setSupplierData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${accountId}`)
      .then((response) => {
        setBusinessGst(response.data[0].business_gst);
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchasePrefixData/${accountId}`
      )
      .then((response) => {
        setPurchasePrefixData(response.data);
        setDefaultPrefixNo(response.data[0].purchase_prefix_no);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductHsnCodes`)
      .then((response) => {
        setHsnCodes(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchasePayPrefixData/${accountId}`
      )
      .then((response) => {
        setPaymentOutPrefixNo(response.data[0].purchase_pay_out_prefix_no);
      });
  }, []);

  const [supData, setSupData] = useState({
    sup_id: "",
    sup_name: "",
    sup_number: "",
    sup_gst: "",
    sup_flat: "",
    sup_area: "",
    sup_city: "",
    sup_state: "",
    sup_pin: "",
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

  const [prefixSelected, setprefixSelected] = useState(true);
  const prefixSelectorHandler = () => {
    setprefixSelected(!prefixSelected);
  };

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;
  const [nerArr, setNerArr] = useState([]);
  const handleChange2 = (item) => {
    setNerArr([
      {
        product_id: item.product_id,
        product_name: item.product_name,
        primary_unit: item.primary_unit,
        purchase_price: item.purchase_price,
        tax: item.tax,
        balance_stock: item.balance_stock,
        hsn_code: item.hsn_code,
        hsn_desc: item.hsn_desc,
        item_qty: 1,
        igst: item.igst,
        cgst: item.cgst,
        cess: item.cess,
        item_discount_value: item.discount_value,
        item_discount_unit: item.discount_unit,
        add_hsn: false,
        add_gst: false,
        item_cat: 1,
      },
      ...nerArr,
    ]);
  };

  const handleAddHsnCode = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id
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
        productId === item.product_id
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
        productId === item.product_id
          ? {
              ...item,
              tax: item.tax === "1" ? "0" : "1",
            }
          : item
      )
    );
  };

  const handlePriceChange = (productId, e) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              purchase_price: e.target.value.replace(numberValidation, "$1"),
            }
          : item
      )
    );
  };

  const handleDiscountUnit = (productId, e) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id
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
        productId === item.product_id
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
        productId === item.product_id
          ? {
              ...item,
              igst: igst,
              //item_sgst: sgst,
              cgst: cgst,
            }
          : item
      )
    );
  };

  const handleHsnChange = (productId, hsn, desc, igst, sgst, cgst) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              hsn_code: hsn,
              hsn_desc: desc,
              igst: igst,
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

  const handleIncrease2 = (productId) => {
    console.log("product");
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id && item.item_cat === 1
          ? {
              ...item,
              item_qty: item.item_qty + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
    );
  };

  const handleDecrease2 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id &&
        item.item_qty >= 1 &&
        item.item_cat === 1
          ? {
              ...item,
              item_qty: item.item_qty - 1,
            }
          : item
      )
    );
  };

  const handleCustomGstChange = (productId, igst) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              igst: igst ? parseFloat(igst) : 0,
              cgst: igst ? parseFloat(igst) / 2 : 0,
            }
          : item
      )
    );
  };

  const handleCustomCessChange = (productId, cess) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              cess: cess ? parseFloat(cess) : 0,
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
    purchasePrefixData
      .filter((code) => code.purchase_prefix === prefixValue)
      .map((item) => setPrefixNo(parseInt(item.purchase_prefix_no) + 1));
  }, [addPrefix]);

  const [invoiceItems, setInvoiceItems] = useState({
    in_serial_no: 0,
    in_items: "",
    in_hsn_sac: "",
    in_qty: "",
    in_unit: "",
    in_purchase_price: "",
    in_discount_value: "",
    in_discount_price: "",
    in_discount_unit: "",
    in_gst_prectentage: "",
    in_gst_amt: "",
    in_total_amt: "",
  });

  const closeDrawer = () => {
    setState(false);
  };

  const handleContinue2 = () => {
    setInvoiceItems({
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_purchase_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "",
      in_gst_prectentage: null,
      in_gst_amt: null,
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              in_id: item.product_id,
              in_items: item.product_name,
              in_hsn_sac: item.hsn_code,
              in_qty: item.item_qty,
              in_unit: item.primary_unit,
              in_purchase_price: item.purchase_price,
              in_discount_value: item.item_discount_value,
              in_b_stock: item.balance_stock,
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
    closeDrawer();
  };

  const check1 = (item_discount_unit, purchase_price, item_discount_value) => {
    return item_discount_unit === "percentage"
      ? parseFloat(purchase_price) -
          (purchase_price * (item_discount_value ? item_discount_value : 1)) /
            100
      : purchase_price - (item_discount_value ? item_discount_value : 0);
  };

  const check2 = (
    item_igst,
    item_cess,
    item_discount_unit,
    purchase_price,
    item_discount_value
  ) => {
    const tax =
      (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
      (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
    return item_discount_unit === "percentage"
      ? ((purchase_price / (tax / 100 + 1)) *
          (100 - (item_discount_value ? item_discount_value : 0))) /
          100
      : purchase_price / (tax / 100 + 1) -
          (item_discount_value ? item_discount_value : 0);
  };

  const check3 = (
    item_igst,
    item_cess,
    item_discount_unit,
    purchase_price,
    item_discount_value
  ) => {
    const tax =
      (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
      (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
    return (
      (tax *
        (item_discount_unit === "percentage"
          ? purchase_price - (purchase_price * item_discount_value) / 100
          : purchase_price)) /
      100
    );
  };

  const check4 = (
    item_igst,
    item_cess,
    item_discount_unit,
    purchase_price,
    item_discount_value
  ) => {
    const tax =
      (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
      (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
    return item_discount_unit === "percentage"
      ? ((purchase_price / (tax / 100 + 1)) *
          ((100 - item_discount_value) / 100) *
          tax) /
          100
      : purchase_price - purchase_price / (tax / 100 + 1);
  };

  const handleContinue3 = () => {
    setInvoiceItems({
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_purchase_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "amount",
      in_gst_prectentage: "",
      in_cess_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
      in_tax: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              in_id: item.product_id,
              in_items: item.product_name,
              in_hsn_sac: item.hsn_code,
              in_qty: item.item_qty,
              in_unit: item.primary_unit,
              in_purchase_price: item.purchase_price,
              in_b_stock: item.balance_stock + item.item_qty,

              in_discount_value: item.item_discount_value,

              in_discount_price:
                item.tax === "0"
                  ? check1(
                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value
                    )
                  : check2(
                      item.igst,
                      item.cess,
                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value
                    ),

              in_discount_unit: item.item_discount_unit
                ? item.item_discount_unit
                : "amount",

              in_gst_prectentage: item.igst ? parseFloat(item.igst) : 0,
              in_cess_prectentage: item.cess ? parseFloat(item.cess) : 0,

              in_gst_amt:
                item.tax === "0"
                  ? check3(
                      item.igst,
                      item.cess,
                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value
                    )
                  : check4(
                      item.igst,
                      item.cess,

                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value
                    ),
              in_total_amt: "",
              in_cat: item.item_cat,
              in_tax: item.tax,
            }
          : invoiceItems
      )
    );
    closeDrawer();
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
  const [purchaseData, setPurchaseData] = useState({
    sup_cnct_id: "",
    purchase_prefix: "",
    purchase_prefix_no: "",
    purchase_date: filteredDate,
    purchase_name: "",
    purchase_amt: "2500",
    invoiceItemsList: filteredInvoiceItems,
    purchase_amt_paid: "",
    purchase_amt_due: "",
    purchase_amt_type: "",
    purchase_desc: "",
    payment_out_prefix: "PaymentOut",
    payment_out_prefix_no: "",
    purchase_acc_id: "",
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

  const fieldAtt = {
    id: "outlined-basic",
    variant: "outlined",
    size: "small",
  };

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
                <p class="border-b-4">Products</p>
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
                      {...fieldAtt}
                      placeholder="Search for an expense item "
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                  </Box>

                  <Box>
                    {productList
                      .filter((code) =>
                        code.product_name
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
                                {filteredItem.product_name}
                              </h2>
                              <div className="flex gap-[10px] place-items-center">
                                <p className="text-slate-500 text-sm">PRICE</p>
                                <p className="text-slate-800 font-semibold text-lg">
                                  ₹ {filteredItem.purchase_price}
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
                                          ),
                                          handleDecrease2(
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
                                        handleIncrease(filteredItem.product_id);
                                        handleIncrease2(
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
                                  e.preventDefault();

                                  handleChange2(filteredItem);
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
                              {nerArr
                                .filter(
                                  (code) =>
                                    code.product_id ===
                                      filteredItem.product_id &&
                                    code.item_qty !== 0 &&
                                    code.item_cat === 1
                                )
                                .map((item) => (
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
                                              item.item_tax === "1"
                                                ? true
                                                : false
                                            }
                                            color="success"
                                            onChange={() =>
                                              handleTaxIncluded(item.product_id)
                                            }
                                          />
                                        </Box>
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <Box className="box-sec ">
                                        <TextField
                                          label="Purchase Price"
                                          className="w-[50%] sec-1"
                                          {...fieldAtt}
                                          name="purchase_price"
                                          value={item.purchase_price}
                                          onChange={(e) =>
                                            handlePriceChange(
                                              item.product_id,
                                              e
                                            )
                                          }
                                        />

                                        <Box className="sec-2 w-[50%]">
                                          <select
                                            className=" py-[9.5px] border"
                                            name="discount_unit"
                                            onChange={(e) =>
                                              handleDiscountUnit(
                                                item.product_id,
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
                                            {...fieldAtt}
                                            value={item.item_discount_value}
                                            onChange={(e) =>
                                              handleDiscountValue(
                                                item.product_id,
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
                                            item.hsn_code !== null &&
                                            item.hsn_code !== ""
                                              ? item.hsn_code
                                              : "HSN Code"
                                          }
                                          helperText={item.hsn_desc}
                                          className="sec-1 w-full"
                                          size="small"
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                          onClick={() => {
                                            handleAddHsnCode(item.product_id);
                                          }}
                                        />

                                        <TextField
                                          id="outlined-read-only-input"
                                          value={
                                            item.igst !== null
                                              ? item.igst + " GST %"
                                              : "GST %"
                                          }
                                          helperText={
                                            item.igst > 0 || item.cess > 0
                                              ? "(" +
                                                item.cgst +
                                                "% CGST + " +
                                                item.cgst +
                                                "% SGST/UT GST ; " +
                                                item.igst +
                                                "% IGST ; " +
                                                item.cess +
                                                "% CESS )"
                                              : ""
                                          }
                                          className="sec-2 w-full"
                                          size="small"
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                          onClick={() => {
                                            handleAddGst(item.product_id);
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
                                            label="Search By"
                                            className=" my-0 z-0"
                                            placeholder="HSN Code or Product Name "
                                            onChange={(e) => {
                                              setSearchCode(e.target.value);
                                            }}
                                          />

                                          {searchCode !== null &&
                                            searchCode !== "" &&
                                            hsnCodes
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
                                                      item.product_id
                                                    );
                                                    handleHsnChange(
                                                      item.product_id,
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
                                                        handleAddGst(
                                                          item.product_id
                                                        );
                                                        handleGstChange(
                                                          item.product_id,
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
                                            className="sec-1 w-full"
                                            {...fieldAtt}
                                            required
                                            value={item.igst ? item.igst : 0}
                                            inputProps={{ maxLength: 10 }}
                                            onChange={(e) => {
                                              handleCustomGstChange(
                                                item.product_id,
                                                e.target.value.replace(
                                                  numberValidation,
                                                  "$1"
                                                )
                                              );
                                            }}
                                          />
                                          <TextField
                                            label="CESS"
                                            className="sec-2 w-full"
                                            {...fieldAtt}
                                            required
                                            value={item.cess ? item.cess : 0}
                                            inputProps={{ maxLength: 10 }}
                                            onChange={(e) => {
                                              handleCustomCessChange(
                                                item.product_id,
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

  const navigate = useNavigate();

  purchaseData.purchase_acc_id = accountId;
  purchaseData.purchase_amt_paid = amountPaid;
  purchaseData.purchase_amt_due = totalGrossValue - parseInt(amountPaid);
  purchaseData.purchase_amt_type = amtPayMethod;

  purchaseData.purchase_amt = total_amt;
  purchaseData.purchase_name = supData.sup_name;
  purchaseData.sup_cnct_id = supData.sup_id;

  prefixValue === ""
    ? ((purchaseData.purchase_prefix = "Invoice"),
      (purchaseData.purchase_prefix_no = parseInt(defaultPrefixNo) + 1))
    : ((purchaseData.purchase_prefix = temp),
      (purchaseData.purchase_prefix_no = prefixNo));

  purchaseData.invoiceItemsList = filteredInvoiceItems;

  purchaseData.purchase_amt_type !== "unpaid"
    ? (purchaseData.purchase_desc = "PAYMENT OUT")
    : null;

  amountPaid === "0" ? (purchaseData.purchase_amt_type = "unpaid") : "";

  const handleClick = async (e) => {
    if (paymentOutPrefixNo === null) {
      purchaseData.payment_out_prefix_no = 1;
    } else {
      purchaseData.payment_out_prefix_no = parseInt(paymentOutPrefixNo) + 1;
    }
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/purchase/addPurchase",
        purchaseData
      );
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/purchase/updateProductStockQty",
        purchaseData
      );

      navigate("/purchase");
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      purchaseData.purchase_name !== "" &&
      filteredInvoiceItems.length > 0 &&
      purchaseData.purchase_amt_paid >= 0 &&
      purchaseData.purchase_amt_paid <= purchaseData.purchase_amt
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    purchaseData.purchase_name,
    filteredInvoiceItems,
    purchaseData.purchase_amt_paid,
  ]);

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
                to="/purchase"
                className="rounded-full p-1 hover:bg-slate-200"
                style={{ transition: "all 400ms ease-in-out" }}
              >
                <IconArrowLeft />
              </Link>
              <div className="text-md font-semibold">Create purchase</div>
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
                    : " cursor-not-allowed text-slate-600  p-2 rounded"
                }
                style={{
                  border:
                    submitDisabled === false
                      ? "1px solid #109E5B"
                      : "1px solid rgb(71, 85, 105)",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Create purchase
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
                  onClick={(e) => setSupplierList(true)}
                  value={supData.sup_name}
                />
                {supplierList ? (
                  <div className="absolute bg-white z-10 p-3">
                    {supplierData.map((item, index) => (
                      <div
                        className="flex justify-between"
                        onClick={() => {
                          setSupplierList(false),
                            setSupData({
                              ...supData,
                              sup_id: item.sup_id,
                              sup_name: item.sup_name,
                              sup_number: item.sup_number,
                              sup_gst: item.sup_gstin,
                              sup_flat: item.sup_sflat,
                              sup_area: item.sup_sarea,
                              sup_city: item.sup_scity,
                              sup_state: item.sup_sstate,
                              sup_pin: item.sup_spin,
                            });
                        }}
                      >
                        <div>{item.sup_name}</div>
                        <div>{item.sup_amt}</div>
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
                  value={supData.sup_number}
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    value={
                      (supData.sup_flat ? supData.sup_flat + ", " : "") +
                      (supData.sup_area ? supData.sup_area + ", " : "") +
                      (supData.sup_city ? supData.sup_city + ", " : "") +
                      (supData.sup_state ? supData.sup_state + ", " : "") +
                      supData.sup_pin
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="GSTIN (Optional)"
                  value={supData.sup_gst}
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
                          {purchasePrefixData.map((item) => (
                            <div
                              className={`flex flex-wrap  border cursor-pointer rounded-[10px] py-2 px-3 ${
                                temp === item.purchase_prefix
                                  ? "selected_prefix"
                                  : ""
                              }`}
                              onClick={() => {
                                setTemp(item.purchase_prefix);
                                setPrefixValue(prefixSelectorHandler);
                              }}
                            >
                              {item.purchase_prefix}
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
                      placeholder="State Of Supply"
                      className="border p-2 rounded-lg"
                      {...fieldAtt}
                      name="sup_state"
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
                <PurchaseTran filteredInvoiceItems={filteredInvoiceItems} />
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
                    {...fieldAtt}
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
                        ? "Error"
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
              <div>
                {totalGrossValue > 0 ? totalGrossValue.toFixed(2) : "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PurchaseForm;
