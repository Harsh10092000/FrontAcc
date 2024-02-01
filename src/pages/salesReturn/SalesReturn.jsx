import React from "react";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";

import { Link } from "react-router-dom";

import {

  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { UserContext } from "../../context/UserIdContext";
import axios from "axios";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

const SalesReturn = () => {
  const { change, changeChange, accountId, saleId } =
    useContext(UserContext);

  const [customerData, setCustomerData] = useState([]);


  const [businessGst, setBusinessGst] = useState("");

  const [saleData , setSaleData] = useState([]);
  const [saleDataById, setSaleDataById] = useState([]);
  const [invoiceItemList, setInvoiceItemList] = useState([]);

  const [saleReturnPrefixNo, setSaleReturnPrefixNo] = useState(0);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchSaleTran/${saleId}`
      )
      .then((response) => {
        setInvoiceItemList(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/act/fetchData")
      .then((response) => {
        setBusinessGst(response.data[0].business_gst);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sale/fetchSaleReturnPrefixData/${accountId}`
      )
      .then((response) => {
        setSaleReturnPrefixNo(response.data[0].sale_re_prefix_no);
      });
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
          sale_id: response.data[0].sale_id,
          sale_date: response.data[0].sale_date,
          sale_name: response.data[0].sale_name,
          sale_prefix: response.data[0].sale_prefix,
          sale_prefix_no: response.data[0].sale_prefix_no,
          sale_amt: response.data[0].sale_amt,
          cust_cnct_id: response.data[0].cust_cnct_id,
          sale_amt_paid: response.data[0].sale_amt_paid,
          sale_amt_due: response.data[0].sale_amt_due,
          sale_amt_type: response.data[0].sale_amt_type,
        });

      });
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/auth/fetchCust/${saleDataById.cust_cnct_id}`
      )
      .then((response) => {
        setCustomerData({
          ...customerData,
          cust_name: response.data[0].cust_name,
          cust_number: response.data[0].cust_number,
          cust_gstin: response.data[0].cust_gstin,
          cust_sflat: response.data[0].cust_sflat,
          cust_sarea: response.data[0].cust_sarea,
          cust_spin: response.data[0].cust_spin,
          cust_scity: response.data[0].cust_scity,
          cust_sstate: response.data[0].cust_sstate,
        });
      });
  }, [saleDataById]);


  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);




  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  
  const [amtPayMethod, setAmtPayMethod] = useState("");
  const handlePayStatus = (event) => {
    setAmtPayMethod(event.target.value);
  };



  const navigate = useNavigate();

  const [saleReturn, setSaleReturn] = useState({
    sale_prefix: saleDataById.sale_prefix,
    sale_prefix_no: saleDataById.sale_prefix_no,
    cust_cnct_id: saleDataById.cust_cnct_id,
    sale_date: filteredDate,
    sale_name: saleDataById.sale_name,
    sale_refund_amt: saleDataById.sale_amt,
    invoiceItemsList: invoiceItemList,
    sale_amt_type: "",
    sale_desc: "PAYMENT OUT",
    sale_re_prefix: "PaymentReturn",
    sale_re_prefix_no: "",
    sale_id: saleDataById.sale_id,
    sale_acc_id: accountId,
  });

  saleReturn.sale_amt_type = amtPayMethod;
  (saleReturn.sale_prefix = saleDataById.sale_prefix),
    (saleReturn.sale_prefix_no = saleDataById.sale_prefix_no),
    (saleReturn.cust_cnct_id = saleDataById.cust_cnct_id),
    (saleReturn.sale_date = filteredDate),
    (saleReturn.sale_name = saleDataById.sale_name),
    (saleReturn.sale_refund_amt = saleDataById.sale_amt),
    (saleReturn.sale_id = saleDataById.sale_id),
    (saleReturn.invoiceItemsList = invoiceItemList);
  if (saleReturnPrefixNo === null) {
    saleReturn.sale_re_prefix_no = 1;
  } else {
    saleReturn.sale_re_prefix_no = parseInt(saleReturnPrefixNo) + 1;
  }

  const [totalRefundAmt , setTotalRefundAmt]  = useState(0);
  
  const removeItem = (id) => {
    
    setInvoiceItemList(
      invoiceItemList.filter(a =>
        a.sale_tran_id !== id
      )
    );
  };

  useEffect(() => {
    setTotalRefundAmt(invoiceItemList
      .reduce(function (prev, current) {
        return prev + +(parseInt(current.sale_item_qty) *
        (parseFloat(current.sale_item_disc_price) +
          parseFloat(
              current.sale_item_gst_amt
              ? current.sale_item_gst_amt
              : 0
          )));
      }, 0));
  }, [invoiceItemList])

  totalRefundAmt !== 0
  ? (saleReturn.sale_refund_amt = totalRefundAmt)
  : (saleReturn.sale_refund_amt = saleDataById.sale_amt);


  

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("saleReturn : " , saleReturn);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sale/returnSale",
        saleReturn
      );
     
      navigate("/sales");
    } catch (err) {
      console.log(err);
    }
  };

  



  const totalAmtPaid = saleData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.sale_pay_out_id) ===
        parseInt(saleDataById.sale_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.sale_amt_paid;
    }, 0);

  
    const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    if (invoiceItemList.length > 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [invoiceItemList]);

  let i = 1;
  return (
    <React.Fragment>
      <div className="salesform">
        <Navbar />
        <div className="p-4 bg-slate-100 h-[90vh]">
          <div className="w-full bg-white rounded-lg border border-slate-300 p-2 flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <Link
                to="/sales"
                className="rounded-full p-1 hover:bg-slate-200"
                style={{ transition: "all 400ms ease-in-out" }}
              >
                <IconArrowLeft />
              </Link>
              <div className="text-md font-semibold">
                Create sale return
              </div>
            </div>
            <div className="flex items-center font-semibold gap-8">
              <div className="flex items-center">
                GST Registered Business ?
                <Switch defaultChecked onChange={handleBusinessGst} />
              </div>
              <button
                className={
                  submitDisabled === false
                    ? " p-2 rounded text-green-600 hover:bg-green-600 hover:text-white"
                    : " cursor-not-allowed text-slate-600  p-2 rounded"
                }
                style={{
                  border:
                    submitDisabled === false
                      ? "1px solid #109E5B"
                      : "1px solid rgb(71, 85, 105)",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={handleClick}
                disabled={submitDisabled}
              >
                Create sale return
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="w-full bg-white rounded-xl border border-slate-300 p-5">
              <div className="font-semibold text-slate-700 text-lg">
                Party Details
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Party Name"
                  
                  value={customerData.cust_name}
                />

                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Phone Number"
                  value={customerData.cust_number}
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    value={
                      customerData.cust_sflat +
                      ", " +
                      customerData.cust_sarea +
                      ", " +
                      customerData.cust_scity +
                      ", " +
                      customerData.cust_sstate +
                      ", " +
                      customerData.cust_spin
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="GSTIN (Optional)"
                  value={customerData.cust_gstin}
                />
              </div>
            </div>
            <div className="w-full bg-white rounded-xl border border-slate-300 p-5">
              <div className="font-semibold text-slate-700 text-lg">
                Invoice Details
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[58%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={saleDataById.sale_prefix}
                  />
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[32%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={saleDataById.sale_prefix_no}
                    name="prefix_number"
                  />
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={transactionDate}
                    onChange={(newValue) => setTransactionDate(newValue)}
                    format="LL"
                    className="w-[90%]"
                    maxDate={todaysDate}
                    sx={{ height: "50px" }}
                  />
                </LocalizationProvider>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Your GSTIN"
                  value={businessGst}
                />

                <Autocomplete
                  //options={states.map((item) => item.state_name)}
                  //   onChange={(event, newValue) => {
                  //     setSecondaryUnitValue(newValue);
                  //   }}

                  id="disable-close-on-select"
                  className=" w-[90%] border-slate-400"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="State Of Supply"
                      className="border p-2 rounded-lg"
                      size="small"
                      name="cust_state"
                      value="Haryana"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg border border-slate-300 mt-4">
            <div className="font-semibold text-slate-700 text-lg p-4 border-b border-slate-300">
              Items On The Invoice
            </div>
            <div>
              <div className="grid grid-cols-9 place-items-center border-b border-slate-300 bg-slate-50 py-3">
                <div>SNo.</div>
                <div>Items</div>
                <div>HSN/SAC</div>
                <div>Quantity | Unit</div>
                <div>Selling Price | Rate (Incl. Discount)</div>
                <div>Discount | Unit</div>
                <div>GST | Amount</div>
                <div>Amount</div>
                <div>Action</div>
              </div>
              <div className="h-[37vh] overflow-y-scroll">
                {invoiceItemList.map((item) => (
                  <div className="grid grid-cols-9 text-center border-b border-slate-300 hover:shadow hover:bg-slate-100">
                    <div className="border-r border-slate-300 p-4">{i++}</div>
                    <div className="border-r border-slate-300 p-4">
                      {item.sale_item_name}
                    </div>

                    <div className="border-r border-slate-300 p-4">
                      {item.sale_item_code ? item.sale_item_code : "-"}
                    </div>
                    <div className="border-r border-slate-300 p-4">
                      {item.sale_item_qty} | {item.sale_item_unit}
                    </div>
                    <div className="border-r border-slate-300 p-4">
                      {item.sale_item_price} |{" "}
                      {parseFloat(item.sale_item_disc_price).toFixed(2)}
                    </div>
                    {item.sale_item_disc_val ? (
                      <div className="border-r border-slate-300 p-4">
                        {item.sale_item_disc_val} |{" "}
                        {item.sale_item_disc_unit === "amount" ? "₹" : "%"}
                      </div>
                    ) : (
                      <div className="border-r border-slate-300 p-4">-</div>
                    )}

                    <div className="border-r border-slate-300 p-4">
                      {item.sale_item_gst &&
                      item.sale_item_gst !== null &&
                      item.sale_item_gst !== "-"
                        ? item.sale_item_gst +
                          "% |" +
                          parseFloat(item.sale_item_gst_amt).toFixed(2)
                        : "-"}
                    </div>
                    <div className="border-r border-slate-300 p-4">
                      ₹
                      {(
                        parseInt(item.sale_item_qty) *
                        (parseFloat(item.sale_item_disc_price) +
                          parseFloat(
                            item.sale_item_gst_amt
                              ? item.sale_item_gst_amt
                              : 0
                          ))
                      ).toFixed(2)}
                    </div>
                    <div className="grid place-items-center">
                      <div className="border border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-lg transition-all ease-in-out w-10">
                        <button
                          onClick={() => removeItem(item.sale_tran_id)}
                        >
                          
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-xl border border-slate-300 p-5 mt-4 flex justify-between">
            
            <div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={amtPayMethod}
                  onChange={handlePayStatus}
                >
                  
                  <FormControlLabel
                    
                    value="online"
                    checked = {amtPayMethod === "online" || amtPayMethod === "" ? true : false}
                    control={<Radio  />}
                    label="Online"
                  />
                  <FormControlLabel
                  checked = {amtPayMethod === "cash" ? true : false}
                    value="cash"
                    control={<Radio />}
                    label="Cash"
                  />
                </RadioGroup>
              </FormControl>
            </div>

           

            <div className="flex gap-2 text-lg font-semibold text-slate-600">
              <div>Balance Due :</div>
              <div>
                ₹{saleDataById.sale_amt - totalAmtPaid}
              </div>
            </div>
            <div className="flex gap-2 text-lg">
              <div className="font-semibold">Total Amount :</div>
              <div>
                {saleDataById.sale_amt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SalesReturn;
