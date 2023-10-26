import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconX } from "@tabler/icons-react";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Switch from "@mui/material/Switch";
import "./addproduct.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const AddProduct = (props) => {
  const { changeChange } = useContext(UserContext);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [result, setResult] = useState([]);
  axios
    .get(`http://localhost:8000/api/auth/fetchProductUnits`)
    .then((response) => {
      setResult(response.data);
    });

  const [result2, setResult2] = useState([]);
  axios
    .get(`http://localhost:8000/api/auth/fetchProductHsnCodes`)
    .then((response) => {
      setResult2(response.data);
    });
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

  const units = [
    {
      value: "pieces",
      label: "Pieces - PCS",
    },
    {
      value: "numbers",
      label: "Numbers - NOS",
    },
    {
      value: "Days",
      label: "Days - DAY",
    },
    {
      value: "hours",
      label: "Hours - HRS",
    },
  ];

  
  //     value: "taxExempted",
  //     label1: "Tax Exempted",
  //     label2: "(NO GST)",
  //   },
  //   {
  //     value: "gst0",
  //     label1: "GST@ 0%",
  //     label2: "(NO GST)",
  //   },
  //   {
  //     value: "gst0_1", // 0_1 => 0.1
  //     label1: "GST@ 0.1%",
  //     label2: "(0.05% CSGT + 0.05% SGST/UT GST ; 0.1% IGST )",
  //   },
  //   {
  //     value: "gst0_25", // 0_25 => 0.25
  //     label1: "GST@ 0.25%",
  //     label2: "(0.125% CSGT + 0.125% SGST/UT GST ; 0.25% IGST )",
  //   },
  //   {
  //     value: "gst3",
  //     label1: "GST@ 3%",
  //     label2: "(1.5% CSGT + 1.5% SGST/UT GST ; 3% IGST )",
  //   },
  //   {
  //     value: "gst5",
  //     label1: "GST@ 5%",
  //     label2: "(2.5% CSGT + 2.5% SGST/UT GST ; 5% IGST )",
  //   },
  //   {
  //     value: "gst6",
  //     label1: "GST@ 6%",
  //     label2: "(3% CSGT + 3% SGST/UT GST ; 6% IGST )",
  //   },
  //   {
  //     value: "gst7_5", // 7_5  =>  7.5
  //     label1: "GST@ 7.5%",
  //     label2: "(3.75% CSGT + 3.75% SGST/UT GST ; 7.5% IGST )",
  //   },
  //   {
  //     value: "gst12",
  //     label1: "GST@ 12%",
  //     label2: "(6% CSGT + 6% SGST/UT GST ; 12% IGST )",
  //   },
  //   {
  //     value: "gst18",
  //     label1: "GST@ 18%",
  //     label2: "(9% CSGT + 9% SGST/UT GST ; 18% IGST )",
  //   },
  //   {
  //     value: "gst28",
  //     label1: "GST@ 28%",
  //     label2: "(14% CSGT + 14% SGST/UT GST ; 28% IGST )",
  //   },
  // ];
 
  const [isOn, setIsOn] = useState(false);
  const handleOnChange1 = () => {
    setIsOn(!isOn);
  };

  const [isOn2, setIsOn2] = useState(false);
  const handleOnChange2 = () => {
    setIsOn2(!isOn2);
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);

  const handleOnChange3 = () => {
    setIsClicked(!isClicked);
    setIsClicked2(false);
  };

  const handleOnChange4 = () => {
    setIsClicked2(!isClicked2);
    setIsClicked(false);
  };

  const [gstValue1, setGstValue1] = useState("GST %");
  const [gstValue2, setGstValue2] = useState("");

  const [hsnCode, setHsnCode] = useState("HSN Code");
  const [hsnValue1, setHsnValue1] = useState(null);

  const [searchValue, setSearchValue] = useState("0");

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

   const [igst, setIgst] = useState(null);
  // const [stategst, setStategst] = useState(null);
  // const [cgst, setCgst] = useState(null);
  //const [cess, setCess] = useState(null);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);

  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("File Name");
  const [fileExists, setFileExists] = useState(false);

  const [primaryUnitValue, setPrimaryUnitValue] = useState(null);
  const [secondaryUnitValue, setSecondaryUnitValue] = useState("");

  const [productData, setProductData] = useState({
    product_name: "",
    primary_unit: "",
    secondary_unit: "",
    sale_price: "",
    purchase_price: "",
    tax: "",
    opening_stock: "",
    low_stock: 0,
    balance_stock: 0,
    entry_date: "",
    hsn_code: "",
    hsn_desc: "",
    sgst: "",
    igst: "",
    cess: "",
    conversion: "",
    cgst: "",
  });
  const handleChange = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  productData.entry_date = filteredDate;
  // productData.sgst = stategst;
  // productData.igst = igst;
  // productData.cgst = cgst;
  // productData.cess = customeCess;
  // productData.hsn_desc = hsnValue1;
  // productData.hsn_code = typeof hsnCode === "number" ? hsnCode : null;
  productData.tax = isOn2 ? "yes" : "no";
  const [err, setErr] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      productData.balance_stock = productData.opening_stock;
      productData.primary_unit = primaryUnitValue;
      productData.secondary_unit = secondaryUnitValue;
      formData.append("image", file);
      formData.append("product_name", productData.product_name);
      formData.append("primary_unit", productData.primary_unit);
      formData.append("secondary_unit", productData.secondary_unit);
      formData.append("sale_price", productData.sale_price);
      formData.append("purchase_price", productData.purchase_price);
      formData.append("tax", productData.tax);
      formData.append("opening_stock", productData.opening_stock);
      formData.append("low_stock", productData.low_stock);
      formData.append("balance_stock", productData.balance_stock);
      formData.append("entry_date", productData.entry_date);
      formData.append("hsn_code", productData.hsn_code);
      formData.append("hsn_desc", productData.hsn_desc);
      formData.append("sgst", productData.sgst);
      formData.append("igst", productData.igst);
      formData.append("cess", productData.cess);
      formData.append("conversion", productData.conversion);
      formData.append("cgst", productData.cgst);
      console.log("product_data : " , productData)
      await axios.post("http://localhost:8000/api/auth/addProduct", formData);
      console.log("values : ", productData);
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      productData.product_name !== "" &&
      primaryUnitValue !== null &&
      primaryUnitValue !== "" &&
      productData.sale_price !== null &&
      productData.sale_price !== "" &&
      productData.purchase_price !== null &&
      productData.purchase_price !== "" &&
      productData.opening_stock !== null &&
      productData.opening_stock !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    productData.product_name,
    primaryUnitValue,
    productData.sale_price,
    productData.purchase_price,
    productData.opening_stock,
  ]);

  return (
    <div>
      <div>
        <Box
          sx={{
            width: 400,
          }}
        >
          <h1 className="text_left heading">Add Product</h1>

          <div className="add-product-section-wrapper">
            <div className="section-2">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "97%" },
                }}
                noValidate
                autoComplete="off"
              >
                <Box className="box-sec">
                  <TextField
                    label="Product Name"
                    name="product_name"
                    id="outlined-basic"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    onChange={handleChange}
                    required
                  />
                </Box>

                <div>
                  <div className=" w-full">
                    <input
                      type="file"
                      id="file-1"
                      className="hidden sr-only w-full"
                      accept="image/x-png,image/gif,image/jpeg"
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                        setFileExists(true);
                        const get_file_size = event.target.files[0];
                        if (get_file_size.size > maxFileSize) {
                          setFileSizeExceeded(true);
                          return;
                        } else {
                          setFileSizeExceeded(false);
                        }
                      }}
                    />
                    <label
                      htmlFor="file-1"
                      id="file-1"
                      className="relative flex  items-center justify-center rounded-md text-center border border-dashed border-[#e0e0e0] py-8 px-16"
                    >
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                          Drop Product Image
                        </span>
                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                          Or
                        </span>
                        <span className="img-browse-btn inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                          Browse
                        </span>
                      </div>
                    </label>
                  </div>
                  {fileExists ? (
                    <div class=" rounded-md bg-[#F5F7FB] py-4 px-8">
                      <div class="flex items-center justify-between">
                        <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                          {file.name}
                        </span>
                        <button
                          class="text-[#07074D]"
                          onClick={(e) => {
                            e.preventDefault(), setFile("");
                            setFileExists(false);
                            setFileSizeExceeded(false);
                          }}
                        >
                          <IconX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {fileSizeExceeded && (
                    <>
                      <p className="error">
                        File size exceeded the limit of {maxFileSize / 1000} KB
                      </p>
                    </>
                  )}
                </div>
                <Autocomplete
                  // const filterOptions = createFilterOptions({
                  //   matchFrom: 'start',
                  //   stringify: option => option.title,
                  // })
                  // options={result.map(
                  //   (item) => item.unit_name + "- " + item.unit_code
                  // )}
                  options={result.map((item) => item.unit_code)}
                  id="disable-close-on-select"
                  className="box-sec margin-bottom-zero "
                  onChange={(event, newValue) => {
                    setPrimaryUnitValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      variant="outlined"
                      label="Units"
                      className="w-full my-0 "
                      size="small"
                      name="primary_unit"
                      required
                    />
                  )}
                />

                <Box className="box-sec margin-top-zero margin-bottom-zero">
                  <label className="pl-3">Add Secondary Unit</label>
                  <Switch
                    {...label}
                    color="success"
                    onChange={handleOnChange1}
                  />
                </Box>
                {isOn ? (
                  <Box className="box-sec margin-top-zero">
                    <Autocomplete
                      // options={result.map(
                      //   (item) => item.unit_name + "- " + item.unit_code
                      // )}
                      options={result.map((item) => item.unit_code)}
                      onChange={(event, newValue) => {
                        setSecondaryUnitValue(newValue);
                      }}
                      id="disable-close-on-select"
                      className="w-full sec-1 mt-0 pl-3 pb-3"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-basic"
                          variant="outlined"
                          label="Units"
                          className="w-full"
                          size="small"
                          name="secondary_unit"
                        />
                      )}
                    />
                    <div className="pr-3 pb-3 w-full">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Conversion"
                        className="sec-2 w-full pr-3 pb-3"
                        size="small"
                        name="conversion"
                        required
                        //onChange={handleChange}
                        onChange={(e) =>
                          setProductData({ ...productData, conversion : e.target.value.replace(/\D/g, "") })
                        }
                        value={productData.conversion}
                      />
                    </div>
                  </Box>
                ) : (
                  <span></span>
                )}

                <Box className="box-sec margin-bottom-zero">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Sale Price"
                    name="sale_price"
                    //onChange={handleChange}
                    onChange={(e) =>
                      setProductData({ ...productData, sale_price : e.target.value.replace(/\D/g, "") })
                    }
                    value={productData.sale_price}
                    className="sec-1 w-full"
                    size="small"
                    required
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Purchase Price"
                    className="sec-2 w-full"
                    size="small"
                    name="purchase_price"
                    required
                    //onChange={handleChange}
                    onChange={(e) =>
                      setProductData({ ...productData, purchase_price : e.target.value.replace(/\D/g, "") })
                    }
                    value={productData.purchase_price}
                  />
                </Box>
                <Box className="box-sec margin-top-zero ">
                  <label className="pl-2 ">Tax included</label>
                  <Switch
                    {...label}
                    
                    color="success"
                    onChange={handleOnChange2}
                  />
                </Box>

                <Box className="box-sec">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Opening stock"
                    className="sec-1 w-full"
                    size="small"
                    //onChange={handleChange}
                    onChange={(e) =>
                      setProductData({ ...productData, opening_stock : e.target.value.replace(/\D/g, "") })
                    }
                    value={productData.opening_stock}
                    
                    name="opening_stock"
                    required
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Low stock"
                    className="sec-2 w-full"
                    size="small"
                    //onChange={handleChange}
                    onChange={(e) =>
                      setProductData(e.target.value !== 0 ? { ...productData, low_stock : e.target.value.replace(/\D/g, "") } : {low_stock : 0} )
                    }
                    value={productData.low_stock === 0 ? "" : productData.low_stock}
                    name="low_stock"
                  />
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                        value={todaysDate}
                        format="LL"
                        className="w-full"
                        size="small"
                        maxDate={todaysDate}
                        onChange={(e) => setTransactionDate(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>

                <Box className="box-sec box-sex-1 ">
                  <TextField
                    id="outlined-read-only-input"
                    value={hsnCode}
                    helperText={hsnValue1}
                    className="sec-1 w-full"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    onClick={() => {
                      handleOnChange3();
                    }}
                  />

                  <TextField
                    id="outlined-read-only-input"
                    value={gstValue1}
                    helperText={gstValue2}
                    className="sec-2 w-full"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    onClick={() => {
                      handleOnChange4();
                    }}
                  />
                </Box>

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

                      {result2
                        .filter(
                          (code) =>
                            code.hsn_code.toString().startsWith(searchValue) ||
                            code.hsn_desc.startsWith(searchValue)
                        )
                        .map((filteredItem) => (
                          <div
                            key={filteredItem.hsn_code}
                            className="flex card-sec"
                            onClick={() => {
                              setProductData({
                                ...productData ,
                                igst: filteredItem.igst,
                                cgst: filteredItem.cgst,
                                sgst: filteredItem.sgst,
                                hsn_code:  typeof(filteredItem.hsn_code) === "number" ? filteredItem.hsn_code : null,
                                hsn_desc: filteredItem.hsn_desc,
                              })
                              
                                setHsnCode(filteredItem.hsn_code),
                                setHsnValue1(filteredItem.hsn_desc),
                                setGstValue1(filteredItem.igst),
                                setGstValue2(
                                  "( " +
                                    filteredItem.cgst +
                                    "% CGST + " +
                                    filteredItem.sgst +
                                    "% SGST/UT GST ; " +
                                    filteredItem.igst +
                                    "% IGST )"
                                );
                              setIsClicked(false);
                            }}
                          >
                            <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded">
                              <div className="flex gap-6 pb-4">
                                <h2 className=" rounded bg-slate-300 px-6 py-1 ">
                                  {filteredItem.hsn_code}
                                </h2>
                                <h2 className=" rounded bg-slate-300 px-4 py-1 ">
                                  {filteredItem.igst + "% GST"}
                                </h2>
                              </div>
                              <p>{filteredItem.hsn_desc}</p>
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
                            <div className="flex card-sec" key={index}>
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
                                    console.log("clicked on gst rate");
                                    //setGstOnItem(item.value),
                                    setGstValue1(item.label1),
                                      setGstValue2(
                                        "( " +
                                          item.label1 +
                                          "% CGST + " +
                                          item.label2 +
                                          "% SGST/UT GST ; " +
                                          item.label3 +
                                          "% IGST )"
                                      );
                                    setIsClicked2(false);
                                    setIgst(item.label1)
                                    setProductData({
                                      ...productData,
                                      igst: item.label1,
                                      cgst: item.label2,
                                      sgst: item.label3,
                                    });
                                      
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
                          setcustomGst(e.target.value.replace(/\D/g, ""));
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
                          setCustomeCess(e.target.value.replace(/\D/g, ""));
                        }}
                        // onChange={(e) =>
                        //   setProductData({ ...productData, low_stock : e.target.value.replace(/\D/g, "") })
                        // }
                        // value={productData.low_stock === 0 ? "" : productData.low_stock}
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
            Add Product
          </button>
        ) : (
          <button
            onClick={handleClick}
            disabled={submitDisabled}
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
          >
            Add Product
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
