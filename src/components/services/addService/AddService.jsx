import { Box, TextField } from "@mui/material";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import "./addservice.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";

const AddService = (props) => {
  const { changeChange, accountId } = useContext(UserContext);
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

  const [productUnits, setProductUnits] = useState([]);
  const [sacCodes, setSacCodes] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductUnits`)
      .then((response) => {
        setProductUnits(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchSacCodes`)
      .then((response) => {
        setSacCodes(response.data);
      });
  }, []);

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

  const [searchValue, setSearchValue] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({
    ser_name: "",
    ser_unit: "",
    ser_price: "",
    ser_tax_included: 0,
    ser_sac: "",
    ser_ser_sac_desc: "",
    ser_sgst: "",
    ser_igst: "",
    ser_cgst: "",
    ser_cess: "",
    ser_acc_id: "",
  });

  data.ser_acc_id = accountId;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("data : ", data);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/ser/sendData",
        data
      );
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
      data.ser_price > 0
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.ser_name, data.ser_unit, data.ser_price]);

  const gst_details =
    "(" +
    data.ser_igst / 2 +
    "% CGST + " +
    data.ser_igst / 2 +
    "% SGST/UT GST ; " +
    data.ser_igst +
    "% IGST ); ";

  const custom_gst_details =
    "(" +
    data.ser_igst / 2 +
    "% CGST + " +
    data.ser_igst / 2 +
    "% SGST/UT GST ; " +
    data.ser_igst +
    "% IGST ; " +
    data.ser_cess +
    "% CESS )";


  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;

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
                    inputProps={{ maxLength: 20 }}
                    value={data.ser_name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ser_name: e.target.value.replace(/[^A-Z a-z.]/g, ""),
                      })
                    }
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
                    required
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ser_price: e.target.value.replace(
                          numberValidation,
                          "$1"
                        ),
                      })
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

                <Box className="box-sec box-sec-1 flex gap-2">
                  <div className=" mt-3">
                    <div className="flex">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={data.ser_sac ? data.ser_sac : "SAC Code"}
                        helperText={data.ser_sac_desc ? data.ser_sac_desc : ""}
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
                        value={data.ser_igst ? data.ser_igst + "%" : "GST %"}
                        helperText={
                          data.ser_cess !== ""
                            ? custom_gst_details
                            : data.ser_igst !== ""
                            ? gst_details
                            : ""
                        }
                        className="sec-2 cursor-pointer"
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        onClick={() => {
                          handleOnChange4();
                        }}
                      />
                    </div>
                    <div className="mb-3 mt-4">
                      {isClicked && (
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
                      )}
                    </div>
                  </div>
                </Box>
                <>
                  {isClicked ? (
                    <>
                      {searchValue !== null &&
                        (searchValue !== "") === true &&
                        sacCodes
                          .filter(
                            (code) =>
                              code.sac_code
                                .toString()
                                .startsWith(searchValue) ||
                              code.sac_desc
                                .toString()
                                .toLowerCase()
                                .startsWith(
                                  searchValue.toString().toLowerCase()
                                )
                          )
                          .map((filteredItem) => (
                            <div
                              key={filteredItem.id}
                              className="flex card-sec"
                              onClick={() => {
                                setData({
                                  ...data,
                                  ser_sac: filteredItem.sac_code,
                                  ser_sac_desc: filteredItem.sac_desc,
                                  ser_igst: filteredItem.sac_igst,
                                  ser_cgst: filteredItem.sac_igst / 2,
                                  ser_sgst: filteredItem.sac_igst / 2,
                                });
                                setSearchValue("");
                                setIsClicked(false);
                              }}
                            >
                              <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded">
                                <div className="flex gap-6 pb-4">
                                  <h2 className=" rounded bg-slate-300 px-6 py-1 ">
                                    {filteredItem.sac_code}
                                  </h2>
                                  <h2 className=" rounded bg-slate-300 px-4 py-1 ">
                                    {filteredItem.sac_igst + "% GST"}
                                  </h2>
                                </div>
                                <p>{filteredItem.sac_desc}</p>
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
                    <div>Custom Tax %</div>
                    <Box className="box-sec">
                      
                      <TextField
                        label="GST"
                        id="outlined-basic"
                        variant="outlined"
                        className="sec-1 w-full"
                        required
                        inputProps={{ maxLength: 10 }}
                        value={data.ser_igst}
                        onChange={(e) => {
                          setData({
                            ...data,
                            ser_igst: e.target.value.replace(
                              numberValidation,
                              "$1"
                            ),
                            ser_cgst:
                              e.target.value.replace(numberValidation, "$1") /
                              2,
                            ser_sgst:
                              e.target.value.replace(numberValidation, "$1") /
                              2,
                          });
                        }}
                      />

                      <TextField
                        label="CESS"
                        id="outlined-basic"
                        variant="outlined"
                        className="sec-2 w-full"
                        required
                        inputProps={{ maxLength: 10 }}
                        value={data.ser_cess}
                        onChange={(e) => {
                          setData({
                            ...data,
                            ser_cess: e.target.value.replace(
                              numberValidation,
                              "$1"
                            ),
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
