import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const Receive = (props) => {
  const { userId, changeChange } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("File Name");
  const [fileExists, setFileExists] = useState(false);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [res, setRes] = useState([]);
  const [bal, setBal] = useState(null);
  const [amtType , setAmtType] = useState("");
  const [custAmt, setCustAmt] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/fetchDataUsingId/${userId}`)
      .then((response) => {
        setCustAmt(response.data[0].cust_amt);
        setAmtType(response.data[0].amt_type);
      });
    axios
      .get(`http://localhost:8000/api/auth/fetchLastTran/${userId}`)
      .then((response) => {
        setRes(response.data);
        setBal(response.data[0].balance);
      });
  }, [userId]);

  const [values, setValues] = useState({
    tran_date: "",
    tran_receive: "",
    tran_description: "",
    cnct_id: userId,
    balance: "",
  });
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (amtType === "pay") {
        if (bal === null) {
          values.balance = custAmt - parseInt(values.tran_receive);
        } else {
          values.balance = bal - parseInt(values.tran_receive);
        }
      } else if (amtType === "receive") {
        if (bal === null) {
          values.balance = custAmt + parseInt(values.tran_receive);
        } else {
          values.balance = bal + parseInt(values.tran_receive);
        }
      }
      
      const formData = new FormData();
      values.tran_date = filteredDate;
      formData.append("image", file);
      formData.append("tran_receive", values.tran_receive);
      formData.append("tran_description", values.tran_description);
      formData.append("cnct_id", values.cnct_id);
      formData.append("tran_date", values.tran_date);
      formData.append("balance", values.balance);
      await axios.post("http://localhost:8000/api/auth/sendTran", formData);
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (values.tran_receive !== "") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.tran_receive]);

  return (
    <form className="block overflow-hidden">
      <h1 className="text_left heading text-green-500 font-semibold text-lg">
        Add New Entry
      </h1>

      <div className="section-wrapper-2">
        <div className="section-2">
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "95%" },
            }}
            noValidate
            autoComplete="off"
            className="w-full p-6"
          >
            <Box className="box-sec">
              <TextField
                label="Amount"
                id="outlined-basic"
                variant="outlined"
                className="w-full"
                size="small"
                name="tran_receive"
                value={values.tran_receive}
                onChange={(e) =>
                  setValues({
                    ...values,
                    tran_receive: e.target.value.replace(/\D/g, ""),
                  })
                }
                //onChange={handleChange}
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                fullWidth
                multiline
                id="outlined-basic"
                variant="outlined"
                label="Description"
                type="text"
                placeholder="Enter Details"
                InputProps={{
                  rows: 5,
                }}
                name="tran_description"
                onChange={handleChange}
                className="w-full"
              />
            </Box>

            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={transactionDate}
                    format="LL"
                    onChange={(newValue) => setTransactionDate(newValue)}
                    className="w-full"
                    maxDate={todaysDate}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <div className="w-[80%]">
            <div className="mb-4">
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
                className="relative flex  items-center justify-center rounded-md text-center border border-dashed border-[#b6b6b6] py-8 px-16"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop files here
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
        </div>
      </div>

      <div className="add-customer-btn-wrapper1">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            You Receive
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleClick}
          >
            You Receive
          </button>
        )}
      </div>
    </form>
  );
};

export default Receive;
