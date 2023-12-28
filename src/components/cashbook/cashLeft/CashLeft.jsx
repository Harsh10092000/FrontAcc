import { IconChecklist } from "@tabler/icons-react";
import "./cashleft.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CashTran from "../cashTran/CashTran";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const CashLeft = (props) => {
  const { change, accountId } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/cash/fetchDate/${filteredDate}/${accountId}`)
      .then((res) => {
        setData(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/cash/fetchData/${accountId}`)
      .then((res) => {
        setInfo(res.data);
      });
  }, [change, transactionDate]);

  const sum_pay = data.reduce(function (prev, current) {
    return prev + +current.cash_pay;
  }, 0);
  const sum_receive = data.reduce(function (prev, current) {
    return prev + +current.cash_receive;
  }, 0);
  const todaysBalance = sum_pay - sum_receive;
  const total_pay = info.reduce(function (prev, current) {
    return prev + +current.cash_pay;
  }, 0);
  const total_receive = info.reduce(function (prev, current) {
    return prev + +current.cash_receive;
  }, 0);
  const totalBalance = total_pay - total_receive;

  return (
    <div className="cashleft">
      <div className="text-xl font-semibold p-5 border-b border-gray-300 text-blue-600">
        CashBook
      </div>
      <div className="flex justify-between p-5 border-b border-gray-300 balance">
        <div className="text-gray-500 flex gap-1 items-center">
          Total Balance &nbsp;
          <span
            className={
              totalBalance < 0
                ? "text-red-500 font-bold"
                : "text-green-500 font-bold"
            }
          >
            ₹
            {totalBalance < 0
              ? totalBalance.toFixed(2) * -1 + " Pay"
              : totalBalance.toFixed(2) + " Receive"}
          </span>
        </div>
        <div className="text-gray-500 flex gap-1 items-center">
          Today's Balance &nbsp;
          <span
            className={
              todaysBalance < 0
                ? "text-red-500 font-bold text-md"
                : "text-green-500 font-bold text-md"
            }
          >
            ₹
            {todaysBalance < 0
              ? todaysBalance.toFixed(2) * -1 + " Pay"
              : todaysBalance.toFixed(2) + " Receive"}
          </span>
        </div>
        <button className="flex gap-1 items-end report rounded-md p-2 text-blue-600 hover:text-white hover:bg-blue-600">
          <IconChecklist className="w-5 h-5" /> View Report
        </button>
      </div>
      <div className="date flex justify-between items-center p-5 px-6 border-b border-gray-300">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Date"
              value={todaysDate}
              format="LL"
              maxDate={todaysDate}
              onChange={(newValue) => setTransactionDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div className="line"></div>
        <FormControl className="w-[30%]">
          <InputLabel id="demo-simple-select-label">All</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="All"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="headings border-b border-gray-200">
        <div className="grid grid-cols-3 py-2 px-5 grid-rows-2 gap-y-1">
          <div className="text-slate-600 font-semibold">Name</div>
          <div className="text-slate-600 justify-self-end font-semibold">
            Out
          </div>
          <div className="text-slate-600 justify-self-end font-semibold">
            In
          </div>
          <div className="double">
            <div className="date text-slate-700 font-semibold">
              {filteredDate}
            </div>
            <div className="text-slate-500 font-semibold">
              {data.length} Entries
            </div>
          </div>
          <div className="text-red-600 justify-self-end font-semibold">
            ₹ {sum_pay.toFixed(2)}
          </div>
          <div className="text-green-600 justify-self-end font-semibold">
            ₹ {sum_receive.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="transactions">
        {age === ""
          ? data.map((item, index) => <CashTran key={index} data={item} />)
          : data
              .filter((persons) => persons.cash_mode === age)
              .map((item, index) => <CashTran key={index} data={item} />)}
      </div>
      <div className="outin flex p-3 gap-4">
        <button
          className="w-full p-2 rounded-xl bg-red-100 text-red-600 hover:text-white hover:bg-red-600"
          onClick={props.out}
        >
          Pay
        </button>
        <button
          className="bg-green-100 w-full p-2 rounded-xl text-green-600 hover:text-white hover:bg-green-600"
          onClick={props.in}
        >
          Receive
        </button>
      </div>
    </div>
  );
};

export default CashLeft;
