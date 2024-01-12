import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconX, IconTrashFilled } from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./salespaymentin.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";

const PaymentIn = (props) => {
  const { change, changeChange, saleId, accountId } = useContext(UserContext);
  const [defaultPaymentPrefixNo, setDefaultPaymentPrefixNo] = useState(0);
  const [paymentInData, setPaymentInData] = useState([]);

  const [saleData, setSaleData] = useState({
    sale_name: "",
    sale_date: "",
    sale_prefix: "",
    sale_prefix_no: "",
    sale_amt: "",
    sale_amt_due: "",
    cust_cnct_id: "",
    sale_amt_type: "",
  });

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchDataByIdAndPaymentInId/${saleId}`
      )
      .then((response) => {
        setSaleData({
          ...saleData,
          sale_name: response.data[0].sale_name,
          sale_date: response.data[0].sale_date,
          sale_prefix: response.data[0].sale_prefix,
          sale_prefix_no: response.data[0].sale_prefix_no,
          sale_amt: response.data[0].sale_amt,
          sale_amt_due: response.data[0].sale_amt_due,
          cust_cnct_id: response.data[0].cust_cnct_id,
          sale_amt_type: response.data[0].sale_amt_type,
          sale_id: response.data[0].sale_id,
          sale_amt_paid: response.data[0].sale_amt_paid,
        });
        setPaymentInData(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchPaymentPrefixData/${accountId}`
      )
      .then((response) => {
        setDefaultPaymentPrefixNo(response.data[0].sale_payment_in_prefix_no);
      });
  }, [change]);

  const [searchValue, setSearchValue] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);

  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, anchor1, msg) => {
    enqueueSnackbar(msg, { variant });
  };

  const [prefixNo, setPrefixNo] = useState(1);

  useEffect(() => {
    if (defaultPaymentPrefixNo === null) {
      setPrefixNo(1);
    } else {
      setPrefixNo(parseInt(defaultPaymentPrefixNo) + 1);
    }
  }, [defaultPaymentPrefixNo]);

  const [amtIn, SetAmtIn] = useState(0);
  const [payMode, setPayMode] = useState("cash");

  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
 
  useEffect(() => {
    if (
      amtIn !== 0 && 
      parseFloat(amtIn).toFixed(2) <=
      (parseFloat(saleData.sale_amt) - parseFloat(totalAmtPaid)).toFixed(2)&&
      error === null
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [amtIn, error]);

  const [payData, setPayData] = useState({
    sale_prefix: "",
    sale_prefix_no: "",
    sale_name: "",
    sale_cnct_id: "",
    sale_payment_in_prefix: "",
    sale_payment_in_prefix_no: "",
    sale_amt_in: "",
    sale_amt_in_date: "",
    sale_amt_in_mode: "",
    sale_cust_cnct_id: "",
    amt_paid: "",
    amt_due: "",
    sale_acc_id: "",
  });

  payData.sale_acc_id = accountId;
  payData.sale_prefix = saleData.sale_prefix;
  payData.sale_prefix_no = saleData.sale_prefix_no;
  payData.sale_name = saleData.sale_name;
  payData.sale_cnct_id = saleData.sale_id;
  payData.sale_cust_cnct_id = saleData.cust_cnct_id;
  payData.sale_payment_in_prefix = "PaymentIn";
  payData.sale_payment_in_prefix_no = prefixNo;
  payData.sale_amt_in = amtIn;
  payData.sale_amt_in_date = filteredDate;
  payData.sale_amt_in_mode = payMode;
  payData.sale_desc = "PAYMENT IN";
  payData.amt_paid = parseFloat(saleData.sale_amt_paid) + parseFloat(amtIn);
  payData.amt_due = saleData.sale_amt_due - amtIn;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sale/addSalePayment",
        payData
      );
      
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const totalAmtPaid = paymentInData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.sale_payment_in_id) === parseInt(saleData.sale_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.sale_amt_paid;
    }, 0);

    

  return (
    <div>
      <h1 className="text_left heading">You Got</h1>

      <div className="add-expense-section-wrapper">
        <div className="section-2">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="box-sec ">
              <div className="sec-1 w-[50%] pt-2">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value="PaymentIn"
                  name="prefix_name"
                  className=" w-[65%]"
                  required
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  // value={
                  //   prefixValue === "" || prefixValue === undefined
                  //     ? parseInt(defaultPaymentPrefixNo) + 1
                  //     : prefixNo
                  // }
                  value={prefixNo}
                  name="prefix_number"
                  className=" w-[35%]"
                  required
                />
              </div>
              <div className="sec-2 w-[50%]">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="pt-0"
                >
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Date"
                      value={todaysDate}
                      format="LL"
                      maxDate={todaysDate}
                      onChange={(e) => setTransactionDate(e)}
                      onError={(newError) => {
                        setError(newError);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            <div className="box-sec">
              <div>
                <div>{saleData.sale_prefix}</div>
                <div>{saleData.sale_prefix_no}</div>
              </div>
              <div>
                Total Amount : {parseFloat(saleData.sale_amt).toFixed(2)}
              </div>
              <div>
                Balance Due :
                {(parseFloat(saleData.sale_amt) -
                  parseFloat(totalAmtPaid)).toFixed(2)}
              </div>
            </div>
            <div className="box-sec">
              <TextField
                label="Amount Received"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="amt_received"
                value={amtIn}
                inputProps={{ maxLength: 10 }}
                onChange={(e) =>
                  SetAmtIn(
                    e.target.value
                      .replace(/^\.|[^0-9.]/g, "")
                      .replace(/(\.\d*\.)/, "$1")
                      .replace(/^(\d*\.\d{0,2}).*$/, "$1")
                  )
                }
                required
              />
            </div>
            <div>
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
            </div>
            <div>
              Remaning Amount :
              {(
                (parseFloat(saleData.sale_amt) -
                parseFloat(totalAmtPaid)).toFixed(2) -
                parseFloat(amtIn ? amtIn : 0)
              ).toFixed(2) }
            </div>
          </Box>
          <div className="cashout-btn-wrapper">
            {submitDisabled ? (
              <button
                disabled={submitDisabled}
                className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              >
                Payment In
              </button>
            ) : (
              <button
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                onClick={handleClick}
              >
                Payment In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIn;
