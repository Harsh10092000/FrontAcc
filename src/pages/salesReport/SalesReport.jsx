import * as React from "react";
import {
  IconCash,
  IconFileTypePdf,
  IconScale,
  IconShoppingCart,
  IconStack2,
} from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/report/sideBar/SideBar";
import SalesRepTran from "../../components/report/salesRepTran/SalesRepTran";
import { useEffect, useState , useContext } from "react";
import axios from "axios";
import { ExportToExcel } from "../../components/report/excelDownload/ExcelDownload";
import { Box, Drawer } from "@mui/material";
import SalesPDF from "../../components/report/salesPdf/SalesPDF";
import { UserContext } from "../../context/UserIdContext";
  
    
const SalesReport = () => {
  const {accountId} = useContext(UserContext);
  const [state, setState] = useState({
    pdf: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const today = new Date();
  const [sdate, setSdate] = useState(today.toISOString().slice(0, 10));
  const [edate, setEdate] = useState(today.toISOString().slice(0, 10));
  const [flag, setFlag] = useState(true);
  const [period, setPeriod] = useState("");
  const [data, setData] = useState([]);
  const month = new Date();
  month.setDate(month.getDate() - today.getDate());
  const [dateval, setDateVal] = useState(today);
  const [edateval, setEdateval] = useState(today);
  const year = new Date();
  year.setDate(year.getDate() - 365);
  const [sort, setSort] = useState("");
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/rep/fetchSale/${accountId}`)
      .then((res) => setData(res.data));
    if (period === "date") {
      setDateVal(new Date(sdate));
      setEdateval(new Date(edate));
      setFlag(false);
    } else if (period === "month") {
      setDateVal(month);
      setEdateval(today);
      setFlag(true);
    } else if (period === "year") {
      setFlag(true);
      setDateVal(year);
      setEdateval(today);
    }
  }, [period, sdate, edate]);
  const net = data
    .filter(
      (item) =>
        new Date(item.sale_date) > dateval &&
        new Date(item.sale_date) < edateval
    )
    .reduce(function (prev, current) {
      return prev + +current.sale_amt;
    }, 0);
  const due = data
    .filter(
      (item) =>
        new Date(item.sale_date) > dateval &&
        new Date(item.sale_date) < edateval
    )
    .reduce(function (prev, current) {
      return prev + +current.sale_amt_due;
    }, 0);
  if (sort === "recent") {
    data.sort(function (a, b) {
      return b.sale_id - a.sale_id;
    });
  } else if (sort === "high") {
    data.sort((a, b) => b.sale_amt - a.sale_amt);
  } else if (sort === "low") {
    data.sort((a, b) => a.sale_amt - b.sale_amt);
  } else if (sort === "old") {
    data.sort((a, b) => a.sale_id - b.sale_id);
  }
  const list = (anchor) => (
    <Box role="presentation">
      {anchor === "pdf" ? (
        <Box sx={{ width: 950 }}>
          <SalesPDF
            data={data.filter(
              (item) =>
                new Date(item.sale_date) > dateval &&
                new Date(item.sale_date) < edateval
            )}
            pay={net}
            receive={due}
          />
        </Box>
      ) : (
        "-"
      )}
    </Box>
  );
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["pdf"]}
        onClose={toggleDrawer("pdf", false)}
      >
        {list("pdf")}
      </Drawer>
      <div>
        <Navbar />
        <div className="flex">
          <SideBar />
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex items-center gap-4 p-4">
                <div className="bg-blue-200/50 text-blue-500 p-4 rounded">
                  <IconShoppingCart />
                </div>
                <span className="text-xl">Sales Report</span>
              </div>
              <div className="flex gap-2 p-6">
                <button
                  className="flex items-center gap-2 p-2 rounded bg-slate-100 hover:bg-rose-400 hover:text-white"
                  onClick={toggleDrawer("pdf", true)}
                >
                  <IconFileTypePdf />
                  View PDF
                </button>
                <ExportToExcel
                  apiData={data.filter(
                    (item) =>
                      new Date(item.sale_date) > dateval &&
                      new Date(item.sale_date) < edateval
                  )}
                  fileName={"Sales"}
                />
              </div>
            </div>
            <div className="content mx-4 rounded-2xl bg-slate-100 h-[81vh] p-4 flex flex-col gap-4">
              <div className="card bg-white p-4 rounded-lg flex gap-6">
                <div className="period">
                  <div>Period</div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    onChange={(e) => setPeriod(e.target.value)}
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="date">Custom Date</option>
                  </select>
                </div>
                <div className="start">
                  <div>Start</div>
                  <input
                    type="date"
                    className="border p-2 border-slate-300 rounded-lg"
                    value={sdate}
                    onChange={(e) => setSdate(e.target.value)}
                    max={today.toISOString().split("T")[0]}
                    disabled={flag}
                  />
                </div>
                <div className="end">
                  <div>End</div>
                  <input
                    type="date"
                    className="border p-2 border-slate-300 rounded-lg"
                    value={edate}
                    onChange={(e) => setEdate(e.target.value)}
                    min={sdate}
                    max={today.toISOString().split("T")[0]}
                    disabled={flag}
                  />
                </div>
                <div className="sort">
                  <div>Sort By</div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    defaultValue={""}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="recent">Most Recent</option>
                    <option value="old">Oldest</option>
                    <option value="high">Highest Amount</option>
                    <option value="low">Lowest Amount</option>
                  </select>
                </div>
              </div>
              <div className="card bg-white p-4 rounded-lg flex flex-col gap-6">
                <div className="flex gap-10">
                  <div className="stat flex rounded-lg bg-blue-200/50 w-60 h-24 p-5 items-center justify-between text-slate-700">
                    <div>
                      <div className="text-2xl font-semibold">
                        {
                          data.filter(
                            (item) =>
                              new Date(item.sale_date) > dateval &&
                              new Date(item.sale_date) < edateval
                          ).length
                        }
                      </div>
                      <div className="font-semibold text-slate-500">
                        Transactions
                      </div>
                    </div>
                    <div>
                      <IconStack2 className="w-10 h-10" />
                    </div>
                  </div>
                  <div className="stat flex rounded-lg bg-blue-200/30 w-60 h-24 p-5 items-center justify-between text-slate-700">
                    <div>
                      <div className="text-2xl font-semibold">
                        ₹ {net.toFixed(2)}
                      </div>
                      <div className="font-semibold text-slate-500">
                        Net Sales
                      </div>
                    </div>
                    <div>
                      <IconCash className="w-10 h-10" />
                    </div>
                  </div>
                  <div className="stat flex rounded-lg bg-blue-200/30 w-60 h-24 p-5 items-center justify-between text-slate-700">
                    <div>
                      <div className="text-2xl font-semibold">
                        ₹ {due.toFixed(2)}
                      </div>
                      <div className="font-semibold text-slate-500">
                        TOTAL BALANCE
                      </div>
                    </div>
                    <div>
                      <IconScale className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-white rounded-lg">
                <div className="grid grid-cols-7 place-items-center border-b border-slate-300 bg-slate-50 py-3">
                  <div>Date</div>
                  <div>Invoice</div>
                  <div>Party Name</div>
                  <div>Transactions</div>
                  <div>Payment</div>
                  <div>Amount</div>
                  <div>Balance</div>
                </div>
                <div className="h-[48vh] overflow-y-scroll">
                  {data
                    .filter(
                      (item) =>
                        new Date(item.sale_date) > dateval &&
                        new Date(item.sale_date) < edateval
                    )
                    .map((item, index) => (
                      <SalesRepTran data={item} key={index} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SalesReport;
