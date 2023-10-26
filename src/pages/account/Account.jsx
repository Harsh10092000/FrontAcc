import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../../components/navbar/Navbar";
import "./account.scss";
import { IconAlertOctagonFilled, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserIdContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
export default function Account() {
  const { changeChange, change } = useContext(UserContext);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const [fileSizeExceeded1, setFileSizeExceeded1] = useState(false);
  const maxFileSize1 = 2000000;
  const maxFileSize2 = 100000;
  const [file, setFile] = useState("File Name");
  const [file1, setFile1] = useState("Business Logo");
  const [file2, setFile2] = useState("Signature");
  const [filename, setFilename] = useState("Choose File");

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
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // formData.append("signature", file1);
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
      await axios.post("http://localhost:8000/api/act/sendData", formData);
      changeChange();
    } catch (err) {
      console.log(err);
    }
  };
  const [info, setInfo] = useState([]);
  console.log("data : ", data)
  useEffect(() => {
    console.log("data : ", data)
    axios.get("http://localhost:8000/api/act/fetchData").then((res) => {
      setInfo(res.data);
      console.log("info : ", info)
    });
  }, [change]);
  const deleteAc = async () => {
    try {
      await axios.delete("http://localhost:8000/api/act/delData");
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
  return (
    <div className="b-form ">
      <Navbar />
      <div className="business_acc_section-wrapper">
        {info.length > 0 ? (
          <div>
            {info.map((item, index) => (
              <div
                className="max-w-2xl mx-auto my-3 bg-white bg-opacity-50 rounded-lg shadow-md p-10"
                key={index}
              >
                <img
                  className="w-32 h-32 rounded-full mx-auto object-contain shadow-md shadow-slate-600 p-2"
                  src={"http://localhost:8000/account/" + item.business_logo}
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
        ) : (
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </Box>

              <Box className="box-sec">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  label="GST Number"
                  name="business_gst"
                  onChange={handleChange}
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
                        {file1.name ? file1.name : "Your Logo"}
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
                        {file.name ? file.name : "Your Signature"}
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
                  className="create_acc_btn text-green-600 w-full"
                  onClick={handleClick}
                >
                  Create Account
                </button>
              </div>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
