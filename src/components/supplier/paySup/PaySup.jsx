import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IconX } from "@tabler/icons-react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const PaySup = (props) => {
  const { supId, changeChange } = useContext(UserContext);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("");

  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);
  const [values, setValues] = useState({
    sup_tran_pay: "",
    sup_tran_description: "",
    sup_tran_date: "",
    sup_tran_cnct_id: supId,
  });
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      
      
      const formData = new FormData();
      values.sup_tran_date = filteredDate;
      formData.append("image", file);
      formData.append("sup_tran_pay", values.sup_tran_pay);
      formData.append("sup_tran_description", values.sup_tran_description);
      formData.append("sup_tran_cnct_id", values.sup_tran_cnct_id);
      formData.append("sup_tran_date", values.sup_tran_date);
      
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sup/sendTran",
        formData
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
    if (
      values.sup_tran_pay !== "" &&
      error === null &&
      fileSizeExceeded === false &&
      formatError === false
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.sup_tran_pay, error, fileSizeExceeded, formatError]);

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

  const [dragActive, setDragActive] = useState(false);
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("e.dataTransfer.files : ", e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="text_left heading text-red-500 font-semibold text-lg">
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
                className="w-full m-0"
                size="small"
                name="sup_tran_pay"
                value={values.sup_tran_pay}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sup_tran_pay: e.target.value
                      .replace(/^\.|[^0-9.]/g, "")
                      .replace(/(\.\d*\.)/, "$1")
                      .replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                  })
                }
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
                name="sup_tran_description"
                onChange={handleChange}
                InputProps={{
                  rows: 5,
                }}
                className="w-full"
              />
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
                // onChange={(event) => {
                //   setFile(event.target.files[0]);
                //   setFileExists(true);
                //   const get_file_size = event.target.files[0];

                //   if (get_file_size.size > maxFileSize) {
                //     setFileSizeExceeded(true);
                //     return;
                //   } else {
                //     setFileSizeExceeded(false);
                //   }
                // }}
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
                className="relative flex items-center justify-center rounded-md text-center border border-dashed border-[#b6b6b6] py-8 px-16"
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
              <div class=" rounded-md bg-[#F5F7FB] py-4 px-8">
                <div class="flex items-center justify-between">
                  <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                    {file.name}
                  </span>

                  <button
                    class="text-[#07074D]"
                    onClick={(e) => {
                      e.preventDefault(), setFile("");
                      setFormatError(false);
                      setFileSizeExceeded(false);
                    }}
                  >
                    <IconX className= "static h-4 w-4"/>
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {fileSizeExceeded && (
              <p className="error">
                File size exceeded the limit of
                {maxFileSize / 1000} KB
              </p>
            )}
            {formatError && <p className="error">Invalid Format</p>}
          </div>
        </div>
      </div>

      <div className="add-customer-btn-wrapper1">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            You Pay
          </button>
        ) : (
          <button className="add_btn2 text-red-600" onClick={handleClick}>
            You Pay
          </button>
        )}
      </div>
    </form>
  );
};

export default PaySup;
