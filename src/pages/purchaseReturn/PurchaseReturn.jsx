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
import { useSnackbar } from "notistack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const PurchaseReturn = () => {
  const { change, changeChange, accountId, purchaseId } =
    useContext(UserContext);

  const [supplierData, setSupplierData] = useState([]);
  const [businessGst, setBusinessGst] = useState("");
  const [purchaseData, setPurchaseData] = useState([]);
  const [purchaseDataById, setPurchaseDataById] = useState([]);
  const [invoiceItemList, setInvoiceItemList] = useState([]);
  const [purReturnPrefixNo, setPurReturnPrefixNo] = useState(0);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchaseTran/${purchaseId}`
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
          `/api/purchase/fetchPurchaseReturnPrefixData/${accountId}`
      )
      .then((response) => {
        setPurReturnPrefixNo(response.data[0].purchase_re_prefix_no);
      });
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
          purchase_id: response.data[0].purchase_id,
          purchase_date: response.data[0].purchase_date,
          purchase_name: response.data[0].purchase_name,
          purchase_prefix: response.data[0].purchase_prefix,
          purchase_prefix_no: response.data[0].purchase_prefix_no,
          purchase_amt: response.data[0].purchase_amt,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt_paid: response.data[0].purchase_amt_paid,
          purchase_amt_due: response.data[0].purchase_amt_due,
          purchase_amt_type: response.data[0].purchase_amt_type,
        });
        //setAmtPayMethod(response.data[0].purchase_amt_type);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/sup/fetchSup/${purchaseDataById.sup_cnct_id}`
      )
      .then((response) => {
        setSupplierData({
          ...supplierData,
          sup_name: response.data[0].sup_name,
          sup_number: response.data[0].sup_number,
          sup_gstin: response.data[0].sup_gstin,
          sup_sflat: response.data[0].sup_sflat,
          sup_sarea: response.data[0].sup_sarea,
          sup_spin: response.data[0].sup_spin,
          sup_scity: response.data[0].sup_scity,
          sup_sstate: response.data[0].sup_sstate,
        });
      });
  }, [purchaseDataById]);

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

  const [nerArr, setNerArr] = useState([]);



  useEffect(() => {
    setNerArr((prevNerArr) => prevNerArr.filter((item) => item.item_qty !== 0));
  }, [nerArr]);

  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  const [amtPayMethod, setAmtPayMethod] = useState("");
  const handlePayStatus = (event) => {
    setAmtPayMethod(event.target.value);
  };

  //const [amountPaid, setAmountPaid] = useState(0);

  const navigate = useNavigate();

  const [purchaseReturn, setPurchaseReturn] = useState({
    purchase_prefix: purchaseDataById.purchase_prefix,
    purchase_prefix_no: purchaseDataById.purchase_prefix_no,
    sup_cnct_id: purchaseDataById.sup_cnct_id,
    purchase_date: filteredDate,
    purchase_name: purchaseDataById.purchase_name,
    purchase_refund_amt: purchaseDataById.purchase_amt,
    invoiceItemsList: invoiceItemList,
    purchase_amt_type: "",
    purchase_desc: "PAYMENT IN",
    purchase_re_prefix: "PaymentReturn",
    purchase_re_prefix_no: "",
    purchase_id: purchaseDataById.purchase_id,
    purchase_acc_id: accountId,
  });

  (purchaseReturn.purchase_prefix = purchaseDataById.purchase_prefix),
    (purchaseReturn.purchase_prefix_no = purchaseDataById.purchase_prefix_no),
    (purchaseReturn.sup_cnct_id = purchaseDataById.sup_cnct_id),
    (purchaseReturn.purchase_date = filteredDate),
    (purchaseReturn.purchase_name = purchaseDataById.purchase_name),
    (purchaseReturn.purchase_refund_amt = purchaseDataById.purchase_amt),
    (purchaseReturn.purchase_id = purchaseDataById.purchase_id),
    (purchaseReturn.invoiceItemsList = invoiceItemList);
  if (purReturnPrefixNo === null) {
    purchaseReturn.purchase_re_prefix_no = 1;
  } else {
    purchaseReturn.purchase_re_prefix_no = parseInt(purReturnPrefixNo) + 1;
  }

  const [totalRefundAmt, setTotalRefundAmt] = useState(0);

  const removeItem = (id) => {
    setInvoiceItemList(
      invoiceItemList.filter((a) => a.purchase_tran_id !== id)
    );
  };

  useEffect(() => {
    setTotalRefundAmt(
      invoiceItemList.reduce(function (prev, current) {
        return (
          prev +
          +(
            parseInt(current.purchase_item_qty) *
            (parseFloat(current.purchase_item_disc_price) +
              parseFloat(
                current.purchase_item_gst_amt
                  ? current.purchase_item_gst_amt
                  : 0
              ))
          )
        );
      }, 0)
    );
  }, [invoiceItemList]);

  totalRefundAmt !== 0
    ? (purchaseReturn.purchase_refund_amt = totalRefundAmt)
    : (purchaseReturn.purchase_refund_amt = purchaseDataById.purchase_amt);

  console.log(
    "totalRefundAmt : ",
    purchaseReturn.purchase_refund_amt,
    totalRefundAmt
  );

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/purchase/returnPurchase",
        purchaseReturn
      );
      // changeChange();
      // props.snack();
      navigate("/purchase");
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

  const [submitDisabled, setSubmitDisabled] = useState(true);
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
      <div className="purchasesform">
        <Navbar />
        <div className="p-4 bg-slate-100 h-[90vh]">
          <div className="w-full bg-white rounded-lg border border-slate-300 p-2 flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <Link
                to="/purchase"
                className="rounded-full p-1 hover:bg-slate-200"
                style={{ transition: "all 400ms ease-in-out" }}
              >
                <IconArrowLeft />
              </Link>
              <div className="text-md font-semibold">
                Create purchase return
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
                Create purchase return
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
                  value={supplierData.sup_name}
                />

                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Phone Number"
                  value={supplierData.sup_number}
                />
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Address (Optional)"
                    value={
                      supplierData.sup_sflat +
                      ", " +
                      supplierData.sup_sarea +
                      ", " +
                      supplierData.sup_scity +
                      ", " +
                      supplierData.sup_sstate +
                      ", " +
                      supplierData.sup_spin
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="GSTIN (Optional)"
                  value={supplierData.sup_gstin}
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
                    value={purchaseDataById.purchase_prefix}
                  />
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[32%] border-slate-400 h-[90%]"
                    placeholder="Invoice Number"
                    value={purchaseDataById.purchase_prefix_no}
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
                      name="sup_state"
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
                      {item.purchase_item_name}
                    </div>

                    <div className="border-r border-slate-300 p-4">
                      {item.purchase_item_code ? item.purchase_item_code : "-"}
                    </div>
                    <div className="border-r border-slate-300 p-4">
                      {item.purchase_item_qty} | {item.purchase_item_unit}
                    </div>
                    <div className="border-r border-slate-300 p-4">
                      {item.purchase_item_price} |
                      {parseFloat(item.purchase_item_disc_price).toFixed(2)}
                    </div>
                    {item.purchase_item_disc_val ? (
                      <div className="border-r border-slate-300 p-4">
                        {item.purchase_item_disc_val} |
                        {item.purchase_item_disc_unit === "amount" ? "₹" : "%"}
                      </div>
                    ) : (
                      <div className="border-r border-slate-300 p-4">-</div>
                    )}

                    <div className="border-r border-slate-300 p-4">
                      {item.purchase_item_gst &&
                      item.purchase_item_gst !== null &&
                      item.purchase_item_gst !== "-"
                        ? item.purchase_item_gst +
                          "% |" +
                          parseFloat(item.purchase_item_gst_amt).toFixed(2)
                        : "-"}
                    </div>
                    <div className="border-r border-slate-300 p-4">
                      ₹
                      {(
                        parseInt(item.purchase_item_qty) *
                        (parseFloat(item.purchase_item_disc_price) +
                          parseFloat(
                            item.purchase_item_gst_amt
                              ? item.purchase_item_gst_amt
                              : 0
                          ))
                      ).toFixed(2)}
                    </div>
                    <div className="grid place-items-center">
                      <div className="border border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-lg transition-all ease-in-out w-10">
                        <button
                          onClick={() => removeItem(item.purchase_tran_id)}
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
                  {/* <FormControlLabel
                    value="unpaid"
                    control={<Radio />}
                    label="unpaid"
                  /> */}
                  <FormControlLabel
                    value="online"
                    checked = {amtPayMethod === "online" || amtPayMethod === "" ? true : false }
                    control={<Radio />}
                    label="Online"
                  />
                  <FormControlLabel
                  checked = {amtPayMethod === "cash" ? true : false }
                    value="cash"
                    control={<Radio />}
                    label="Cash"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {amtPayMethod !== "unpaid" ? (
              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Amount Paid (₹)"
                    //defaultValue={totalGrossValue}
                    // onChange={(e) =>
                    //   setAmountPaid(
                    //     e.target.value <= totalGrossValue ? e.target.value : 0
                    //   )
                    // }
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex gap-2 text-lg font-semibold text-slate-600">
              <div>Balance Due :</div>
              <div>₹ {purchaseDataById.purchase_amt - totalAmtPaid}</div>
            </div>
            <div className="flex gap-2 text-lg">
              <div className="font-semibold">Total Amount :</div>
              <div>{purchaseDataById.purchase_amt}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PurchaseReturn;
