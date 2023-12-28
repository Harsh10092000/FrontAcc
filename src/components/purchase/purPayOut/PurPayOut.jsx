import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./purpayout.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";

const PayOut = (props) => {
  const { change, changeChange, purchaseId, accountId } =
    useContext(UserContext);
  const [defaultPaymentPrefixNo, setDefaultPaymentPrefixNo] = useState(0);

  const [purchaseData, setPurchaseData] = useState([]);
  const [purchaseDataById, setPurchaseDataById] = useState({
    purchase_name: "",
    purchase_date: "",
    purchase_prefix: "",
    purchase_prefix_no: "",
    purchase_amt: "",
    purchase_amt_due: "",
    sup_cnct_id: "",
    purchase_amt_type: "",
  });

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/purchase/fetchData/${accountId}`
      )
      .then((response) => {
        setPurchaseData(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchDataById/${purchaseId}`
      )
      .then((response) => {
        setPurchaseDataById({
          ...purchaseDataById,
          purchase_name: response.data[0].purchase_name,
          purchase_date: response.data[0].purchase_date,
          purchase_prefix: response.data[0].purchase_prefix,
          purchase_prefix_no: response.data[0].purchase_prefix_no,
          purchase_amt: response.data[0].purchase_amt,
          purchase_amt_due: response.data[0].purchase_amt_due,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt_type: response.data[0].purchase_amt_type,
          purchase_id: response.data[0].purchase_id,
          purchase_amt_paid: response.data[0].purchase_amt_paid,
        });
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchasePayPrefixData/${accountId}`
      )
      .then((response) => {
        setDefaultPaymentPrefixNo(response.data[0].purchase_pay_out_prefix_no);
      });
  }, [change]);

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

  const [prefixNo, setPrefixNo] = useState(0);

  useEffect(() => {
    if (defaultPaymentPrefixNo === null) {
      setPrefixNo(1);
    } else {
      setPrefixNo(defaultPaymentPrefixNo + 1);
    }
  }, [defaultPaymentPrefixNo]);

  const [amtOut, SetAmtOut] = useState(0);
  const [payMode, setPayMode] = useState("cash");

  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (parseFloat(amtOut) <= (parseFloat(purchaseDataById.purchase_amt).toFixed(2) - parseFloat(totalAmtPaid)) &&  amtOut > 0 && error === null) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [amtOut, error]);


  const [payData, setPayData] = useState({
    purchase_prefix: "",
    purchase_prefix_no: "",
    purchase_name: "",
    purchase_cnct_id: "",
    purchase_pay_out_prefix: "",
    purchase_pay_out_prefix_no: "",
    purchase_amt_out: "",
    purchase_amt_out_date: "",
    purchase_amt_out_mode: "",
    purchase_sup_cnct_id: "",
    amt_paid: "",
    amt_due: "",
    purchase_acc_id: "",
  });

  payData.purchase_acc_id = accountId;
  payData.purchase_prefix = purchaseDataById.purchase_prefix;
  payData.purchase_prefix_no = purchaseDataById.purchase_prefix_no;
  payData.purchase_name = purchaseDataById.purchase_name;
  payData.purchase_cnct_id = purchaseDataById.purchase_id;
  payData.purchase_sup_cnct_id = purchaseDataById.sup_cnct_id;
  payData.purchase_pay_out_prefix = "PaymentOut";
  payData.purchase_pay_out_prefix_no = parseInt(defaultPaymentPrefixNo) + 1;
  payData.purchase_amt_out = amtOut;
  payData.purchase_amt_out_date = filteredDate;
  payData.purchase_amt_out_mode = payMode;
  payData.purchase_desc = "PAYMENT OUT";
  payData.amt_paid =
    parseFloat(purchaseDataById.purchase_amt_paid) + parseFloat(amtOut);
  payData.amt_due = purchaseDataById.purchase_amt_due - amtOut;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/purchase/addPurchasePayment",
        payData
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const totalAmtPaid = purchaseData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.purchase_pay_out_id) ===
        parseInt(purchaseDataById.purchase_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.purchase_amt_paid;
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
                <div>{purchaseDataById.purchase_prefix}</div>
                <div>{purchaseDataById.purchase_prefix_no}</div>
              </div>
              
              <div>
                Total Amount :
                {parseFloat(purchaseDataById.purchase_amt).toFixed(2)}
              </div>
              <div>
                Balance Due :
                {(parseFloat(purchaseDataById.purchase_amt).toFixed(2) -
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
                value={amtOut}
                inputProps={{ maxLength : 10 }}
                onChange={(e) =>
                  SetAmtOut(
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
              Remaning Amount :{" "}
              {(
                parseFloat(purchaseDataById.purchase_amt).toFixed(2) -
                parseFloat(totalAmtPaid) -
                parseFloat(amtOut)
              ).toFixed(2)}
            </div>
          </Box>
          <div className="cashout-btn-wrapper">
            {submitDisabled ? (
              <button
                disabled={submitDisabled}
                className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              >
                Payment Out
              </button>
            ) : (
              <button
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                onClick={handleClick}
              >
                Payment Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayOut;
