import "./cashout.scss";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const CashOut = (props) => {
  const { changeChange } = useContext(UserContext);
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
  var filteredDate = date1.toString().slice(4, 15);

  const [payMode, setPayMode] = useState("cash");
  const [values, setValues] = useState({
    cash_pay: "",
    cash_date: "",
    cash_description: "",
    cash_mode: "",
  });
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      values.cash_date = filteredDate;
      values.cash_mode = payMode;
      formData.append("image", file);
      formData.append("cash_pay", values.cash_pay);
      formData.append("cash_description", values.cash_description);
      formData.append("cash_date", values.cash_date);
      formData.append("cash_mode", values.cash_mode);
      axios.post("http://localhost:8000/api/cash/sendData", formData);
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (values.cash_pay !== "") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.cash_pay]);

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="text_left heading text-red-500 font-semibold text-lg">
        Out Entry
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
                name="cash_pay"
                //onChange={handleChange}
                onChange={(e) =>
                  setValues({ ...values, cash_pay: e.target.value.replace(/\D/g, "") })
                }
                value={values.cash_pay}
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
                  name="cash_mode"
                  className="cursor-pointer"
                  checked
                  onChange={(e) => setPayMode("cash")}
                />
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  id="online"
                  name="cash_mode"
                  className="cursor-pointer"
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
            Out
          </button>
        ) : (
          <button
            className="text-red-600 bg-red-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
            onClick={handleClick}
          >
            Out
          </button>
        )}
      </div>
    </form>
  );
};

export default CashOut;
