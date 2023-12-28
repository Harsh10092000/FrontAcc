import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PurchaseTran from "../../components/purchaseForm/purchaseTran/PurchaseTran";

const PurchaseForm = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  return (
    <div className="purchaseform">
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
            <div className="text-md font-semibold">Create Purchase</div>
          </div>
          <div className="flex items-center font-semibold gap-8">
            <div className="flex items-center">
              GST Registered Business ?
              <Switch defaultChecked />
            </div>
            <button
              className="p-2 rounded text-green-600 hover:bg-green-600 hover:text-white"
              style={{
                border: "1px solid #109E5B",
                transition: "all 400ms ease-in-out",
              }}
            >
              Create Purchase
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
              />

              <input
                type="text"
                className="border p-2 rounded-lg w-[90%] border-slate-400"
                placeholder="Phone Number"
              />
              <div>
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[90%] border-slate-400"
                  placeholder="Address (Optional)"
                />
              </div>
              <input
                type="text"
                className="border p-2 rounded-lg w-[90%] border-slate-400"
                placeholder="GSTIN (Optional)"
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
                />
                <input
                  type="text"
                  className="border p-2 rounded-lg w-[32%] border-slate-400 h-[90%]"
                  placeholder="Invoice Number"
                  name="prefix_number"
                />
              </div>
              <div className=" absolute z-10 bg-white"></div>

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
              />

              <Autocomplete
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
              <div>Purchase Price | Rate (Incl. Discount)</div>
              <div>Discount | Unit</div>
              <div>GST | Amount</div>
              <div>Amount</div>
              <div>Action</div>
            </div>
            <div className="h-[35vh] overflow-y-scroll">
              <PurchaseTran />
            </div>
            <div className="w-full bg-white rounded-xl border border-slate-300 p-5 mt-4 flex justify-between">
              <button
                className="flex items-center gap-1 p-2 rounded-md text-blue-700 hover:bg-blue-600 hover:text-white"
                style={{
                  border: "1px solid #2563eb",
                  transition: "all 400ms ease-in-out",
                }}
              >
                <IconPlus className="w-5 h-5" />
                Add Items from Inventory
              </button>
              <div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="unpaid"
                      control={<Radio />}
                      label="unpaid"
                    />
                    <FormControlLabel
                      value="online"
                      control={<Radio />}
                      label="Online"
                    />
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Cash"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                <div>
                  <input
                    type="text"
                    className="border p-2 rounded-lg w-[90%] border-slate-400"
                    placeholder="Amount Paid (₹)"
                  />
                </div>
              </div>
              <div className="flex gap-2 text-lg font-semibold text-slate-600">
                <div>Balance Due :</div>
                <div>₹ 0</div>
              </div>
              <div className="flex gap-2 text-lg">
                <div className="font-semibold">Total Amount :</div>
                <div>₹ 5000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
