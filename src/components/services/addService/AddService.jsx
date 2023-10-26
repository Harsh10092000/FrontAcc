import { Box, TextField } from "@mui/material";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import "./addservice.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";

const AddService = (props) => {
  const { changeChange } = useContext(UserContext);
  const units = [
    {
      value: "PCS",
    },
    {
      value: "NOS",
    },
    {
      value: "DAY",
    },
    {
      value: "HRS",
    },
  ];

  // const gst = [
  //   {
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

  const [igst, setIgst] = useState(null);
  const [stategst, setStategst] = useState(null);
  const [cgst, setCgst] = useState(null);
  const [cess, setCess] = useState(null);

  const [productUnits, setProductUnits] = useState([]);
  axios
    .get(`http://localhost:8000/api/auth/fetchProductUnits`)
    .then((response) => {
      setProductUnits(response.data);
    });

  const [productHsnCodes, setProductHsnCodes] = useState([]);
  axios
    .get(`http://localhost:8000/api/auth/fetchProductHsnCodes`)
    .then((response) => {
      setProductHsnCodes(response.data);
    });

  const [isOn2, setIsOn2] = useState(false);

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

  const [gstOnItem, setGstOnItem] = useState("");
  const [gstValue1, setGstValue1] = useState("GST %");
  const [gstValue2, setGstValue2] = useState("");

  const [hsnCode, setHsnCode] = useState("SAC Code");
  const [hsnValue1, setHsnValue1] = useState("");

  const [searchValue, setSearchValue] = useState("0");

  const [customGst, setcustomGst] = useState("");
  const [customeCess, setCustomeCess] = useState("");
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
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({
    ser_name: "",
    ser_unit: "",
    ser_price: "",
    ser_tax_included: 0,
    ser_sac: "",
    ser_sac_desc: "",
    ser_sgst: null,
    ser_igst: null,
    ser_cgst: null,
    ser_cess: null,
  });
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //data.ser_gst = gstValue1;
      console.log("data : ", data);
      await axios.post("http://localhost:8000/api/ser/sendData", data);
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };
  const checkFlag = () => {
    flag
      ? setData({ ...data, ser_tax_included: 0 })
      : setData({ ...data, ser_tax_included: 1 });
    flag ? setFlag(false) : setFlag(true);
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      data.ser_name !== "" &&
      data.ser_unit !== null &&
      data.ser_unit !== "" &&
      data.ser_price !== null &&
      data.ser_price !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.ser_name, data.ser_unit, data.ser_price]);


  return (
    <div>
      <div>
        <Box sx={{ width: 400 }} role="presentation">
          <h1 className="text_left heading font-semibold text-2xl flex justify-between items-center">
            Add Services
          </h1>

          <div className="add-services-section-wrapper">
            <div className="section-2">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "97%" },
                }}
                className="p-6"
              >
                <Box className="box-sec">
                  <TextField
                    label="Service Name"
                    id="outlined-basic"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    name="ser_name"
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Autocomplete
                  options={productUnits.map((item) => item.unit_code)}
                  id="disable-close-on-select"
                  className=" mt-0 w-3/4 sec-2 box-sec margin-bottom-zero "
                  onChange={(event, newValue) => {
                    setData({ ...data, ser_unit: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      variant="outlined"
                      label="Units"
                      className="w-full my-0 "
                      size="small"
                      name="ser_unit"
                      required
                    />
                  )}
                />

                <Box className="box-sec margin-bottom-zero">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Sell Price"
                    className=" w-full"
                    size="small"
                    name="ser_price"
                    //onChange={handleChange}
                    required
                    onChange={(e) =>
                      setData({ ...data, ser_price : e.target.value.replace(/\D/g, "") })
                    }
                    value={data.ser_price}
                  />
                </Box>
                <Box className="box-sec margin-top-zero ">
                  <label className="pl-2 ">Tax included</label>
                  <Switch
                    {...label}
                    color="success"
                    name="ser_tax_included"
                    onClick={checkFlag}
                  />
                </Box>

                <Box className="box-sec box-sex-1 flex gap-2">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={hsnCode}
                    helperText={hsnValue1}
                    className="sec-1 cursor-pointer"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    onClick={() => {
                      handleOnChange3();
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={gstValue1}
                    helperText={gstValue2}
                    className="sec-2 cursor-pointer"
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
                        className=" my-0 "
                        placeholder="SAC Code or Services Name "
                        size="small"
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                      />

                      {productHsnCodes
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
                              setData({
                                ...data,
                                ser_sac: filteredItem.hsn_code,
                                ser_sac_desc: filteredItem.hsn_desc,
                                ser_igst: filteredItem.igst,
                                ser_cgst: filteredItem.cgst,
                                ser_sgst: filteredItem.sgst,
                              });
                              setSearchValue("0");

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
                    <div></div>
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

                                    setData({
                                      ...data,
                                      ser_igst: item.label1,
                                      ser_cgst: item.label2,
                                      ser_sgst: item.label3,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Box>
                    <Box className="box-sec">
                      <div>Custom Tax %</div>
                      <TextField
                        label="GST"
                        id="outlined-basic"
                        variant="outlined"
                        className="sec-1"
                        required
                        onChange={(e) => {
                          setcustomGst(e.target.value);
                        }}
                      />
                      <TextField
                        label="CESS"
                        id="outlined-basic"
                        variant="outlined"
                        className="sec-2"
                        required
                        onChange={(e) => {
                          setCustomeCess(e.target.value);
                        }}
                      />
                    </Box>

                    <Box className="box-sec">
                      <button
                        onClick={(e) => {
                          e.preventDefault(),
                            setData({
                              ...data,
                              ser_igst: customGst,
                              ser_cgst: customGst / 2,
                              ser_sgst: customGst / 2,
                              ser_cess: customeCess,
                            });
                          setIsClicked2(false);
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
            Add Services
          </button>
        ) : (
          <button
            onClick={handleClick}
            disabled={submitDisabled}
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
          >
            Add Services
          </button>
        )}
      </div>
    </div>
  );
};

export default AddService;
