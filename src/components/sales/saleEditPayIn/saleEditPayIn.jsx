
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

const SaleEditPayIn = (props) => {
  const { change, changeChange, saleId, accountId } =
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



  const [amtIn, SetAmtIn] = useState(0);

  const [saleDataById, setSaleDataById] = useState([]);
  const [saleData, setSaleData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/sale/fetchData/${accountId}`
      )
      .then((response) => {
        setSaleData(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchDataById/${saleId}`
      )
      .then((response) => {
        
        setSaleDataById({
          ...saleDataById,
          sale_date: response.data[0].sale_date,
          sale_name: response.data[0].sale_name,
          sale_prefix: response.data[0].sale_prefix,
          sale_prefix_no: response.data[0].sale_prefix_no,
          sale_amt: response.data[0].sale_amt,
          sup_cnct_id: response.data[0].sup_cnct_id,
          sale_amt_paid: response.data[0].sale_amt_paid,
          sale_amt_due: response.data[0].sale_amt_due,
          sale_amt_type: response.data[0].sale_amt_type,
          sale_payment_in_id: response.data[0].sale_payment_in_id,
          sale_payment_in_prefix: response.data[0].sale_payment_in_prefix,
          sale_payment_in_prefix_no:
            response.data[0].sale_payment_in_prefix_no,
        });
        SetAmtIn(response.data[0].sale_amt_paid);
      });
  }, []);

  

  const [updatedSaleData, setUpdatedSaleData] = useState({
    sale_amt_paid: "",
    sale_amt_type: "",
    sale_date: "",
    sale_payOut_Id: "",
    sale_id: "",
  });

  updatedSaleData.sale_date = filteredDate;
  updatedSaleData.sale_payOut_Id = saleDataById.sale_payment_in_id;
  updatedSaleData.sale_id = saleId;
  updatedSaleData.sale_amt_paid = amtIn;
  updatedSaleData.sale_amt_type = saleDataById.sale_amt_type;
  console.log("updatedSaleData : ", updatedSaleData);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/sale/updateSale",
        updatedSaleData
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };
  const [updatePaymentIn, setUpdatePaymentIn] = useState(false);

  const totalAmtPaid = saleData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.sale_payment_in_id) ===
        parseInt(saleDataById.sale_payment_in_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.sale_amt_paid;
    }, 0);

  const totalAmt = saleData.filter(
    (filteredItem) =>
      filteredItem.sale_id ===
      parseInt(saleDataById.sale_payment_in_id)
  );

  const [dateError, setDateError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    if (updatePaymentIn === true) {
    if (parseFloat(amtIn) <= (parseFloat(totalAmt[0].sale_amt) - parseFloat(totalAmtPaid)) && parseFloat(amtIn) > 0 && dateError === null  ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }
  }, [amtIn, dateError] );

  return (
    <div>
      {updatePaymentIn === false ? (
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
                      {saleDataById.sale_prefix} #
                      {saleDataById.sale_prefix_no}
                    </div>
                  </div>
                </div>
                <div className=" justify-self-end flex-col">
                  <div className="text-slate-700 font-semibold">
                    ₹{parseFloat(saleDataById.sale_amt_paid).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="add-product-edit-btn-wrapper flex gap-3">
                {submitDisabled ? (
                  <button
                    disabled={submitDisabled}
                    className="text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in cursor-not-allowed"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    disabled={submitDisabled}
                    className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                    onClick={() => setUpdatePaymentIn(true)}
                  >
                    Edit
                  </button>
                )}
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
                    value={saleDataById.sale_payment_in_prefix}
                    name="prefix_name"
                    className=" w-[65%]"
                    required
                  />

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={saleDataById.sale_payment_in_prefix_no}
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
                        value={dayjs(saleDataById.sale_date)}
                        format="LL"
                        maxDate={todaysDate}
                        onChange={(e) => setTransactionDate(e)}
                        onError={(newError) => {
                          setDateError(newError);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div className="box-sec">
                <div>
                  <div>{saleDataById.sale_prefix}</div>
                  <div>{saleDataById.sale_prefix_no}</div>
                </div>
                <div>Total Amount :{totalAmt[0].sale_amt}</div>
                <div>
                  Balance Due :
                  {parseInt(totalAmt[0].sale_amt) - parseInt(totalAmtPaid)}
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
                  //value={saleDataById.sale_amt_paid}
                  value={amtIn}
                  onChange={(e) => SetAmtIn(e.target.value.replace(/^\.|[^0-9.]/g, "")
                  .replace(/(\.\d*\.)/, "$1")
                  .replace(/^(\d*\.\d{0,2}).*$/, "$1"))}
                  inputProps={{maxLength : 10}}
                  required
                />
              </div>
              <div>
                <div>
                  <label>Payment Mode</label>
                </div>
                
                <div className="flex gap-2 p-2">
                  {saleDataById.sale_amt_type === "cash" ? (
                    <input
                      type="radio"
                      id="cash"
                      name="payment_mode"
                      onClick={(e) =>
                        setUpdatedSaleData({
                          ...updatedSaleData,
                          sale_amt_type: "cash",
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
                        setUpdatedSaleData({
                          ...updatedSaleData,
                          sale_amt_type: "cash",
                        })
                      }
                    />
                  )}
                  <label htmlFor="cash">Cash</label>
                  {saleDataById.sale_amt_type === "online" ? (
                    <input
                      type="radio"
                      id="online"
                      name="payment_mode"
                      onClick={(e) =>
                        setUpdatedSaleData({
                          ...updatedSaleData,
                          sale_amt_type: "online",
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
                        setUpdatedSaleData({
                          ...updatedSaleData,
                          sale_amt_type: "online",
                        })
                      }
                    />
                  )}
                  <label htmlFor="online">Online</label>
                </div>
              </div>
              <div>
                {/* Remaning Amount : {(parseFloat(saleData.sale_amt_due) - parseFloat(amtIn)).toFixed(2)} */}
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

export default SaleEditPayIn;
