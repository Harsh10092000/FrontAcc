import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../../components/navbar/Navbar";
import "./account.scss";
import { IconAlertOctagonFilled, IconX } from "@tabler/icons-react";
import axios from "axios";
import { UserContext } from "../../context/UserIdContext";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddAccount() {
  const {
    changeChange,
    change,
    accountId,
    changeAccountId,
    changeUser,
    changeParties,
    changeInventory,
    changeBills,
    parties,
    uId,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const [fileSizeExceeded1, setFileSizeExceeded1] = useState(false);
  const maxFileSize1 = 2000000;
  const maxFileSize2 = 100000;
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");

  // const onChange = (e) => {
  //   setFile(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  //   console.log(file);
  //   console.log(filename);
  // };

  const [data, setData] = useState({
    business_name: "",
    business_address: "",
    business_gst: "",
    business_type: "",
    business_nature: "",
    business_bank_name: "",
    business_payee_name: "",
    business_acc_no: "",
    business_ifsc_code: "",
    user_id: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  data.user_id = uId;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("business", file);
      formData.append("signature", file1);
      formData.append("business_name", data.business_name);
      formData.append("business_address", data.business_address);
      formData.append("business_gst", data.business_gst);
      formData.append("business_type", data.business_type);
      formData.append("business_nature", data.business_nature);
      formData.append("business_bank_name", data.business_bank_name);
      formData.append("business_payee_name", data.business_payee_name);
      formData.append("business_acc_no", data.business_acc_no);
      formData.append("business_ifsc_code", data.business_ifsc_code);
      formData.append("user_id", data.user_id);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND + "/api/act/sendData",
        formData
      );

      changeAccountId(res.data);
      changeChange();

      navigate("/settings/account");
    } catch (err) {
      console.log(err);
    }
  };

  //const uId = 5;
  // const [info, setInfo] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(import.meta.env.VITE_BACKEND + `/api/act/fetchStaffData/${uId}`)
  //     .then((res) => {
  //       setStaffData(res.data);
  //     });
  // }, [uId]);

  // useEffect(() => {
  //   if (staffData.length > 0) {
  //     console.log(staffData , staffData[0].staff_acc_id);
  //     changeParties(staffData[0].staff_parties);
  //     changeInventory(staffData[0].staff_inventory);
  //     changeBills(staffData[0].staff_bills);

  //   axios
  //     .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${staffData[0].staff_acc_id}`)
  //     .then((res) => {
  //       setInfo(res.data);
  //       changeAccountId(res.data[0].business_id);
  //     });
  //   } else {
  //     axios
  //     .get(import.meta.env.VITE_BACKEND + `/api/act/fetch/${uId}`)
  //     .then((res) => {
  //       setInfo(res.data);
  //       changeAccountId(res.data[0].business_id);
  //     });
  //   }
  // }, [staffData]);

  const deleteAc = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/act/delData/${parseInt(accountId)}`
      );
      changeChange();
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeId = (id) => {
    changeAccountId(id);
    changeUser(0);
  };

  const [formatError, setFormatError] = useState(false);
  const [formatError1, setFormatError1] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      data.business_acc_no === "" &&
      data.business_bank_name === "" &&
      data.business_ifsc_code === "" &&
      data.business_payee_name === "" &&
      data.business_name !== "" &&
      data.business_address !== "" &&
      (data.business_gst === "" ||
        data.business_gst.length > 14 ||
        data.business_gst.length === 0)
    ) {
      setSubmitDisabled(false);
    } else if (
      data.business_acc_no.length > 9 &&
      data.business_bank_name !== "" &&
      data.business_ifsc_code.length > 10 &&
      data.business_payee_name !== "" &&
      data.business_name !== "" &&
      data.business_address !== "" &&
      (data.business_gst === "" ||
        data.business_gst.length > 14 ||
        data.business_gst.length === 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    data.business_acc_no,
    data.business_bank_name,
    data.business_ifsc_code,
    data.business_payee_name,
    data.business_name,
    data.business_address,
    data.business_gst,
  ]);

  const handleImage = (event) => {
    setFile(event[0]);
    var pattern = /image-*/;
    if (!event[0].type.match(pattern)) {
      setFormatError(true);
      setFileSizeExceeded(false);
    } else if (event[0].size > maxFileSize) {
      setFileSizeExceeded(true);
      setFormatError(false);
      return;
    } else {
      setFileSizeExceeded(false);
      setFormatError(false);
    }
  };

  const handleImage1 = (event) => {
    setFile1(event[0]);
    var pattern = /image-*/;
    if (!event[0].type.match(pattern)) {
      setFormatError1(true);
      setFileSizeExceeded1(false);
    } else if (event[0].size > maxFileSize) {
      setFileSizeExceeded1(true);
      setFormatError1(false);
      return;
    } else {
      setFileSizeExceeded1(false);
      setFormatError1(false);
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files);
    }
  };

  const handleDrop1 = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImage1(e.dataTransfer.files);
    }
  };

  const errors = {
    gstError: "error",
    bankAccName: "error",
    bankAccNo: "error",
    bankAccIfsc: "error",
    bankAccPayeeName: "error",
  };

  const [bankDetails, setBankDetails] = useState(false);

  useEffect(() => {
    if (
      (data.business_acc_no.length > 0 && data.business_acc_no.length < 15) ||
      data.business_bank_name.length > 0 ||
      (data.business_ifsc_code.length > 0 &&
        data.business_ifsc_code.length < 10) ||
      data.business_payee_name.length > 0
    ) {
      setBankDetails(true);
    } else if (
      data.business_acc_no.length > 16 &&
      data.business_bank_name.length > 0 &&
      data.business_ifsc_code.length > 10 &&
      data.business_payee_name.length > 0
    ) {
      setBankDetails(false);
    }
  }, [
    data.business_bank_name,
    data.business_acc_no,
    data.business_ifsc_code,
    data.business_payee_name,
  ]);

  return (
    <div className="b-form ">
      <Navbar />
      <div className="business_acc_section-wrapper">
        <div className="section-1">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <h1 className="text-3xl text-center mb-5 text-sky-700">
              Create Business Account
            </h1>
            <Box className="box-sec">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="Business Name"
                className="w-full"
                name="business_name"
                inputProps={{ maxLength: 40 }}
                value={data.business_name}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_name: e.target.value.replace(/[^A-Z a-z .]/g, ""),
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="Address"
                className="w-full"
                name="business_address"
                inputProps={{ maxLength: 80 }}
                value={data.business_address}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_address: e.target.value.replace(
                      /[^0-9A-Z a-z , . /]/g,
                      ""
                    ),
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="GST Number"
                name="business_gst"
                inputProps={{ maxLength: 15 }}
                value={data.business_gst}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_gst: e.target.value.replace(/[^0-9A-Za-z]/g, ""),
                    //business_gst : e.target.value.replace(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/ , "")
                  })
                }
                className="w-full"
                helperText={
                  data.business_gst.length < 15 &&
                  data.business_gst.length !== 0
                    ? errors.gstError
                    : ""
                }
              />
            </Box>

            <Box className="flex w-full gap-2">
              <select
                name="business_type"
                value={data.business_type}
                className="w-full h-[40px] bg-transparent border border-slate-400 p-2 rounded text-slate-600 text-md"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your type
                </option>
                <option value="proprietor">Proprietor</option>
                <option value="limited_Liability_Partnership">
                  Limited Liability Partnership
                </option>
                <option value="partnership">Partnership</option>
                <option value="private_limited">Private Limited</option>
                <option value="other">Other</option>
              </select>

              <select
                name="business_nature"
                value={data.business_nature}
                className="w-full h-[40px] bg-transparent border border-slate-400 p-2 rounded text-slate-600 text-md"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your nature
                </option>
                <option value="retailer">Retailer</option>
                <option value="distributor">Distributor</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="service_Provider">Service_Provider</option>
                <option value="wholesaler">Wholesaler</option>
                <option value="other">Other nature</option>
              </select>
            </Box>

            <Box className="flex w-full gap-2">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="Bank Account Name"
                className="w-full"
                name="business_bank_name"
                inputProps={{ maxLength: 40 }}
                value={data.business_bank_name}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_bank_name: e.target.value.replace(
                      /[^A-Z a-z]/g,
                      ""
                    ),
                  })
                }
                helperText={
                  data.business_bank_name.length < 1 && bankDetails === true
                    ? errors.gstError
                    : ""
                }
              />

              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="Payee Name"
                className="w-full"
                name="business_payee_name"
                inputProps={{ maxLength: 20 }}
                value={data.business_payee_name}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_payee_name: e.target.value.replace(
                      /[^A-Z a-z]/g,
                      ""
                    ),
                  })
                }
                helperText={
                  data.business_payee_name.length < 1 && bankDetails === true
                    ? errors.gstError
                    : ""
                }
              />
            </Box>

            <Box className="flex w-full gap-2">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="Account Number"
                className="w-full"
                name="business_acc_no"
                inputProps={{ maxLength: 16 }}
                value={data.business_acc_no}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_acc_no: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                helperText={
                  data.business_acc_no.length < 16 && bankDetails === true
                    ? errors.gstError
                    : ""
                }
              />

              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                label="IFSC Code"
                className="w-full"
                name="business_ifsc_code"
                inputProps={{ maxLength: 11 }}
                value={data.business_ifsc_code}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_ifsc_code: e.target.value.replace(
                      /[^0-9A-Za-z]/g,
                      ""
                    ),
                  })
                }
                helperText={
                  data.business_ifsc_code.length < 11 && bankDetails === true
                    ? errors.gstError
                    : ""
                }
              />
            </Box>

            <div className="upload-img-sec">
              <input
                type="file"
                id="file-1"
                className="hidden sr-only"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(event) => {
                  handleImage1(event.target.files);
                }}
              />
              <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop1}
                htmlFor="file-1"
                id="file-1"
                className="relative flex min-h-[5px] "
              >
                <div
                  className="img-browse-btn inline-flex rounded border border-white
                 py-2 px-7 text-base font-medium text-sky-800 cursor-pointer"
                >
                  Browse
                </div>
                <div className="   py-2 px-7 block w-full border border-[#e0e0e0]">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-sky-800 ">
                      {file1 !== "" && file1 !== undefined
                        ? file1.name
                        : "Your Logo"}
                    </span>
                    <button
                      className="text-sky-800"
                      onClick={(e) => {
                        e.preventDefault(), setFile1("");
                        setFileSizeExceeded1(false);
                        setFormatError1(false);
                      }}
                    >
                      <IconX className="static h-4 w-4" />
                    </button>
                  </div>
                </div>
              </label>
              {fileSizeExceeded && (
                <p className="error">
                  File size exceeded the limit of {maxFileSize1 / 1000000} MB
                </p>
              )}
              {formatError1 && <p className="error">Invalid Format</p>}
            </div>
            <div className="upload-img-sec">
              <input
                type="file"
                id="file-2"
                className="hidden sr-only"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(event) => {
                  handleImage(event.target.files);
                }}
              />
              <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                htmlFor="file-2"
                id="file-2"
                className="relative flex min-h-[5px] "
              >
                <div
                  className="img-browse-btn inline-flex rounded border border-white text-sky-800 cursor-pointer
                 py-2 px-7 text-base font-medium"
                >
                  Browse
                </div>
                <div className="   py-2 px-7 block w-full border border-[#e0e0e0]">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-sky-800">
                      {file !== "" && file !== undefined
                        ? file.name
                        : "Your Signature"}
                    </span>
                    <button
                      className="text-sky-800"
                      onClick={(e) => {
                        e.preventDefault(), setFile("");
                        setFileSizeExceeded(false);
                        setFormatError(false);
                      }}
                    >
                      <IconX className="static h-4 w-4" />
                    </button>
                  </div>
                </div>
              </label>
              {fileSizeExceeded1 && (
                <p className="error">
                  File size exceeded the limit of {maxFileSize2 / 1000} KB
                </p>
              )}
              {formatError && <p className="error">Invalid Format</p>}
            </div>
            <div className="create_acc_btn_wrapper border">
              <button
                className={
                  submitDisabled
                    ? "create_acc_btn text-slate-800 w-full cursor-not-allowed !bg-slate-400 hover:!text-slate-800"
                    : "create_acc_btn text-green-600 w-full"
                }
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Create Account
              </button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
