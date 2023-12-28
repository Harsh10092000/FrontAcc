import { Box, TextField } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import { IconTrash, IconAlertOctagonFilled } from "@tabler/icons-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./editservice.scss";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useEffect } from "react";
const EditService = (props) => {
  const { serId, changeChange, changeService } = useContext(UserContext);
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
  const [productHsnCodes, setProductHsnCodes] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductUnits`)
      .then((response) => {
        setProductUnits(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductHsnCodes`)
      .then((response) => {
        setProductHsnCodes(response.data);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    //console.log("isClicked : ", isClicked);
  };

  const handleOnChange4 = () => {
    setIsClicked2(!isClicked2);
    setIsClicked(false);
  };

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
  const [info, setInfo] = useState({
    ser_unit: "",
    ser_name: "",
    ser_price: 0,
    ser_sac: 0,
    ser_tax_included: 0,
    ser_sac_desc: "",
    ser_sgst: "",
    ser_igst: null,
    ser_cess: null,
    ser_cgst: null,
  });

  const delData = async () => {
    try {
      axios.delete(import.meta.env.VITE_BACKEND + `/api/ser/delData/${serId}`);
      changeService(0);
      changeChange();
      props.snackd();
    } catch (err) {
      console.log(err);
    }
  };
  const [isTaxIncluded, setIsTaxIncluded] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchDataid/${serId}`)
      .then((res) => {
        setIsTaxIncluded(res.data[0].ser_tax_included);
        setInfo({
          ...info,
          ser_unit: res.data[0].ser_unit,
          ser_name: res.data[0].ser_name,
          ser_price: res.data[0].ser_price,
          ser_tax_included: res.data[0].ser_tax_included,
          ser_sac:
            res.data[0].ser_sac !== null ? res.data[0].ser_sac : "SAC Code",
          ser_sac_desc: res.data[0].ser_sac_desc,
          ser_sgst: res.data[0].ser_sgst,
          ser_igst: res.data[0].ser_igst,
          ser_cess: res.data[0].ser_cess,
          ser_cgst: res.data[0].ser_cgst,
        });
        setFlag(res.data[0].ser_tax_included === 1 ? true : false);
      });
  }, [serId]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ser/updateData/${serId}`,
        info
      );
      changeChange();
      props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const checkFlag = () => {
    flag
      ? setInfo({ ...info, ser_tax_included: 0 })
      : setInfo({ ...info, ser_tax_included: 1 });
    flag ? setFlag(false) : setFlag(true);
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      info.ser_name !== "" &&
      info.ser_unit !== null &&
      info.ser_unit !== "" &&
      info.ser_price !== null &&
      info.ser_price !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [info.ser_name, info.ser_unit, info.ser_price]);

  return (
    <div>
      <div>
        <Box sx={{ width: 400 }} role="presentation">
          <h1 className="text_left heading font-semibold text-2xl flex justify-between items-center">
            Edit Services
          </h1>

          <div className="add-services-edit-section-wrapper">
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
                    label="Service Name"
                    id="outlined-basic"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    value={info.ser_name}
                    onChange={(e) =>
                      setInfo({ ...info, ser_name: e.target.value })
                    }
                    required
                  />
                </Box>
                <Autocomplete
                  options={units.map((item) => item.value)}
                  id="disable-close-on-select"
                  value={info.ser_unit}
                  className=" mt-0 w-3/4 sec-2 box-sec margin-bottom-zero "
                  onChange={(event, newValue) => {
                    setInfo({ ...info, ser_unit: newValue });
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

                <Box className="box-sec margin-bottom-zero">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Sell Price"
                    className=" w-full"
                    size="small"
                    value={info.ser_price}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        ser_price: e.target.value.replace(/\D/g, ""),
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
                      onChange={checkFlag}
                    />
                  </Box>
                ) : (
                  <Box className="box-sec margin-top-zero ">
                    <label className="pl-2">Tax included</label>
                    <Switch {...label} color="success" onChange={checkFlag} />
                  </Box>
                )}

                <Box className="box-sec box-sex-1">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={info.ser_sac}
                    helperText={info.ser_sac_desc}
                    className="sec-1"
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
                    value={
                      info.ser_igst !== null
                        ? info.ser_igst + " GST %"
                        : "GST %"
                    }
                    helperText={
                      info.ser_igst !== null
                        ? info.ser_cess !== null
                          ? "(" +
                            info.ser_cgst +
                            "% CGST + " +
                            info.ser_sgst +
                            "% SGST/UT GST ; " +
                            info.ser_igst +
                            "% IGST ; " +
                            info.ser_cess +
                            "% CESS )"
                          : "(" +
                            info.ser_cgst +
                            "% CGST + " +
                            info.ser_sgst +
                            "% SGST/UT GST ; " +
                            info.ser_igst +
                            "% IGST ; )"
                        : ""
                    }
                    className="sec-2"
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
                            className="flex card-sec"
                            onClick={() => {
                              console.log(filteredItem.hsn_code);
                              setInfo({
                                ...info,
                                ser_sac: filteredItem.hsn_code,
                                ser_sac_desc: filteredItem.hsn_desc,
                                ser_igst: filteredItem.igst,
                                ser_cgst: filteredItem.cgst,
                                ser_sgst: filteredItem.sgst,
                              }),
                                setIsClicked(false);
                              setSearchValue("0");
                            }}
                          >
                            <div className="gst-card-text">
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
                      {/* <div className="gst-section">
                          {gst.map((item, index) => (
                            <div className="flex card-sec" key={index}>
                              <div className="gst-card-text">
                                <h2 className=" font-medium">{item.label1}</h2>
                                <p>{item.label2}</p>
                              </div>
                              <div className="customer-info-icon-wrapper">
                                <input
                                  type="radio"
                                  id="gst_on_selected_item"
                                  name="gst"
                                  //value={item.value}
                                  onChange={() => {
                                    setGstOnItem(item.value),
                                      setGstValue1(item.label1),
                                      setGstValue2(item.label2);
                                    setIsClicked2(false);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div> */}
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
                                    setCustomeCess(0);
                                    setInfo({
                                      ...info,
                                      // igst: item.label1,
                                      // cgst: item.label2,
                                      // sgst: item.label3,
                                      ser_igst: filteredItem.label1,
                                      ser_cgst: filteredItem.label2,
                                      ser_sgst: filteredItem.label3,
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
                        className="sec-1"
                        size="small"
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
                        size="small"
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
                            setInfo({
                              ...info,
                              ser_igst: customGst,
                              ser_cgst: customGst / 2,
                              ser_sgst: customGst / 2,
                              ser_cess: customeCess,
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
      <div className="add-services-edit-btn-wrapper flex gap-3">
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
                  You are about to delete this service This action cannot be
                  undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions className="flex gap-4">
                <button className="pb-3" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="delete-btn text-red-600 pb-3 pr-3"
                  onClick={delData}
                  autoFocus
                >
                  Delete Service
                </button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            Update Services
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={updateData}
          >
            Update Services
          </button>
        )}
      </div>
    </div>
  );
};

export default EditService;
