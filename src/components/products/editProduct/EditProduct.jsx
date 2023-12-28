import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconX, IconTrash, IconAlertOctagonFilled } from "@tabler/icons-react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  DatePicker,
  LocalizationProvider,
  yearCalendarClasses,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./editproduct.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const EditProduct = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isOn2, setIsOn2] = useState(false);

  const [isOn, setIsOn] = useState(false);
  const handleOnChange1 = () => {
    setIsOn(!isOn);
    console.log("isOn : ", isOn);
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

  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);

  useEffect(() => {
    axios
    .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductUnits`)
    .then((response) => {
      setResult(response.data);
    });

  ;
  axios
    .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductHsnCodes`)
    .then((response) => {
      setResult2(response.data);
    });
  }, [])
  

  const { pId, change, changeChange, changeProduct } = useContext(UserContext);
  const [data, setData] = useState({
    product_name: "",
    primary_unit: null,
    secondary_unit: "",
    sale_price: null,
    purchase_price: null,
    tax: "",
    opening_stock: 0,
    low_stock: 0,
    balance_stock: 0,
    entry_date: "",
    hsn_code: null,
    hsn_desc: "",
    sgst: null,
    igst: null,
    cess: null,
    conversion: null,
    cgst: null,
  });
  const [isTaxIncluded, setIsTaxIncluded] = useState("0");
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductTran/${pId}`)
      .then((response) => {
        setIsTaxIncluded(response.data[0].tax);
        setData({
          ...data,
          product_name: response.data[0].product_name,
          primary_unit: response.data[0].primary_unit,
          secondary_unit: response.data[0].secondary_unit,
          sale_price: response.data[0].sale_price,
          purchase_price: response.data[0].purchase_price,
          tax: response.data[0].tax,
          opening_stock: response.data[0].opening_stock,
          low_stock: response.data[0].low_stock,
          balance_stock: response.data[0].balance_stock,
          entry_date: response.data[0].entry_date,
          hsn_code:
            response.data[0].hsn_code !== null
              ? response.data[0].hsn_code
              : "HSN Code",
          hsn_desc: response.data[0].hsn_desc,
          sgst: response.data[0].sgst,
          igst: response.data[0].igst,
          cess: response.data[0].cess,
          conversion: response.data[0].conversion,
          cgst: response.data[0].cgst,
        });
        setIsOn(response.data[0].secondary_unit !== "" ? true : false);
        setIsOn2(response.data[0].tax === "1" ? true : false);
      });
  }, [change, pId]);

  const handleOnChange2 = () => {
    setIsOn2(isOn2 === true ? false : true);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/auth/delproduct/${pId}`
      );
      changeChange();
      props.snackd();
      changeProduct(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [primaryUnitValue, setPrimaryUnitValue] = useState(data.primary_unit);
  const [secondaryUnitValue, setSecondaryUnitValue] = useState(
    data.secondary_unit
  );

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);

  if (flag === true) {
    data.entry_date = filteredDate;
  }
  if (flag1 === true) {
    data.primary_unit = primaryUnitValue;
  }
  if (flag2 === true) {
    data.secondary_unit = secondaryUnitValue;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      data.tax = isOn2 ? 1 : 0;
      console.log("data.tax : ", data.tax);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("product_name", data.product_name);
      formData.append("primary_unit", data.primary_unit);
      formData.append("secondary_unit", data.secondary_unit);
      formData.append("sale_price", data.sale_price);
      formData.append("purchase_price", data.purchase_price);
      formData.append("tax", data.tax);
      formData.append("low_stock", data.low_stock);
      formData.append("balance_stock", data.balance_stock);
      formData.append("entry_date", data.entry_date);
      formData.append("hsn_code", data.hsn_code);
      formData.append("hsn_desc", data.hsn_desc);
      formData.append("sgst", data.sgst);
      formData.append("igst", data.igst);
      formData.append("cess", data.cess);
      formData.append("conversion", data.conversion);
      formData.append("cgst", data.cgst);
      axios.put(
        import.meta.env.VITE_BACKEND + `/api/auth/updateProduct/${pId}`,
        formData
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [searchValue, setSearchValue] = useState("0");

  const [customGst, setcustomGst] = useState("");
  const [customeCess, setCustomeCess] = useState("");

  const [fileSizeExceeded, setFileSizeExceeded] = React.useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("File Name");
  const [fileExists, setFileExists] = useState(false);

  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    if (
      data.product_name !== "" &&
      data.sale_price !== "" &&
      data.sale_price > 0 &&
      data.purchase_price !== null &&
      data.purchase_price > 0 &&
      data.low_stock < data.opening_stock &&
      error === null
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.product_name, data.sale_price, data.purchase_price, data.low_stock , error]);

  return (
    <div>
      <div>
        <Box
          sx={{
            width: 400,
          }}
        >
          <h1 className="text_left heading">Edit Product</h1>

          <div className="add-product-edit-section-wrapper">
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
                    id="outlined-basic"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    required
                    name="product_name"
                    value={data.product_name}
                    inputProps={{ maxLength: 20 }}
                    onChange={(e) =>
                      setData({
                        ...data,
                        product_name: e.target.value.replace(
                          /[^A-Z a-z.]/g,
                          ""
                        ),
                      })
                    }
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
                        console.log(get_file_size);
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
                  options={result.map((item) => item.unit_code)}
                  id="disable-close-on-select"
                  className="box-sec margin-bottom-zero "
                  value={data.primary_unit}
                  onChange={(event, newValue) => {
                    setPrimaryUnitValue(newValue);
                    setFlag1(true);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      variant="outlined"
                      label="Units"
                      className="w-full my-0 "
                      size="small"
                    />
                  )}
                />

                {isOn ? (
                  <Box className="box-sec margin-top-zero margin-bottom-zero">
                    
                    <label className="pl-3">Add Secondary Unit</label>
                    <Switch
                      {...label}
                      defaultChecked
                      color="success"
                      onChange={handleOnChange1}
                    />
                  </Box>
                ) : (
                  <Box className="box-sec margin-top-zero margin-bottom-zero">
                    <label className="pl-3">Add Secondary Unit</label>
                    <Switch
                      {...label}
                      color="success"
                      onChange={handleOnChange1}
                    />
                  </Box>
                )}

                {isOn ? (
                  <Box className="box-sec margin-top-zero">
                    <Autocomplete
                      options={result.map((item) => item.unit_code)}
                      value={data.secondary_unit}
                      id="disable-close-on-select"
                      className="w-full sec-1 mt-0 pl-3 pb-3"
                      onChange={(event, newValue) => {
                        setSecondaryUnitValue(newValue);
                        setFlag2(true);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-basic"
                          variant="outlined"
                          label="Units"
                          className="w-full"
                          size="small"
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
                        value={data.conversion}
                        inputProps={{ maxLength: 10}}
                        onChange={(e) =>
                          setData({
                            ...data,
                            conversion: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                          })
                        }
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
                    className="sec-1 w-full"
                    size="small"
                    onChange={(e) =>
                      setData({
                        ...data,
                        sale_price: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                      })
                    }
                    inputProps={{ maxLength: 10}}
                    value={data.sale_price}
                    name="sale_price"
                    
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Purchase Price"
                    className="sec-2 w-full"
                    size="small"
                    
                    name="purchase_price"
                    value={data.purchase_price}
                    inputProps={{ maxLength: 10}}
                    onChange={(e) =>
                      setData({
                        ...data,
                        purchase_price: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                      })
                    }
                  />
                </Box>

                {isTaxIncluded === "1" ? (
                  <Box className="box-sec margin-top-zero ">
                    {""}
                    <label className="pl-2">Tax included</label>

                    <Switch
                      {...label}
                      defaultChecked
                      color="success"
                      onChange={handleOnChange2}
                    />
                  </Box>
                ) : (
                  <Box className="box-sec margin-top-zero ">
                    <label className="pl-2">Tax included</label>
                    <Switch
                      {...label}
                      color="success"
                      onChange={handleOnChange2}
                    />
                  </Box>
                )}

                <Box className="box-sec">
                  <TextField
                    disabled
                    id="outlined-basic"
                    variant="outlined"
                    label="Opening stock"
                    className="sec-1 w-full"
                    size="small"
                   
                    name="opening_stock"
                    value={data.opening_stock}
                    onChange={(e) =>
                      setData({
                        ...data,
                        opening_stock: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    inputProps={{ maxLength: 5}}
                    
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Low stock"
                    className="sec-2 w-full"
                    size="small"
                    onChange={(e) =>
                      setData({
                        ...data,
                        low_stock: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    inputProps={{ maxLength: 5}}
                    name="low_stock"
                    value={data.low_stock}
                  />
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                        value={dayjs(data.entry_date)}
                        format="LL"
                        className="w-full"
                        size="small"
                        maxDate={todaysDate}
                        onChange={(newValue) => {
                          setTransactionDate(newValue), setFlag(true);
                        }}
                        onError={(newError) => {
                          setSubmitDisabled(true), setError(newError);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>

                <Box className="box-sec box-sex-1 ">
                  <TextField
                    id="outlined-read-only-input"
                    value={
                      data.hsn_code !== null && data.hsn_code !== ""
                        ? data.hsn_code
                        : "HSN Code"
                    }
                    helperText={data.hsn_desc}
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
                    value={data.igst !== null ? data.igst + " GST %" : "GST %"}
                    helperText={
                      data.igst !== null && data.cess !== ""
                        ? data.cess !== null && data.cess !== ""
                          ? "(" +
                            data.cgst +
                            "% CGST + " +
                            data.sgst +
                            "% SGST/UT GST ; " +
                            data.igst +
                            "% IGST ; " +
                            data.cess +
                            "% CESS )"
                          : "(" +
                            data.cgst +
                            "% CGST + " +
                            data.sgst +
                            "% SGST/UT GST ; " +
                            data.igst +
                            "% IGST ; )"
                        : ""
                    }
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

                      {searchValue !== null && (searchValue !== "") === true &&
                      result2
                        .filter(
                          (code) =>
                            code.hsn_code.toString().startsWith(searchValue) ||
                            code.hsn_desc.toString()
                            .toLowerCase().startsWith(searchValue.toString().toLowerCase())
                        )
                        .map((filteredItem) => (
                          <div
                            className="flex card-sec"
                            onClick={() => {
                              console.log(filteredItem.hsn_code);

                              setIsClicked(false);
                              setSearchValue("0");
                              //setCustomeCess(0);
                              setData({
                                ...data,
                                igst: filteredItem.igst,
                                cgst: filteredItem.cgst,
                                sgst: filteredItem.sgst,
                                hsn_code: filteredItem.hsn_code,
                                hsn_desc: filteredItem.hsn_desc,
                              });
                            }}
                          >
                            <div className="gst-card-text">
                              <div className="flex gap-6 pb-4">
                                <h2 className=" rounded bg-slate-300 px-6 py-1 ">
                                  {filteredItem.hsn_code}
                                </h2>
                                <h2 className=" rounded bg-slate-300 px-4 py-1 ">
                                  {filteredItem.igst + " GST %"}
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
                                    "% CGST" +
                                    item.label3 +
                                    "% SGST/UT GST ;" +
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
                                    setIsClicked2(false);
                                    //setCustomeCess(0);
                                    setData({
                                      ...data,
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
                        
                        inputProps={{maxLength: 10}}
                        value= {data.igst}
                        onChange={(e) => {
                          setData({
                            ...data,
                            igst: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                            cgst: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1") / 2,
                            sgst: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1") / 2,
                           
                          });
                        }}
                      />
                      <TextField
                        label="CESS"
                        id="outlined-basic"
                        variant="outlined"
                        className="sec-2 w-full"
                        size="small"
                        required
                        
                        inputProps={{maxLength: 10}}
                        value={data.cess}
                        onChange={(e) => {
                          setData({
                            ...data,
                            cess: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1")
                          });
                        }}
                      />
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
      <div className="add-product-edit-btn-wrapper flex gap-3">
        <button
          className="delete-btn text-red-600 flex gap-1 justify-center"
          type="submit"
          onClick={handleClickOpen}
        >
          <IconTrash />
          Delete
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="flex">
            <div className="pt-5 pl-3">
              <IconAlertOctagonFilled size={60} className="text-red-600" />
            </div>
            <div>
              <DialogTitle id="alert-dialog-title">Are You Sure ?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You are about to delete this Product This action cannot be
                  undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions className="flex gap-4">
                <button className="pb-3" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="delete-btn text-red-600 pb-3 pr-3"
                  onClick={deleteProduct}
                  autoFocus
                >
                  Delete Product
                </button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in cursor-not-allowed"
          >
            Update
          </button>
        ) : (
          <button
            disabled={submitDisabled}
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleSubmit}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
