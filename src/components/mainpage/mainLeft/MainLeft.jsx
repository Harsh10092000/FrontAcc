import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import CardItem from "../cardItem/CardItem";
import "./mainleft.scss";
import { useContext, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const MainLeft = (props) => {
  const { change, accountId, parties } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [tran, setTran] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetch/${accountId}`)
      .then((response) => {
        setResult(response.data);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/auth/fetchAll")
      .then((response) => {
        setTran(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchTotal/${accountId}`)
      .then((response) => {
        setTotal(response.data);
      });

  }, [accountId, change]);
  // const sum = result
  //   .filter((person) => person.amt_type === "pay")
  //   .reduce(function (prev, current) {
  //     return prev + +current.cust_amt;
  //   }, 0);
  // const sum1 = result
  //   .filter((person) => person.amt_type === "receive")
  //   .reduce(function (prev, current) {
  //     return prev + +current.cust_amt;
  //   }, 0);

  // const pay = tran.reduce(function (prev, current) {
  //   return prev + +current.tran_pay;
  // }, 0);
  // const receive = tran.reduce(function (prev, current) {
  //   return prev + +current.tran_receive;
  // }, 0);

  // const total_pay = sum + pay;
  // const total_receive = sum1 + receive;
  const [sortOption, setSortOption] = useState("recent");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...result];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.cust_id - a.cust_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.cust_amt - a.cust_amt);
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.cust_name.localeCompare(b.cust_name));
  }



  return (
    <div className="left bg-white shadow-lg w-full flex flex-col h-full">
      <div className="heading text-xl font-semibold">
        Customers
        <p className=" text-sky-600 num font-semibold">{result.length}</p>
      </div>
      <div className="giveget flex justify-between">
        <div className="give text-gray-500 flex gap-1 items-center">
          Total Paid :
          <span className="text-gray-700 font-bold">
          ₹ {total.length > 0 && total[0].payTotal !== null ? 
             parseFloat(total[0].payTotal).toFixed(2) : 0
            }
          </span>
         
          <IconArrowUpRight className="text-red-600" />
        </div>
        <div className="give text-gray-500 flex gap-1 items-center">
          Total Recieved:
          <span className="text-gray-700 font-bold">
            ₹ {total.length > 0 && total[0].receiveTotal !== null ? parseFloat(total[0].receiveTotal).toFixed(2) : 0}
          </span>
          {console.log("total[0].receiveTotal : " , total)}
          <IconArrowDownLeft className="text-green-600" />
        </div>
        <button
          className={
            parties === 1
              ? " hover:!bg-slate-200 !border-none flex gap-1 cursor-not-allowed !text-slate-400 bg-slate-200 rounded"
              : "flex gap-1 cursor-pointer"
          }
          onClick={props.add}
          disabled={parties === 1 ? true : false}
        >
          <IconPlus className="w-5" />
          Add Customer
        </button>
      </div>
      <div className="filters flex items-center justify-between">
        <div className="searchbar1 flex h-10 rounded p-1 w-72 items-center gap-2 border border-slate-400 hover:border-black">
          <IconSearch className="text-slate-500" />
          <input
            type="text"
            className="focus:outline-none p-1 w-56"
            placeholder="Name Or Phone Number"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className="filter1">
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-select-small-label">
              <div className="flex gap-3">Sort By</div>
            </InputLabel>

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortOption}
              label="Sort By"
              onChange={handleChange1}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="highestAmount">Highest Amount</MenuItem>
              <MenuItem value="name">By Name</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter2">
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-select-small-label">Filter By</InputLabel>

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filter2}
              label="Filter By"
              onChange={(e) => {
                setFilter2(e.target.value);
              }}
            >
              <MenuItem value={filter2}>{/* <em>None</em>  */}</MenuItem>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="pay">Receive</MenuItem>
              <MenuItem value="receive">Pay</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="heading1">
        <div className="name">Name</div>
        <div className="amount">Amount</div>
      </div>
      <div className="cards">
        {skeleton ? (
          <div className={"cardItem cursor-pointer"}>
            <div
              className="flex justify-between  items-center p-3"
              style={{ borderBottom: "1px solid rgb(245 245 245" }}
            >
              <div className="flex items-center gap-2">
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  animation={"wave"}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-lg text-slate-700">
                    <Skeleton variant="rectangular" width={80} height={15} />
                  </span>
                  <span className="text-slate-500 text-sm">
                    <Skeleton variant="rectangular" width={80} height={15} />
                  </span>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-end gap-1">
                  <div className={"font-semibold text-lg"}>
                    <Skeleton variant="rectangular" width={50} height={20} />
                  </div>
                  <div className="text-slate-700 text-xs">
                    <Skeleton variant="rectangular" width={30} height={10} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          sortedUsers

            .filter((code) => {
              if (filter2 === "pay") {
                return code.cust_total_amt < 0;
              } else if (filter2 === "receive") {
                return code.cust_total_amt > 0;
              } else if (filter2 === "All") {
                return true;
              }
            })
            .filter(
              (code) =>
                code.cust_number.startsWith(searchValue) ||
                code.cust_name
                  .toLowerCase()
                  .startsWith(searchValue.toLowerCase())
            )
            .map((filteredItem, index) => (
              <CardItem
                key={index}
                result={tran}
                click={props.click}
                users={filteredItem}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default MainLeft;
