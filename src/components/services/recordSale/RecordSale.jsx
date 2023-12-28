import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import InputAdornment from "@mui/material/InputAdornment";
import "./recordsale.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const RecordSale = (props) => {
  const { serId, change, changeChange } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

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
    ser_sales: 0,
  });

  const [data, setData] = useState({
    ser_tran_price: "",
    ser_quantity: "",
    ser_date: "",
    ser_description: "",
    ser_cnct_id: serId,
  });

  const [unit, setUnit] = useState("");
  const [totalSales, setTotalSales] = useState();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchDataid/${serId}`)
      .then((res) => {
        setData({ ...data, ser_tran_price: res.data[0].ser_price }),
          setUnit(res.data[0].ser_unit);
        //setTotalSales(res.data[0].ser_sales)
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
          ser_sales: res.data[0].ser_sales,
        });
      });
  }, [change, serId]);

  const total =
    parseInt(data.ser_quantity) +
    parseInt(info.ser_sales === null ? 0 : info.ser_sales);

  console.log("info : ", info, total, data.ser_quantity, info.ser_sales);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      data.ser_date = filteredDate;
      info.ser_sales = total;
      axios.post(import.meta.env.VITE_BACKEND + "/api/ser/sendTran", data);
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ser/updateData/${serId}`,
        info
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      data.ser_tran_price !== "" &&
      data.ser_tran_price !== null &&
      data.ser_quantity !== "" &&
      data.ser_quantity !== null
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.ser_tran_price, data.ser_quantity]);

  return (
    <Box sx={{ width: 400 }} role="presentation">
      <div>
        <h1 className="text_left heading text-blue-500 font-semibold text-lg">
          Record Sale
        </h1>

        <div className="services-record-sale-section-wrapper">
          <div className="section-2">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              className="w-full p-6"
            >
              <Box className="box-sec">
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{unit}</InputAdornment>
                    ),
                  }}
                  label="Enter quantity of services sold"
                  id="outlined-basic"
                  variant="outlined"
                  className="w-full m-0"
                  size="small"
                  onChange={(e) =>
                    setData({
                      ...data,
                      ser_quantity: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  value={data.ser_quantity}
                  required
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Box>

              <Box className="box-sec">
                <TextField
                  label="Sale Price"
                  id="outlined-basic"
                  variant="outlined"
                  className="w-full m-0"
                  size="small"
                  value={data.ser_tran_price}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ser_tran_price: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                  type="text"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    min: "0",
                  }}
                />
              </Box>

              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Date"
                      value={transactionDate}
                      format="LL"
                      className="w-full"
                      maxDate={todaysDate}
                      onChange={(newValue) => setTransactionDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <Box className="box-sec">
                <TextField
                  fullWidth
                  multiline
                  id="outlined-basic"
                  variant="outlined"
                  label="Description"
                  type="text"
                  placeholder="Enter Details (Party Name, Bill No etc)"
                  InputProps={{
                    rows: 4,
                  }}
                  className="w-full"
                  onChange={(e) =>
                    setData({ ...data, ser_description: e.target.value })
                  }
                />
              </Box>
            </Box>
          </div>
        </div>

        <div className="services-record-sale-btn-wrapper p-3">
          {submitDisabled ? (
            <button
              disabled={submitDisabled}
              className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
            >
              Add Services
            </button>
          ) : (
            <button
              className=" text-blue-600 bg-blue-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-blue-600 transition-all ease-in"
              onClick={handleClick}
            >
              Record Sale
            </button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default RecordSale;
