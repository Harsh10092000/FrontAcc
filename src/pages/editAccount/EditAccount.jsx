import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../../components/navbar/Navbar";
//import "./account.scss";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { UserContext } from "../../context/UserIdContext";
import { useNavigate } from "react-router-dom";

export default function EditAccount() {
  const { changeChange, changeAccountId, accountId, uId } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const [fileSizeExceeded1, setFileSizeExceeded1] = useState(false);
  const maxFileSize1 = 2000000;
  const maxFileSize2 = 100000;
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("business_logo", file);
      formData.append("business_signature", file1);
      formData.append("business_name", accDataById.business_name);
      formData.append("business_address", accDataById.business_address);
      formData.append("business_gst", accDataById.business_gst);
      formData.append("business_type", accDataById.business_type);
      formData.append("business_nature", accDataById.business_nature);
      formData.append("business_bank_acc", accDataById.business_bank_acc);
      formData.append("business_payee_name", accDataById.business_payee_name);
      formData.append("business_acc_no", accDataById.business_acc_no);
      formData.append("business_ifsc_code", accDataById.business_ifsc_code);
      formData.append("business_id", accDataById.business_id);
      const res = await axios.put(
        import.meta.env.VITE_BACKEND + "/api/act/updateAccData",
        formData
      );
      changeAccountId(res.data);
      changeChange();
      navigate("/settings/account");
    } catch (err) {
      console.log(err);
    }
  };

  const [accDataById, setAccDataById] = useState({
    business_name: "",
    business_bank_acc: "",
    business_address: "",
    business_gst: "",
    business_type: "",
    business_nature: "",
    business_name: "",
    business_logo: "",
    business_signature: "",
    business_acc_no: "",
    business_ifsc_code: "",
    business_payee_name: "",
    business_id: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${accountId}`)
      .then((res) => {
        setAccDataById({
          ...accDataById,
          business_name: res.data[0].business_name,
          business_address: res.data[0].business_address,
          business_gst: res.data[0].business_gst,
          business_type: res.data[0].business_type,
          business_nature: res.data[0].business_nature,
          business_bank_acc: res.data[0].business_bank_acc,
          business_logo: res.data[0].business_logo,
          business_signature: res.data[0].business_signature,
          business_acc_no: res.data[0].business_acc_no,
          business_ifsc_code: res.data[0].business_ifsc_code,
          business_payee_name: res.data[0].business_payee_name,
          business_id: res.data[0].business_id,
        });
        setFile(res.data[0].business_logo);
        setFile1(res.data[0].business_signature);
      });
  }, []);

  const [formatError, setFormatError] = useState(false);
  const [formatError1, setFormatError1] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      accDataById.business_acc_no === "" &&
      accDataById.business_bank_acc === "" &&
      accDataById.business_ifsc_code === "" &&
      accDataById.business_payee_name === "" &&
      accDataById.business_name !== "" &&
      accDataById.business_address !== "" &&
      (accDataById.business_gst === "" ||
        accDataById.business_gst.length > 14 ||
        accDataById.business_gst.length === 0)
    ) {
      setSubmitDisabled(false);
    } else if (
      accDataById.business_acc_no.length > 9 &&
      accDataById.business_bank_acc !== "" &&
      accDataById.business_ifsc_code.length > 10 &&
      accDataById.business_payee_name !== "" &&
      accDataById.business_name !== "" &&
      accDataById.business_address !== "" &&
      (accDataById.business_gst === "" ||
        accDataById.business_gst.length > 14 ||
        accDataById.business_gst.length === 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    accDataById.business_acc_no,
    accDataById.business_bank_acc,
    accDataById.business_ifsc_code,
    accDataById.business_payee_name,
    accDataById.business_name,
    accDataById.business_address,
    accDataById.business_gst,
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
      console.log("e.dataTransfer.files : ", e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  const handleDrop1 = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("e.dataTransfer.files : ", e.dataTransfer.files);
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
      (accDataById.business_acc_no.length > 0 &&
        accDataById.business_acc_no.length < 15) ||
      accDataById.business_bank_acc.length > 0 ||
      (accDataById.business_ifsc_code.length > 0 &&
        accDataById.business_ifsc_code.length < 10) ||
      accDataById.business_payee_name.length > 0
    ) {
      console.log(
        "bankDetails : ",
        bankDetails,
        accDataById.business_bank_acc.length,
        accDataById.business_payee_name.length,
        accDataById.business_acc_no.length,
        accDataById.business_ifsc_code.length
      );
      setBankDetails(true);
    } else if (
      accDataById.business_acc_no.length > 16 &&
      accDataById.business_bank_acc.length > 0 &&
      accDataById.business_ifsc_code.length > 10 &&
      accDataById.business_payee_name.length > 0
    ) {
      console.log(
        "bankDetails : ",
        bankDetails,
        accDataById.business_bank_acc.length,
        accDataById.business_payee_name.length,
        accDataById.business_acc_no.length,
        accDataById.business_ifsc_code.length
      );
      setBankDetails(false);
    }
  }, [
    accDataById.business_bank_acc,
    accDataById.business_acc_no,
    accDataById.business_ifsc_code,
    accDataById.business_payee_name,
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
                value={accDataById.business_name}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_name: e.target.value.replace(/[^A-Z a-z]/g, ""),
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
                value={accDataById.business_address}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_address: e.target.value.replace(
                      /[^0-9A-Z a-z /]/g,
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
                value={accDataById.business_gst}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_gst: e.target.value.replace(/[^0-9A-Za-z]/g, ""),
                    //business_gst : e.target.value.replace(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/ , "")
                  })
                }
                className="w-full"
                helperText={
                  accDataById.business_gst.length < 15 &&
                  accDataById.business_gst.length !== 0
                    ? errors.gstError
                    : ""
                }
              />
            </Box>

            <Box className="flex w-full gap-2">
              <select
                name="business_type"
                value={accDataById.business_type}
                className="w-full h-[40px] bg-transparent border border-slate-400 p-2 rounded text-slate-600 text-md"
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_type: e.target.value,
                  })
                }
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
                value={accDataById.business_nature}
                className="w-full h-[40px] bg-transparent border border-slate-400 p-2 rounded text-slate-600 text-md"
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_nature: e.target.value,
                  })
                }
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
                name="business_bank_acc"
                inputProps={{ maxLength: 40 }}
                value={accDataById.business_bank_acc}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_bank_acc: e.target.value.replace(
                      /[^A-Z a-z]/g,
                      ""
                    ),
                  })
                }
                helperText={
                  accDataById.business_bank_acc.length < 1 &&
                  bankDetails === true
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
                value={accDataById.business_payee_name}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_payee_name: e.target.value.replace(
                      /[^A-Z a-z]/g,
                      ""
                    ),
                  })
                }
                helperText={
                  accDataById.business_payee_name.length < 1 &&
                  bankDetails === true
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
                value={accDataById.business_acc_no}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_acc_no: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                helperText={
                  accDataById.business_acc_no.length < 16 &&
                  bankDetails === true
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
                value={accDataById.business_ifsc_code}
                onChange={(e) =>
                  setAccDataById({
                    ...accDataById,
                    business_ifsc_code: e.target.value.replace(
                      /[^0-9A-Za-z]/g,
                      ""
                    ),
                  })
                }
                helperText={
                  accDataById.business_ifsc_code.length < 11 &&
                  bankDetails === true
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
                    {/* <span className="truncate pr-3 text-base font-medium text-sky-800 ">
                      {file1 !== "" && file1 !== undefined && file1 !== null
                        ? file1.name
                        : file1.name === undefined &&
                          accDataById.business_signature
                        ? accDataById.business_signature
                        : "Your Logo"}
                    </span> */}
                    {file1 !== "" && file1 !== undefined && file1 !== null ? (
                      <span className="truncate pr-3 text-base font-medium text-sky-800">
                        {file1.name ? file1.name : file1}
                      </span>
                    ) : (
                      "Your Logo"
                    )}
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
                    {file !== "" && file !== undefined && file !== null ? (
                      <span className="truncate pr-3 text-base font-medium text-sky-800">
                        {file.name ? file.name : file}
                      </span>
                    ) : (
                      "Your Signature"
                    )}
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
                Update Account
              </button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
