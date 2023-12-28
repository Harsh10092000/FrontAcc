import "./cashin.scss";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
const CashIn = (props) => {
  const { changeChange , accountId } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 2000000;
  const [file, setFile] = useState("File Name");
  const [fileExists, setFileExists] = useState(false);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [payMode, setPayMode] = useState("cash");

  const [values, setValues] = useState({
    cash_receive: "",
    cash_date: "",
    cash_description: "",
    cash_mode: "",
    cash_acc_id: "",
  });
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      values.cash_date = filteredDate.trim();
      values.cash_mode = payMode;
      formData.append("image", file);
      formData.append("cash_receive", values.cash_receive);
      formData.append("cash_description", values.cash_description);
      formData.append("cash_date", values.cash_date);
      formData.append("cash_mode", values.cash_mode);
      formData.append("cash_acc_id", accountId);
      axios.post(import.meta.env.VITE_BACKEND + "/api/cash/sendData", formData);
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (values.cash_receive !== "" && error === null) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.cash_receive, error]);

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="text_left heading text-green-500 font-semibold text-lg">
        
      </h1>

      <div className="cashout-section-wrapper">
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
                className="w-full m-0"
                size="small"
                name="cash_receive"
                
                inputProps={{maxLength : 10}}
                onChange={(e) =>
                  setValues({
                    ...values,
                    cash_receive: e.target.value
                    .replace(/^\.|[^0-9.]/g, "")
                    .replace(/(\.\d*\.)/, "$1")
                    .replace(/^(\d*\.\d{0,2}).*$/, "$1")
                  })
                }
                value={values.cash_receive}
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
                name="cash_description"
                className="w-full"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <div>
                <label>Payment Mode</label>
              </div>
              <div className="flex gap-2 p-2">
                <input
                  type="radio"
                  id="cash"
                  name="payment_mode"
                  checked
                  onChange={(e) => setPayMode("cash")}
                />
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  id="online"
                  name="payment_mode"
                  onClick={(e) => setPayMode("online")}
                />
                <label htmlFor="online">Online</label>
              </div>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={transactionDate}
                    onChange={(newValue) => setTransactionDate(newValue)}
                    format="LL"
                    className="w-full"
                    maxDate={todaysDate}
                    onError={(newError) => {
                      setError(newError);
                    }}
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
              <div className=" rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    {file.name}
                  </span>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {fileSizeExceeded && (
              <>
                <p className="error">
                  File size exceeded the limit of
                  {maxFileSize / 1000000} MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="cashout-btn-wrapper">
        
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            In
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleClick}
          >
            In
          </button>
        )}
      </div>
    </form>
  );
};

export default CashIn;
