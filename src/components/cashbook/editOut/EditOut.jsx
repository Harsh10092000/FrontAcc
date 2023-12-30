import "./editout.scss";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { IconX } from "@tabler/icons-react";
const EditOut = (props) => {
  const { cashId, change, changeChange } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 2000000;
  const [file, setFile] = useState("File Name");

  const [data, setData] = useState({
    cash_pay: "",
    cash_receive: "",
    cash_mode: "",
    cash_date: "",
    cash_time: "",
    cash_description: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/cash/fetchDataid/${cashId}`)
      .then((res) => {
        setData({
          ...data,
          cash_pay: res.data[0].cash_pay,
          cash_receive: res.data[0].cash_receive,
          cash_mode: res.data[0].cash_mode,
          cash_date: res.data[0].cash_date,
          cash_time: res.data[0].cash_time,
          cash_description: res.data[0].cash_description,
        });
        setFile(res.data[0].cash_bill);
      });
  }, [cashId, change]);
  const [flag, setFlag] = useState(false);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);
  const updateData = async (e) => {
    e.preventDefault();
    try {
      flag ? (data.cash_date = filteredDate) : "";
      console.log(data);
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/cash/updateData/${cashId}`,
        data
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [formatError, setFormatError] = useState(false);
  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (data.cash_pay > 0 && error === null &&
      fileSizeExceeded === false &&
      formatError === false) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.cash_pay , error,fileSizeExceeded , formatError]);


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
                value={data.cash_pay}
                onChange={(e) => setData({ ...data, cash_pay: e.target.value.replace(/^\.|[^0-9.]/g, "")
                .replace(/(\.\d*\.)/, "$1")
                .replace(/^(\d*\.\d{0,2}).*$/, "$1") })}
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
                value={data.cash_description}
                onChange={(e) =>
                  setData({ ...data, cash_description: e.target.value })
                }
                className="w-full"
              />
            </Box>
            <Box>
              <div>
                <label>Payment Mode</label>
              </div>
              <div className="flex gap-2 p-2">
                {data.cash_mode === "cash" ? (
                  <input
                    type="radio"
                    id="cash"
                    name="payment_mode"
                    onClick={(e) => setData({ ...data, cash_mode: "cash" })}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    id="cash"
                    name="payment_mode"
                    onClick={(e) => setData({ ...data, cash_mode: "cash" })}
                  />
                )}
                <label htmlFor="cash">Cash</label>
                {data.cash_mode === "online" ? (
                  <input
                    type="radio"
                    id="online"
                    name="payment_mode"
                    onClick={(e) => setData({ ...data, cash_mode: "online" })}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    id="online"
                    name="payment_mode"
                    onClick={(e) => setData({ ...data, cash_mode: "online" })}
                  />
                )}
                <label htmlFor="online">Online</label>
              </div>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={dayjs(data.cash_date)}
                    onChange={(newValue) => {
                      setTransactionDate(newValue), setFlag(true);
                    }}
                    onError={(newError) => {
                      setError(newError);
                    }}
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
                  handleImage(event.target.files);
                }}
              />

              <label
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
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

            {file !== "" && file !== undefined ? (
              <div className=" rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    {file.name  ? file.name : file}
                  </span>
                  <button
                    class="text-[#07074D]"
                    onClick={(e) => {
                      e.preventDefault(), setFile("");
                      setFileSizeExceeded(false);
                      setFormatError(false);
                    }}
                  >
                    <IconX className=" static h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {fileSizeExceeded && (
              
                <p className="error">
                  File size exceeded the limit of
                  {maxFileSize / 1000000} MB
                </p>
              
            )}
            
            {formatError && <p className="error">Invalid Format</p>}
          </div>
        </div>
      </div>

      <div className="cashout-btn-wrapper">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            Update
          </button>
        ) : (
          <button
            className="text-red-600 bg-red-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
            onClick={updateData}
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default EditOut;
