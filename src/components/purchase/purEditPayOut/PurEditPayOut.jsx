import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// import "./purpayout.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";

const PurEditPayOut = (props) => {
  const { change, changeChange, purchaseId, accountId } =
    useContext(UserContext);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);

  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, anchor1, msg) => {
    enqueueSnackbar(msg, { variant });
  };
  const [amtOut, SetAmtOut] = useState(0);
  const [purchaseDataById, setPurchaseDataById] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

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
          purchase_date: response.data[0].purchase_date,
          purchase_name: response.data[0].purchase_name,
          purchase_prefix: response.data[0].purchase_prefix,
          purchase_prefix_no: response.data[0].purchase_prefix_no,
          purchase_amt: response.data[0].purchase_amt,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt_paid: response.data[0].purchase_amt_paid,
          purchase_amt_due: response.data[0].purchase_amt_due,
          purchase_amt_type: response.data[0].purchase_amt_type,
          purchase_pay_out_id: response.data[0].purchase_pay_out_id,
          purchase_pay_out_prefix: response.data[0].purchase_pay_out_prefix,
          purchase_pay_out_prefix_no:
            response.data[0].purchase_pay_out_prefix_no,
        });
        SetAmtOut(response.data[0].purchase_amt_paid);
      });
  }, []);

  const [updatedPurchaseData, setUpdatedPurchaseData] = useState({
    purchase_amt_paid: "",
    purchase_amt_type: "",
    purchase_date: "",
    purchase_payOut_Id: "",
    purchase_id: "",
  });

  updatedPurchaseData.purchase_date = filteredDate;
  updatedPurchaseData.purchase_payOut_Id = purchaseDataById.purchase_pay_out_id;
  updatedPurchaseData.purchase_id = purchaseId;
  updatedPurchaseData.purchase_amt_paid = amtOut;
  updatedPurchaseData.purchase_amt_type = purchaseDataById.purchase_amt_type;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/purchase/updatePurchase",
        updatedPurchaseData
      );
      changeChange();
      props.snack();
      
    } catch (err) {
      console.log(err);
    }
  };
  const [updatePayOut, setUpdatePayOut] = useState(false);

  const totalAmtPaid = purchaseData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.purchase_pay_out_id) ===
        parseInt(purchaseDataById.purchase_pay_out_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.purchase_amt_paid;
    }, 0);

  const totalAmt = purchaseData.filter(
    (filteredItem) =>
      filteredItem.purchase_id ===
      parseInt(purchaseDataById.purchase_pay_out_id)
  );


  const [error, setError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false); 
    useEffect(() => {
      if (updatePayOut === true) {
      if (parseFloat(amtOut) <= (parseFloat(totalAmt[0].purchase_amt) - parseFloat(totalAmtPaid)) && parseFloat(amtOut) > 0 && error === null) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    }
    }, [totalAmt, error] );
  
 

  return (
    <div>
      {updatePayOut === false ? (
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
              <div className="flex justify-between border-b px-7 py-4">
                <div className="">
                  <div className="details flex flex-col gap-1 ">
                    <div className="category font-semibold ">Adjusted In</div>
                    <div className="text-sm text-slate-700 font-semibold">
                      {purchaseDataById.purchase_prefix} #
                      {purchaseDataById.purchase_prefix_no}
                    </div>
                  </div>
                </div>
                <div className=" justify-self-end flex-col">
                  <div className="text-slate-700 font-semibold">
                    ₹{parseFloat(purchaseDataById.purchase_amt_paid).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="add-product-edit-btn-wrapper flex gap-3">
                <button
                  className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                  onClick={() => setUpdatePayOut(true)}
                >
                  Edit
                </button>
              </div>
            </Box>
          </div>
        </div>
      ) : (
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
                    value={purchaseDataById.purchase_pay_out_prefix}
                    name="prefix_name"
                    className=" w-[65%]"
                    required
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={purchaseDataById.purchase_pay_out_prefix_no}
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
                        value={dayjs(purchaseDataById.purchase_date)}
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
                <div>Total Amount :{parseFloat(totalAmt[0].purchase_amt).toFixed(2)}</div>
                <div>
                  Balance Due :
                  {(parseFloat(totalAmt[0].purchase_amt) - parseFloat(totalAmtPaid)).toFixed(2)}
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
                  onChange={(e) => SetAmtOut(e.target.value.replace(/^\.|[^0-9.]/g, "")
                  .replace(/(\.\d*\.)/, "$1")
                  .replace(/^(\d*\.\d{0,2}).*$/, "$1"))}
                  
                  helperText={
                    parseFloat(amtOut) <=
                      parseFloat(totalAmt[0].purchase_amt) &&
                    parseFloat(amtOut) > 0
                      ? ""
                      : "Error"
                  }
                  required
                />
              </div>
              {console.log(amtOut, totalAmt[0].purchase_amt)}
              <div>
                <div>
                  <label>Payment Mode</label>
                </div>

                <div className="flex gap-2 p-2">
                  {purchaseDataById.purchase_amt_type === "cash" ? (
                    <input
                      type="radio"
                      id="cash"
                      name="payment_mode"
                      onClick={(e) =>
                        setUpdatedPurchaseData({
                          ...updatedPurchaseData,
                          purchase_amt_type: "cash",
                        })
                      }
                      defaultChecked
                    />
                  ) : (
                    <input
                      type="radio"
                      id="cash"
                      name="payment_mode"
                      onClick={(e) =>
                        setUpdatedPurchaseData({
                          ...updatedPurchaseData,
                          purchase_amt_type: "cash",
                        })
                      }
                    />
                  )}
                  <label htmlFor="cash">Cash</label>
                  {purchaseDataById.purchase_amt_type === "online" ? (
                    <input
                      type="radio"
                      id="online"
                      name="payment_mode"
                      onClick={(e) =>
                        setUpdatedPurchaseData({
                          ...updatedPurchaseData,
                          purchase_amt_type: "online",
                        })
                      }
                      defaultChecked
                    />
                  ) : (
                    <input
                      type="radio"
                      id="online"
                      name="payment_mode"
                      onClick={(e) =>
                        setUpdatedPurchaseData({
                          ...updatedPurchaseData,
                          purchase_amt_type: "online",
                        })
                      }
                    />
                  )}
                  <label htmlFor="online">Online</label>
                </div>
              </div>
              <div>
                {/* Remaning Amount : {(parseFloat(purchaseData.purchase_amt_due) - parseFloat(amtOut)).toFixed(2)} */}
              </div>
            </Box>
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
                  className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                  onClick={handleClick}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurEditPayOut;
