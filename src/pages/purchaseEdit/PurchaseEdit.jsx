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
import { useSnackbar } from "notistack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
//import "./salesform.scss";
import { useNavigate } from "react-router-dom";

const PurchaseEdit = () => {
  const { change, changeChange, purchaseId, accountId } =
    useContext(UserContext);
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

  const [supplierData, setSupplierData] = useState({});
  const [productList, setProductList] = useState([]);
  const [productListInItems, setProductListInItems] = useState([]);
  const [purchaseDataById, setPurchaseDataById] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [businessGst, setBusinessGst] = useState("");
  const [paymentOutPrefixNo, setPaymentOutPrefixNo] = useState("");
  const [invoiceItemList, setInvoiceItemList] = useState([]);

  const [addQty, setAddQty] = useState(false);

  const [amtPayMethod, setAmtPayMethod] = useState("");
  const handlePayStatus = (event) => {
    setAmtPayMethod(event.target.value);
  };

  const [amountPaid, setAmountPaid] = useState(0);
  const [payOutAmt, setPayOutAmt] = useState(0);

  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  useEffect(() => {
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
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchSup`)
      .then((response) => {
        setSupplierData({
          ...supplierData,
          sup_name: response.data[0].sup_name,
          sup_number: response.data[0].sup_number,
          sup_gstin: response.data[0].sup_gstin,
          sup_sflat: response.data[0].sup_sflat,
          sup_sarea: response.data[0].sup_sarea,
          sup_spin: response.data[0].sup_spin,
          sup_scity: response.data[0].sup_scity,
          sup_sstate: response.data[0].sup_sstate,
        });
      });
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/act/fetchData")
      .then((response) => {
        setBusinessGst(response.data[0].business_gst);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchDataById/${purchaseId}`
      )
      .then((response) => {
        setPurchaseDataById({
          ...purchaseDataById,
          purchase_date: response.data[0].purchase_date,
          purchase_name: response.data[0].purchase_name,
          purchase_prefix: response.data[0].purchase_prefix,
          purchase_prefix_no: response.data[0].purchase_prefix_no,
          purchase_amt: response.data[0].purchase_amt,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt_paid: response.data[0].purchase_amt_paid,
          purchase_amt_due: response.data[0].purchase_amt_due,
          purchase_amt_type: response.data[0].purchase_amt_type,
          purchase_pay_out_id: response.data[0].purchase_pay_out_id,
        });
        // setAmtPayMethod(response.data[0].purchase_amt_type);
        // setAmountPaid(response.data[0].purchase_amt_paid);
        setAmtPayMethod("unpaid");
        setAmountPaid(0);
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData/${accountId}`
      )
      .then((response) => {
        setProductList(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductHsnCodes`)
      .then((response) => {
        setHsnCodes(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/invoiceItemList/${purchaseId}/${accountId}`
      )
      .then((response) => {
        setProductListInItems(response.data);
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchaseTran/${purchaseId}`
      )
      .then((response) => {
        setInvoiceItemList(response.data);
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

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sup/fetchSup/${purchaseDataById.sup_cnct_id}`
      )
      .then((response) => {
        setSupplierData({
          ...supplierData,
          sup_name: response.data[0].sup_name,
          sup_number: response.data[0].sup_number,
          sup_gstin: response.data[0].sup_gstin,
          sup_sflat: response.data[0].sup_sflat,
          sup_sarea: response.data[0].sup_sarea,
          sup_spin: response.data[0].sup_spin,
          sup_scity: response.data[0].sup_scity,
          sup_sstate: response.data[0].sup_sstate,
        });
      });
  }, [purchaseDataById]);

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

  const [nerArr, setNerArr] = useState({
    product_id: "",
    product_name: "",
    primary_unit: "",
    purchase_price: "",
    tax: "",
    balance_stock: "",
    hsn_code: "",
    hsn_desc: "",
    item_qty: "",
    igst: "",
    cgst: "",
    cess: "",
    item_discount_value: "",
    item_discount_unit: "",
    add_hsn: false,
    add_gst: false,
    item_cat: 1,
  });

  useEffect(() => {
    setNerArr((nerArr) =>
      invoiceItemList.map((item) =>
        item.purchase_item_qty > 0
          ? {
              product_id: item.purchase_item_cnct_id,
              product_name: item.purchase_item_name,
              primary_unit: item.purchase_item_unit,
              purchase_price: item.purchase_item_price,
              tax: item.purchase_tax,
              balance_stock: "",
              hsn_code: item.purchase_item_code,
              hsn_desc: "",
              item_qty: item.purchase_item_qty,
              igst: item.purchase_item_gst,
              cgst: item.purchase_item_gst / 2,
              cess: item.purchase_item_cess,
              item_discount_value: item.purchase_item_disc_val,
              item_discount_unit: item.purchase_item_disc_unit,
              add_hsn: false,
              add_gst: false,
              item_cat: 1,
            }
          : item
      )
    );
  }, [invoiceItemList]);

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
        parseInt(productId) === parseInt(item.product_id)
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
              purchase_price: e.target.value,
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
              item_discount_value: e.target.value,
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

  // const handleCustomGstChange = (productId, igst, cess) => {
  //   setNerArr((nerArr) =>
  //     nerArr.map((item) =>
  //       productId === item.product_id
  //         ? {
  //             ...item,
  //             igst: igst,
  //             cgst: igst / 2,
  //             cess: cess,
  //           }
  //         : item
  //     )
  //   );
  // };

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

  const handleIncrease = (productId) => {
    setProductListInItems((productListInItems) =>
      productListInItems.map((item) =>
        parseInt(productId) === parseInt(item.purchase_item_cnct_id)
          ? {
              ...item,
              purchase_item_qty: item.purchase_item_qty
                ? parseInt(item.purchase_item_qty) + 1
                : 1,
            }
          : item
      )
    );
  };

  const handleIncrease2 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        parseInt(productId) === parseInt(item.product_id) && item.item_cat === 1
          ? {
              ...item,
              item_qty: parseInt(item.item_qty) + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setProductListInItems((productListInItems) =>
      productListInItems.map((item) =>
        parseInt(productId) === parseInt(item.purchase_item_cnct_id)
          ? {
              ...item,
              purchase_item_qty: parseInt(item.purchase_item_qty) - 1,
            }
          : item
      )
    );
  };

  const handleDecrease2 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        parseInt(productId) === parseInt(item.product_id) &&
        item.item_qty >= 1 &&
        item.item_cat === 1
          ? {
              ...item,
              item_qty: parseInt(item.item_qty) - 1,
            }
          : item
      )
    );
  };

  useEffect(() => {
    setNerArr((prevNerArr) => prevNerArr.filter((item) => item.item_qty !== 0));
  }, [nerArr]);

  const [invoiceItems, setInvoiceItems] = useState({
    in_serial_no: 0,
    in_items: "Ghee",
    in_hsn_sac: "4533",
    in_qty: "6",
    in_unit: "KG",
    in_purchase_price: "500",
    in_discount_value: "10%",
    in_discount_price: "450",
    in_discount_unit: "%",
    in_gst_prectentage: "10",
    in_gst_amt: "50",
    in_total_amt: "500",
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
              in_tax: 0,
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
    item_discount_unit,
    purchase_price,
    item_discount_value,
    item_igst,
    item_cess
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
    item_discount_unit,
    purchase_price,
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
          ? purchase_price - (purchase_price * item_discount_value) / 100
          : purchase_price)) /
      100
    );
  };

  const check4 = (
    item_discount_unit,
    purchase_price,
    item_discount_value,
    item_igst,
    item_cess
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
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        parseInt(item.item_qty) > 0
          ? {
              in_tax: item.tax,
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
                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value,
                      item.igst,
                      item.cess
                    ),

              // in_discount_price:
              //   item.tax === "0"
              //     ? item.item_discount_unit === "percentage"
              //       ? parseFloat(item.purchase_price) -
              //         (item.purchase_price *
              //           (item.item_discount_value
              //             ? item.item_discount_value
              //             : 1)) /
              //           100
              //       : item.purchase_price -
              //         (item.item_discount_value ? item.item_discount_value : 0)
              //     : item.discount_unit === "percentage"
              //     ? ((item.purchase_price / (item.igst / 100 + 1)) *
              //         (100 -
              //           (item.item_discount_value
              //             ? item.item_discount_value
              //             : 0))) /
              //       100
              //     : item.purchase_price / (item.igst / 100 + 1) -
              //       (item.item_discount_value ? item.item_discount_value : 0),

              in_discount_unit: item.item_discount_unit
                ? item.item_discount_unit
                : "amount",

              // in_gst_prectentage: item.igst ? item.igst : "-",
              // in_gst_prectentage: item.igst
              //   ? (item.igst ? parseFloat(item.igst) : 0) +
              //     (item.cess ? parseFloat(item.cess) : 0)
              //   : "-",
              in_gst_prectentage: item.igst ? parseFloat(item.igst) : 0,
              in_cess_prectentage: item.cess ? parseFloat(item.cess) : 0,
              // in_gst_amt:
              //   item.tax === "0"
              //     ? (item.igst *
              //         (item.item_discount_unit === "percentage"
              //           ? item.purchase_price -
              //             (item.purchase_price * item.item_discount_value) / 100
              //           : item.purchase_price)) /
              //       100
              //     : item.item_discount_unit === "percentage"
              //     ? ((item.purchase_price / (item.igst / 100 + 1)) *
              //         ((100 - item.item_discount_value) / 100) *
              //         item.igst) /
              //       100
              //     : item.purchase_price -
              //       item.purchase_price / (item.igst / 100 + 1),

              in_gst_amt:
                item.tax === "0"
                  ? check3(
                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value,
                      item.igst,
                      item.cess
                    )
                  : check4(
                      item.item_discount_unit,
                      item.purchase_price,
                      item.item_discount_value,
                      item.igst,
                      item.cess
                    ),

              in_total_amt: "",
              in_cat: item.item_cat,
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

  const totalGrossValue =
    filteredInvoiceItems.length != 0
      ? filteredInvoiceItems
          .map(
            (item) =>
              parseFloat(item.in_qty) *
              (parseFloat(item.in_discount_price) +
                parseFloat(item.in_gst_amt ? item.in_gst_amt : 0))
          )
          .reduce((acc, current) => {
            return acc + current;
          }, 0)
      : purchaseDataById.purchase_amt;

  const [purchaseData, setPurchaseData] = useState({
    purchase_prefix: "",
    purchase_prefix_no: "",
    sup_cnct_id: "",
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
    purchase_payOut_Id: "",
    purchase_id: "",
    purchase_acc_id: "",
  });

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;

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
    edit: false,
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
      {anchor === "edit" ? (
        <>
          <div>
            <div className="flex justify-between p-3 text-center items-center ">
              <div className="flex justify-between flex-row category  ">
                <button
                  className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
                  onClick={() => setEditInvoiceItems(false)}
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
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      placeholder="Search for an expense item "
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                  </Box>

{console.log("productListInItems : " , productListInItems)}
                  <Box>
                    {productListInItems
                        .filter((code) =>
                          code.purchase_item_name
                            .toLowerCase()
                            .startsWith(searchValue.toLowerCase())
                        )
                      .map((filteredItem) => (
                        <div
                          key={filteredItem.purchase_item_cnct_id}
                          className="category border-b-2"
                        >
                          {filteredItem.deleted === 1
                            ? () => setAddQty(true)
                            : () => setAddQty(false)}
                          <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded  flex flex-row justify-between">
                            <div>
                              <h2 className="pr-4 py-1">
                                {filteredItem.purchase_item_name}
                              </h2>
                              <div className="flex gap-[10px] place-items-center">
                                <p className="text-slate-500 text-sm">PRICE</p>
                                <p className="text-slate-800 font-semibold text-lg">
                                  ₹ {filteredItem.purchase_item_price}
                                </p>
                              </div>
                            </div>

                            {filteredItem.purchase_item_qty !== null &&
                            filteredItem.purchase_item_qty !== 0 ? (
                              <div>
                                <div>
                                  <span className="border border-blue-600 py-1 px-2 rounded">
                                    <button
                                      disabled={
                                        parseInt(filteredItem.deleted) === 1
                                          ? true
                                          : false
                                      }
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          handleDecrease(
                                            filteredItem.purchase_item_cnct_id
                                          ),
                                          handleDecrease2(
                                            filteredItem.purchase_item_cnct_id
                                          );
                                      }}
                                      className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                    >
                                      -
                                    </button>
                                    <span className="px-2">
                                      {filteredItem.purchase_item_qty}
                                    </span>
                                    <button
                                      disabled={
                                        parseInt(filteredItem.deleted) === 1
                                          ? true
                                          : false
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleIncrease(
                                          filteredItem.purchase_item_cnct_id
                                        );
                                        handleIncrease2(
                                          filteredItem.purchase_item_cnct_id
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
                              <div>
                                {productList
                                  .filter(
                                    (item2) =>
                                      item2.product_id ===
                                      parseInt(
                                        filteredItem.purchase_item_cnct_id
                                      )
                                  )
                                  .map((item3) => (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleChange2(item3);
                                        handleIncrease(
                                          filteredItem.purchase_item_cnct_id
                                        );
                                      }}
                                      className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                    >
                                      Add
                                    </button>
                                  ))}
                              </div>
                            )}
                          </div>
                          {filteredItem.deleted === 1 ? <div> items </div> : ""}

                          {filteredItem.purchase_item_qty !== "null" ? (
                            <div>
                              {nerArr
                                .filter(
                                  (code) =>
                                    parseInt(code.product_id) ===
                                      parseInt(
                                        filteredItem.purchase_item_cnct_id
                                      ) &&
                                    parseInt(code.item_qty) !== 0 &&
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
                                          id="outlined-basic"
                                          variant="outlined"
                                          label="Purchase Price"
                                          className="w-[50%] sec-1"
                                          size="small"
                                          name="purchase_price"
                                          defaultValue={item.purchase_price}
                                          onChange={(e) =>
                                            handlePriceChange(
                                              item.product_id,
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
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
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
                                          // helperText={
                                          //   item.igst !== "" && item.cess === ""
                                          //     ? item.cess !== ""
                                          //       ? "(" +
                                          //         item.cgst +
                                          //         "% CGST + " +
                                          //         item.cgst +
                                          //         "% SGST/UT GST ; " +
                                          //         item.igst +
                                          //         "% IGST ; " +
                                          //         item.cess +
                                          //         "% CESS )"
                                          //       : "(" +
                                          //         item.cgst +
                                          //         "% CGST + " +
                                          //         item.cgst +
                                          //         "% SGST/UT GST ; " +
                                          //         item.igst +
                                          //         "% IGST ; )"
                                          //     : ""
                                          // }
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
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Search By"
                                            className=" my-0 z-0"
                                            size="small"
                                            placeholder="HSN Code or Product Name "
                                            onChange={(e) => {
                                              setSearchCode(e.target.value);
                                            }}
                                          />

                                          {searchCode !== null &&
                                            (searchCode !== "") === true &&
                                            hsnCodes
                                              .filter(
                                                (code) =>
                                                  code.hsn_code
                                                    .toString()
                                                    .startsWith(searchCode) ||
                                                  code.hsn_desc.startsWith(
                                                    searchCode
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
                                            id="outlined-basic"
                                            variant="outlined"
                                            className="sec-1 w-full"
                                            size="small"
                                            required
                                            // value={
                                            //   item.igst ? item.igst : 0
                                            // }
                                            // onChange={(e) => {
                                            //   setcustomGst(
                                            //     e.target.value.replace(
                                            //       /\D/g,
                                            //       ""
                                            //     )
                                            //   );
                                            // }}
                                            value={item.igst}
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
                                            id="outlined-basic"
                                            variant="outlined"
                                            className="sec-2 w-full"
                                            size="small"
                                            required
                                            value={item.cess ? item.cess : 0}
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
                                        {/* <Box className="box-sec">
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault(),
                                                handleCustomGstChange(
                                                  item.product_id,
                                                  customGst,
                                                  customeCess ? customeCess : 0
                                                );
                                            }}
                                          >
                                            Add Custome Gst
                                          </button>
                                        </Box> */}
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

  if (paymentOutPrefixNo === null) {
    purchaseData.payment_out_prefix_no = 1;
  } else {
    purchaseData.payment_out_prefix_no = parseInt(paymentOutPrefixNo) + 1;
  }

  purchaseData.purchase_id = purchaseId;
  purchaseData.purchase_amt_paid = amountPaid;
  purchaseData.purchase_amt_due = totalGrossValue - parseInt(amountPaid);

  (purchaseData.purchase_prefix = purchaseDataById.purchase_prefix),
    (purchaseData.purchase_prefix_no = purchaseDataById.purchase_prefix_no),
    (purchaseData.purchase_amt = totalGrossValue
      ? totalGrossValue
      : purchaseDataById.purchase_amt);
  purchaseData.purchase_name = supplierData.sup_name;
  purchaseData.sup_cnct_id = purchaseDataById.sup_cnct_id;

  purchaseData.invoiceItemsList = filteredInvoiceItems;

  amtPayMethod !== "unpaid"
    ? (purchaseData.purchase_desc = "PAYMENT OUT")
    : null;

  amountPaid === "0" ? (purchaseData.purchase_amt_type = "unpaid") : "";
  purchaseData.purchase_amt_type = amtPayMethod;
  purchaseData.purchase_acc_id = accountId;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/deletePurchaseItems/${purchaseId}`
      );
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/purchase/updatePurchaseItems",
        purchaseData
      );
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/purchase/updatePurchaseModuleTran",
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
      filteredInvoiceItems.length > 0 &&
      purchaseData.purchase_amt_paid >= 0 &&
      purchaseData.purchase_amt_paid < purchaseData.purchase_amt
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [filteredInvoiceItems, purchaseData.purchase_amt_paid]);
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["edit"]}
        onClose={toggleDrawer("edit", false)}
      >
        {list("edit")}
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
              <div className="text-md font-semibold">Edit purchase</div>
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
                Edit purchase
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
                  value={supplierData.sup_name}
                />

                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Phone Number"
                  value={supplierData.sup_number}
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    value={
                      (supplierData.sup_sflat
                        ? supplierData.sup_sflat + ", "
                        : "") +
                      (supplierData.sup_sarea
                        ? supplierData.sup_sarea + ", "
                        : "") +
                      (supplierData.sup_scity
                        ? supplierData.sup_scity + ", "
                        : "") +
                      (supplierData.sup_sstate
                        ? supplierData.sup_sstate + ", "
                        : "") +
                      supplierData.sup_spin
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="GSTIN (Optional)"
                  value={supplierData.sup_gstin}
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
                    value={purchaseDataById.purchase_prefix}
                  />
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[32%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={purchaseDataById.purchase_prefix_no}
                    name="prefix_number"
                  />
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(purchaseDataById.purchase_date)}
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
              onClick={toggleDrawer("edit", true)}
            >
              <IconPlus className="w-5 h-5" />
              Edit Items from Inventory
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

            {/* {amtPayMethod !== "unpaid" ? (
              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Amount Paid (₹)"
                    defaultValue={purchaseDataById.purchase_amt_paid}
                    onChange={(e) =>
                      setAmountPaid(
                        e.target.value <= parseFloat(totalGrossValue)
                          ? e.target.value
                          : 0
                      )
                    }
                  />
                </div>
                {payOutAmt}
              </div>
            ) : (
              ""
            )} */}

            {amtPayMethod !== "unpaid" ? (
              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                <div>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Amount Paid (₹)"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    onChange={(e) =>
                      setAmountPaid(e.target.value > 0 ? e.target.value : 0)
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
                ₹{" "}
                {parseFloat(totalGrossValue).toFixed(2) -
                  parseInt(amountPaid ? amountPaid : 0)}
              </div>
            </div>
            <div className="flex gap-2 text-lg">
              <div className="font-semibold">Total Amount :</div>
              <div>
                {parseInt(
                  totalGrossValue
                    ? totalGrossValue
                    : purchaseDataById.purchase_amt
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PurchaseEdit;
