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
import { useNavigate } from "react-router-dom";

const SalesEdit = () => {
  const {  accountId, saleId } = useContext(UserContext);
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
  const [customerData, setCustomerData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [businessGst, setBusinessGst] = useState("");
  const [paymentInPrefixNo, setPaymentInPrefixNo] = useState("");
  const [saleDataById, setSaleDataById] = useState([]);

  const [servicesListInItems, setServicesListInItems] = useState([]);
  const [productListInItems, setProductListInItems] = useState([]);
  const [invoiceItemList, setInvoiceItemList] = useState([]);
  const [sacCodes, setSacCodes] = useState("");


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
    
  }, [isGstBusiness])


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sale/fetchDataById/${saleId}`)
      .then((response) => {
        setSaleDataById({
          ...saleDataById,
          sale_id: response.data[0].sale_id,
          sale_date: response.data[0].sale_date,
          sale_name: response.data[0].sale_name,
          sale_prefix: response.data[0].sale_prefix,
          sale_prefix_no: response.data[0].sale_prefix_no,
          sale_amt: response.data[0].sale_amt,
          cust_cnct_id: response.data[0].cust_cnct_id,
          sale_amt_type: response.data[0].sale_amt_type,
        });
        // setAmtPayMethod(response.data[0].sale_amt_type);
        setAmtPayMethod("unpaid");
        //setAmountPaid(response.data[0].sale_amt_paid);
        setAmountPaid(0);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${accountId}`)
      .then((response) => {
        setBusinessGst(response.data[0].business_gst);
      });
    
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
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchPaymentPrefixData/${accountId}`
      )
      .then((response) => {
        setPaymentInPrefixNo(response.data[0].sale_payment_in_prefix_no);
      });
    

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/invoiceSerItemList/${saleId}/${accountId}`
      )
      .then((response) => {
        setServicesListInItems(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sale/fetchSaleTran/${saleId}`)
      .then((response) => {
        setInvoiceItemList(response.data);
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

      axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/invoiceProItemList/${saleId}/${accountId}`
      )
      .then((response) => {
        setProductListInItems(response.data);
      });

  }, [])

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/auth/fetchCust/${saleDataById.cust_cnct_id}`
      )
      .then((response) => {
        setCustomerData({
          ...customerData,
          cust_name: response.data[0].cust_name,
          cust_number: response.data[0].cust_number,
          cust_gstin: response.data[0].cust_gstin,
          cust_sflat: response.data[0].cust_sflat,
          cust_sarea: response.data[0].cust_sarea,
          cust_spin: response.data[0].cust_spin,
          cust_scity: response.data[0].cust_scity,
          cust_sstate: response.data[0].cust_sstate,
        });
      });
  }, [saleDataById]);

  let [nerArr, setNerArr] = useState([]);

  useEffect(() => {
    setNerArr((nerArr) =>
      invoiceItemList.map((item) =>
        item.sale_item_qty > 0
          ? {
              item_id: item.sale_item_cnct_id,
              item_name: item.sale_item_name,
              item_unit: item.sale_item_unit,
              item_price: item.sale_item_price,
              item_tax: item.sale_tax,
              item_b_stock: "",
              hsn_code: item.sale_item_code,
              item_code: "",
              item_qty: item.sale_item_qty,
              item_igst: item.sale_item_gst,
              item_cgst: item.sale_item_gst / 2,
              item_cess: item.sale_item_cess,
              item_discount_value: item.sale_item_disc_val,
              item_discount_unit: item.sale_item_disc_unit,
              add_hsn: false,
              add_gst: false,
              item_cat: item.sale_item_type === "pro" ? 1 : 0,
              sale_item_type: item.sale_item_type,
            }
          : item
      )
    );
  }, [invoiceItemList]);

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
            item_cat: 1, // products
            sale_item_type: "pro",
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
              item_price: e.target.value.replace(numberValidation , "$1"),
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
              item_discount_value: e.target.value.replace(numberValidation , "$1"),
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


  const handleCustomGstChange = (productId, igst) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        productId === item.item_id
          ? {
              ...item,
              item_igst: igst > 0 ? parseFloat(igst) : 0,
              item_cgst: igst > 0 ? parseFloat(igst) / 2 : 0,
            }
          : item
      )
    );
  };

  const handleCustomCessChange = (productId, cess) => {

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
      ? setProductListInItems((productListInItems) =>
          productListInItems.map((item) =>
            parseInt(productId) === parseInt(item.product_id)
              ? {
                  ...item,
                  sale_item_qty: parseInt(item.sale_item_qty) + 1,
                }
              : item
          )
        )
      : setServicesListInItems((servicesListInItems) =>
          servicesListInItems.map((item) =>
            parseInt(productId) === parseInt(item.ser_id)
              ? {
                  ...item,
                  sale_item_qty: parseInt(item.sale_item_qty) + 1,
                }
              : item
          )
        );
  };

  const handleIncrease2 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        parseInt(productId) === parseInt(item.item_id) && item.item_cat === 1
          ? {
              ...item,
              item_qty: parseInt(item.item_qty) + 1,
            }
          : item
      )
    );
  };

  const handleIncrease3 = (productId) => {
    setNerArr((nerArr) =>
      nerArr.map((item) =>
        parseInt(productId) === parseInt(item.item_id) && item.item_cat === 0
          ? {
              ...item,
              item_qty: parseInt(item.item_qty) + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    addProducts
      ? setProductListInItems((productListInItems) =>
          productListInItems.map((item) =>
            parseInt(productId) === parseInt(item.product_id)
              ? {
                  ...item,
                  sale_item_qty: parseInt(item.sale_item_qty) - 1,
                }
              : item
          )
        )
      : setServicesListInItems((servicesListInItems) =>
          servicesListInItems.map((item) =>
            parseInt(productId) === parseInt(item.ser_id)
              ? {
                  ...item,
                  sale_item_qty: parseInt(item.sale_item_qty) - 1,
                }
              : item
          )
        );
  };

  const handleDecrease2 = (productId) => {

    setNerArr((nerArr) =>
      nerArr.map(
        (item) =>
          parseInt(productId) === parseInt(item.item_id) &&
          item.item_qty >= 1 &&
          item.item_cat === 1
            ? {
                ...item,
                item_qty: item.item_qty - 1,
              }
            : item
        //nerArr.pop(nerArr[productId])
      )
    );
  };

  useEffect(() => {
    setNerArr((prevNerArr) => prevNerArr.filter((item) => item.item_qty !== 0));
  }, [nerArr]);

  const handleDecrease3 = (productId) => {

    setNerArr((nerArr) =>
      nerArr.map((item) =>
        parseInt(productId) === parseInt(item.item_id) &&
        item.item_qty >= 1 &&
        item.item_cat === 0
          ? {
              ...item,
              item_qty: item.item_qty - 1,
            }
          : item
      )
    );
  };

 

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
      in_gst_prectentage: null,
      in_gst_amt: null,
      in_total_amt: "",
      in_cat: "",
      in_b_stock: "",
      in_sales_no: "",
    });
    setInvoiceItems((invoiceItems) =>
      nerArr.map((item) =>
        item.item_qty > 0
          ? {
              in_tax: item.item_tax,
              in_id: item.item_id,
              sale_item_type: item.sale_item_type,
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
    setSelectedItems(true);
    closeDrawer();
  };

  const check1 = (item_discount_unit, item_price, item_discount_value) => {
    return item_discount_unit === "percentage"
      ? parseFloat(item_price) -
          (item_price * (item_discount_value ? item_discount_value : 1)) / 100
      : item_price - (item_discount_value ? item_discount_value : 0);
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

  // const check3 = (
  //   item_discount_unit,
  //   item_price,
  //   item_discount_value,
  //   item_igst,
  //   item_cess
  // ) => {
  //   return (
  //     (parseFloat(item_igst) +
  //       parseFloat(item_cess) *
  //         (item_discount_unit === "percentage"
  //           ? item_price - (item_price * item_discount_value) / 100
  //           : item_price)) /
  //     100
  //   );
  // };

  // const check4 = (
  //   item_discount_unit,
  //   item_price,
  //   item_discount_value,
  //   item_igst,
  //   item_cess
  // ) => {
  //   const tax =
  //     (parseFloat(item_igst) ? parseFloat(item_igst) : 0) +
  //     (parseFloat(item_cess) ? parseFloat(item_cess) : 0);
  //   return item_discount_unit === "percentage"
  //     ? ((item_price / (tax / 100 + 1)) *
  //         ((100 - item_discount_value) / 100) *
  //         tax) /
  //         100
  //     : item_price - item_price / ((item_igst !== "-" ? tax : 0) / 100 + 1);
  // };

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
  const closeDrawer = () => {
    setState(false);
  };


  const handleContinue3 = () => {
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

              // in_gst_prectentage: item.item_igst
              //   ? ((item.item_igst ? parseFloat(item.item_igst) : 0) + ( item.item_cess ? parseFloat(item.item_cess) : 0 ) )
              //   : "-",
              in_gst_prectentage:
                item.item_igst ? parseFloat(item.item_igst) : 0,
                
              in_cess_prectentage:
                item.item_cess ? parseFloat(item.item_cess) : 0,
                
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
    setSelectedItems(true);
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

  const [amountPaid, setAmountPaid] = useState(0);

  const [saleData, setSaleData] = useState({
    sale_id: saleDataById.sale_id,
    sale_payOut_Id: "",
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
    sale_payment_in_prefix: "PaymentIn",
    sale_payment_in_prefix_no: "",
    sale_acc_id: accountId,
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
                <button className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in">
                  Back
                </button>
              </div>
              <div>
                <p className="font-semibold text-blue-500">
                  Edit Invoice Items
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
                    {(addProducts ? productListInItems : servicesListInItems)
                      .filter((code) =>
                        addProducts
                          ? code.sale_item_name
                              .toLowerCase()
                              .startsWith(searchValue.toLowerCase())
                          : code.sale_item_name
                              .toLowerCase()
                              .startsWith(searchValue.toLowerCase())
                      )
                      .map((filteredItem) => (
                        <div className="category border-b-2">
                          <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded  flex flex-row justify-between">
                            <div>
                              <h2 className="pr-4 py-1">
                                {addProducts
                                  ? filteredItem.sale_item_name
                                  : filteredItem.sale_item_name}
                              </h2>
                              <div className="flex gap-[10px] place-items-center">
                                <p className="text-slate-500 text-sm">PRICE</p>
                                <p className="text-slate-800 font-semibold text-lg">
                                  ₹{" "}
                                  {addProducts
                                    ? filteredItem.sale_item_price
                                    : filteredItem.sale_item_price}
                                </p>
                              </div>
                            </div>

                            {(filteredItem.sale_item_qty !== null &&
                              parseInt(filteredItem.sale_item_qty)) !== 0 ? (
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
                                        ? filteredItem.sale_item_qty
                                        : filteredItem.sale_item_qty}
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
                              <div>
                                {(addProducts ? productList : servicesList)
                                  .filter(
                                    (item2) =>
                                      (addProducts
                                        ? item2.product_id
                                        : item2.ser_id) ===
                                      (addProducts
                                        ? parseInt(filteredItem.product_id)
                                        : parseInt(filteredItem.ser_id))
                                  )
                                  .map((item3) => (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleChange2(item3);
                                        addProducts
                                          ? handleIncrease(
                                              filteredItem.product_id
                                            )
                                          : handleIncrease(filteredItem.ser_id);
                                      }}
                                      className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                    >
                                      Add
                                    </button>
                                  ))}
                              </div>
                            )}
                          </div>

                          {parseInt(filteredItem.sale_item_qty) !== null &&
                          parseInt(filteredItem.sale_item_qty) !== 0 ? (
                            <div>
                              {(addProducts
                                ? nerArr.filter(
                                    (code) =>
                                      parseInt(code.item_id) ===
                                        parseInt(filteredItem.product_id) &&
                                      code.item_qty !== 0 &&
                                      code.item_cat === 1
                                  )
                                : nerArr.filter(
                                    (code) =>
                                      parseInt(code.item_id) ===
                                        parseInt(filteredItem.ser_id) &&
                                      parseInt(code.item_qty) !== 0 &&
                                      code.item_cat === 0
                                  )
                              ).map((item) => (
                                <div>
                                  <div>
                                  {isGstBusiness &&
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
                                      }
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
                                        value={item.item_price}
                                        onChange={(e) =>
                                          handlePriceChange(item.item_id, e)
                                        }
                                      />

                                      <Box className="sec-2 w-[50%]">
                                        <select
                                          className=" py-[9.5px] border"
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
                                        />
                                      </Box>
                                    </Box>
                                  </div>

                                  {isGstBusiness ? (
                                    <Box className="box-sec box-sec-1 ">
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
                                        item.item_igst > 0 || item.item_cess > 0 ? 
                                        "(" +
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
                                                  setSearchCode("");
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
                                          value={item.item_igst ? item.item_igst : 0}
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
                                      {/* <Box className="box-sec">
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault(),
                                              handleCustomGstChange(
                                                item.item_id,
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
              onClick={() => {
                setSelectedItems(true);
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

  const navigate = useNavigate();

  if (paymentInPrefixNo === null) {
    saleData.sale_payment_in_prefix_no = 1;
  } else {
    saleData.sale_payment_in_prefix_no = parseInt(paymentInPrefixNo) + 1;
  }

  saleData.cust_cnct_id = saleDataById.cust_cnct_id;
  saleData.sale_id = saleDataById.sale_id;
  saleData.sale_prefix = saleDataById.sale_prefix;
  saleData.sale_prefix_no = saleDataById.sale_prefix_no;
  saleData.sale_name = saleDataById.sale_name;
  saleData.sale_amt_paid = amountPaid;
  saleData.sale_amt_type = amtPayMethod;
  saleData.sale_amt = total_amt;
  saleData.invoiceItemsList = filteredInvoiceItems;
  saleData.sale_amt = totalGrossValue ? totalGrossValue : saleDataById.sele_amt;

  saleData.sale_amt_type !== "unpaid"
    ? (saleData.sale_desc = "PAYMENT IN")
    : null;

  amountPaid === "0" ? (saleData.sale_amt_type = "unpaid") : "";

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/sale/deleteSaleItems/${saleId}`
      );
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sale/updateSaleItems",
        saleData
      );
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/sale/updateSaleModuleTran",
        saleData
      );

      navigate("/sales");
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    if (
      filteredInvoiceItems.length > 0 &&
      saleData.sale_amt_paid >= 0 &&
      saleData.sale_amt_paid < saleData.sale_amt
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [filteredInvoiceItems, saleData.sale_amt_paid]);

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
              <div className="text-md font-semibold">Edit Sale</div>
            </div>
            <div className="flex items-center font-semibold gap-8">
              <div className="flex items-center">
                GST Registered Business ?
                <Switch defaultChecked onChange={handleBusinessGst} />
              </div>
              {/* <button
                className="p-2 rounded text-green-600 hover:bg-green-600 hover:text-white"
                style={{
                  border: "1px solid #109E5B",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Edit Sale
              </button> */}
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
                Edit Sale
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
                  value={customerData.cust_name}
                />

                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Phone Number"
                  value={customerData.cust_number}
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    value={
                      (customerData.cust_sflat ? customerData.cust_sflat +
                      ", " : "") +
                      (customerData.cust_sarea ? customerData.cust_sarea +
                      ", " : "") +
                      (customerData.cust_scity ? customerData.cust_scity +
                      ", " : "") +
                      (customerData.cust_sstate ? customerData.cust_sstate +
                      ", " : "") +
                      customerData.cust_spin
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="GSTIN (Optional)"
                  value={customerData.cust_gstin}
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
                    value={saleDataById.sale_prefix}
                  />
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[32%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={saleDataById.sale_prefix_no}
                    name="prefix_number"
                  />
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
                {filteredInvoiceItems.length > 0 ? (
                  <SalesProducts filteredInvoiceItems={filteredInvoiceItems} />
                ) : (
                  ""
                )}
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
            {/* {amtPayMethod !== "unpaid" ? (
              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Amount Paid (₹)"
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
                {totalGrossValue.toFixed(2) -
                  parseInt(amountPaid ? amountPaid : 0)}
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

export default SalesEdit;
