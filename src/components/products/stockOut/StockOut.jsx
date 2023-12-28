import * as React from "react";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const StockOut = (props) => {
  const { pId, changeChange } = useContext(UserContext);
  const [primaryUnit, setPrimaryUnit] = useState("");
  const [secondaryUnit, setSecondaryUnit] = useState("");
  const [unit, setUnit] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [conversion, setConversion] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [values, setValues] = useState({
    product_stock_out: null,
    balance_stock: null,
    primary_unit: "",
    secondary_unit: "",
    sale_price: "",
    product_desc: "",
    entry_date: "",
    cnct_id: pId,

    total_profit: null,
  });

  const [price1, setPrice1] = useState("hgfh");
  const [convertedPrice, setConvertedPrice] = useState(null);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductTran/${pId}`)
      .then((response) => {
        setResult(response.data);
        setPrimaryUnit(response.data[0].primary_unit);
        setSecondaryUnit(response.data[0].secondary_unit);
        setUnit(response.data[0].primary_unit);
        setConversion(response.data[0].conversion);
        setCurrentStock(response.data[0].balance_stock);
        setPrice1(response.data[0].sale_price);
        setValues({
          ...values,
          primary_unit: response.data[0].primary_unit,
          secondary_unit: response.data[0].secondary_unit,
          sale_price: response.data[0].sale_price,
        });

        setConvertedPrice(
          parseFloat(response.data[0].sale_price / response.data[0].conversion)
        );
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchStockInTran/${pId}`)
      .then((response) => {
        setResult2(response.data);
      });
  }, [pId]);

  console.log(
    "values.sale price : ",
    values.sale_price,
    price1,
    result,
    values.primary_unit,
    currentStock
  );
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [values2, setValues2] = useState({
    updatedStockQty: null,
  });

  var coverted_qty = isActive
    ? parseFloat(values.product_stock_out)
    : parseFloat(values.product_stock_out / conversion);
  values2.updatedStockQty = currentStock - coverted_qty;

  const [valueErr, setValueErr] = useState(false);
  useEffect(() => {
    if (coverted_qty > currentStock) {
      setValueErr(true);
    } else {
      setValueErr(false);
    }
  }, [handleChange]);

  const handleClick = async (e) => {
    e.preventDefault();
    values.entry_date = filteredDate;
    try {
      values.sale_price = isActive
        ? parseFloat(values.sale_price)
        : convertedPrice;
      values.selected_unit = unit ? unit : primaryUnit;
      values.balance_stock = currentStock - coverted_qty;
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/auth/addStockIn",
        values
      );
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/auth/updateStockQty/${pId}`,
        values2
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  if (convertedPrice !== null) {
    useEffect(() => {
      if (
        convertedPrice > 0 &&
        convertedPrice !== "" &&
        //values.purchase_price !== "" &&
        //values.purchase_price > 0 &&
        values.product_stock_out !== null &&
        values.product_stock_out !== "" &&
        coverted_qty <= currentStock &&
        error === null
      ) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    }, [values.product_stock_out, convertedPrice, error]);
  } else {
    useEffect(() => {
      if (
        values.product_stock_out !== null &&
        values.product_stock_out !== "" &&
        values.purchase_price !== "" &&
        values.purchase_price > 0 &&
        coverted_qty <= currentStock &&
        error === null
      ) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    }, [values.product_stock_out, values.purchase_price, error]);
  }

  return (
    <Box sx={{ width: 400 }} role="presentation">
      <div>
        <h1 className="text_left heading text-red-600 font-semibold text-lg">
          Stock Out
        </h1>

        <div className="product-stock-in-section-wrapper">
          <div className="section-2">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
              className="w-full"
            >
              {secondaryUnit !== null && secondaryUnit !== "" ? (
                <Box className="box-sec unit-selector">
                  <label className="pl-3">Stock in unit in</label>

                  <div className=" flex  selector-btn">
                    <button
                      className={isActive ? "active-btn" : "inactive-btn"}
                      onClick={(e) => {
                        e.preventDefault(), setUnit(primaryUnit);
                        setIsActive(true);
                      }}
                    >
                      {primaryUnit}
                    </button>
                    <button
                      className={isActive ? "inactive-btn" : "active-btn"}
                      onClick={(e) => {
                        e.preventDefault(), setUnit(secondaryUnit);
                        setIsActive(false);
                      }}
                    >
                      {secondaryUnit}
                    </button>
                  </div>
                </Box>
              ) : (
                <div></div>
              )}

              <Box className="box-sec">
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{unit}</InputAdornment>
                    ),
                  }}
                  label="Enter quantity of products"
                  id="outlined-basic"
                  variant="outlined"
                  className="w-full m-0"
                  size="small"
                  required
                  name="product_stock_out"
                  inputProps={{ maxLength: 10 }}
                  value={values.product_stock_out}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      product_stock_out: e.target.value
                        .replace(/^\.|[^0-9.]/g, "")
                        .replace(/(\.\d*\.)/, "$1")
                        .replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                    })
                  }
                />
              </Box>
              <span>{valueErr ? "error" : ""}</span>
              <Box className="box-sec">
                <TextField
                  label="Sale Price"
                  id="outlined-basic"
                  variant="outlined"
                  className="w-full m-0"
                  size="small"
                  required
                  value={isActive ? values.sale_price : convertedPrice}
                  inputProps={{maxLength : 10}}
                  name="sale_price"
                  onChange={
                    isActive
                      ? (e) => setValues({
                          ...values,
                          sale_price: e.target.value
                            .replace(/^\.|[^0-9.]/g, "")
                            .replace(/(\.\d*\.)/, "$1")
                            .replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                        }) || 0
                      : (e) =>
                          setConvertedPrice(
                            e.target.value
                              .replace(/^\.|[^0-9.]/g, "")
                              .replace(/(\.\d*\.)/, "$1")
                              .replace(/^(\d*\.\d{0,2}).*$/, "$1")
                          )
                  }
                />
              </Box>

              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Date"
                      value={todaysDate}
                      format="LL"
                      className="w-full"
                      maxDate={todaysDate}
                      onChange={(newValue) => setTransactionDate(newValue)}
                      onError={(newError) => {
                        setError(newError);
                      }}
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
                  name="product_desc"
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </div>
        </div>

        <div className="product-stock-in-btn-wrapper">
          
          {submitDisabled ? (
            <button
              disabled={submitDisabled}
              className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
            >
              Stock Out
            </button>
          ) : (
            <button
              onClick={handleClick}
              disabled={submitDisabled}
              className="text-red-600 bg-red-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
            >
              Stock Out
            </button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default StockOut;
