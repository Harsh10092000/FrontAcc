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
  const [file2, setFile2] = useState("Signature");
  const [filename, setFilename] = useState("Choose File");
  const [staffData, setStaffData] = useState([]);
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
      console.log("res : " , res.data);
      changeAccountId(res.data)
      changeChange();
      //localStorage.setItem('user', res.data)
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

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      data.business_acc_no === "" &&
      data.business_bank_name === "" && 
      data.business_ifsc_code === "" && 
      data.business_payee_name === "" &&
      data.business_name !== "" &&
      data.business_address !== "" &&
      (data.business_gst === "" || data.business_gst.length > 14 || data.business_gst.length === 0)
    ) {
      setSubmitDisabled(false);
    } else if (
      data.business_acc_no.length > 9 &&
      data.business_bank_name !== "" && 
      data.business_ifsc_code.length > 10 && 
      data.business_payee_name !== "" &&
      data.business_name !== "" &&
      data.business_address !== "" &&
      (data.business_gst === "" || data.business_gst.length > 14 || data.business_gst.length === 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.business_acc_no, data.business_bank_name , data.business_ifsc_code, data.business_payee_name , data.business_name, data.business_address, data.business_gst]);

  return (
    <div className="b-form ">
      <Navbar />
      <div className="business_acc_section-wrapper">
        {/* {info.length > 0 ? (
          <div>
            {info.map((item, index) => (
              <div
                className="max-w-2xl mx-auto my-3 bg-white bg-opacity-50 rounded-lg shadow-md p-10"
                key={index}
                // onClick={() => changeAccountId(item.business_id)}
                onClick={() => changeId(item.business_id)}
              >
                <img
                  className="w-32 h-32 rounded-full mx-auto object-contain shadow-md shadow-slate-600 p-2"
                  src={
                    import.meta.env.VITE_BACKEND +
                    "/account/" +
                    item.business_logo
                  }
                  alt="Profile picture"
                />

                <h2 className="text-center text-3xl font-semibold mt-3">
                  {item.business_name}
                </h2>

                <p className="text-center text-gray-600 mt-1 capitalize">
                  {item.business_type.replaceAll("_", " ")}
                </p>
                <p className="text-center text-gray-600 mt-1">
                  {item.business_address}
                </p>

                <div className="mt-5">
                  <h3 className="text-2xl font-semibold">Details</h3>
                  <div className="flex justify-between mt-5">
                    <div className="font-semibold">
                      GST :&nbsp;
                      <span className=" font-thin">{item.business_gst}</span>
                    </div>
                    <div className="font-semibold">
                      Business Nature :{" "}
                      <span className="font-thin capitalize">
                        {item.business_nature.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex w-[42rem]">
              <button
                className="p-2 text-white rounded w-full font-semibold hover:text-slate-800 hover:bg-white"
                style={{
                  border: "1px solid white",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={handleClickOpen}
              >
                Delete Account
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <div className="flex">
                  <div className="pt-5 pl-3">
                    <IconAlertOctagonFilled
                      size={60}
                      className="text-red-600"
                    />
                  </div>
                  <div>
                    <DialogTitle id="alert-dialog-title">
                      Are You Sure ?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        You are about to delete the Account ! This action cannot
                        be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className="flex gap-4">
                      <button className="pb-3" onClick={handleClose}>
                        Cancel
                      </button>
                      <button
                        className="delete-btn text-red-600 pb-3 pr-3"
                        onClick={deleteAc}
                        autoFocus
                      >
                        Delete Account
                      </button>
                    </DialogActions>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        ) : ( */}
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
                value={data.business_address}
                onChange={(e) =>
                  setData({
                    ...data,
                    business_address: e.target.value.replace(/[^0-9A-Z a-z /]/g, ""),
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
                  })
                }
                className="w-full"
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
                    business_bank_name: e.target.value.replace(/[^A-Z a-z]/g, ""),
                  })
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
                    business_payee_name: e.target.value.replace(/[^A-Z a-z]/g, ""), 
                  })
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
                    business_ifsc_code: e.target.value.replace(/[^0-9A-Za-z]/g, ""), 
                  })
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
                  setFile1(event.target.files[0]);
                  console.log(file.size);
                  if (file.size > maxFileSize1) {
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
                    
                      {file1 !== "" && file1 !== undefined ? file1.name : "Your Logo"}
                    </span>
                    <button
                      className="text-sky-800"
                      onClick={(e) => e.preventDefault()}
                    >
                      <IconX />
                    </button>
                  </div>
                </div>
              </label>
              {fileSizeExceeded && (
                <p className="error">
                  File size exceeded the limit of {maxFileSize1 / 1000000} MB
                </p>
              )}
            </div>
            <div className="upload-img-sec">
              <input
                type="file"
                id="file-2"
                className="hidden sr-only"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  setFile2(file.name);
                  if (file.size > maxFileSize2) {
                    setFileSizeExceeded1(true);
                    return;
                  } else {
                    setFileSizeExceeded1(false);
                  }
                }}
              />
              <label
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
                      
                      {file !== "" && file !== undefined ? file.name : "Your Signature"}
                    </span>
                    <button
                      className="text-sky-800"
                      onClick={(e) => e.preventDefault()}
                    >
                      <IconX />
                    </button>
                  </div>
                </div>
              </label>
              {fileSizeExceeded1 && (
                <p className="error">
                  File size exceeded the limit of {maxFileSize2 / 1000} KB
                </p>
              )}
            </div>
            <div className="create_acc_btn_wrapper border">
              <button
                className = {submitDisabled ? "create_acc_btn text-slate-800 w-full cursor-not-allowed !bg-slate-400 hover:!text-slate-800" : "create_acc_btn text-green-600 w-full" }
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Create Account
              </button>
            </div>
          </Box>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
