import "./supleft.scss";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SupCard from "../supCard/SupCard";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const SupLeft = (props) => {
  const { change, accountId, parties } = useContext(UserContext);
  const [age, setAge] = useState("");
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  const [data, setData] = useState([]);
  const [tran, setTran] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const [total, setTotal] = useState([]);

  console.log("account id : " , accountId)

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchData/${accountId}`)
      .then((response) => {
        setData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/sup/fetchAll")
      .then((response) => {
        setTran(response.data);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchTotal/${accountId}`)
      .then((response) => {
        setTotal(response.data);
      });
  }, [change, accountId]);
  const sum = data
    .filter((person) => person.sup_amt_type === "pay")
    .reduce(function (prev, current) {
      return prev + +current.sup_amt;
    }, 0);
  const sum1 = data
    .filter((person) => person.sup_amt_type === "receive")
    .reduce(function (prev, current) {
      return prev + +current.sup_amt;
    }, 0);
  const pay = tran.reduce(function (prev, current) {
    return prev + +current.sup_tran_pay;
  }, 0);
  const receive = tran.reduce(function (prev, current) {
    return prev + +current.sup_tran_receive;
  }, 0);
  const total_pay = sum + pay;
  const total_receive = sum1 + receive;

  const [sortOption, setSortOption] = useState("recent");

  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...data];

  
  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.sup_id - a.sup_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => (b.sup_total_amt < 0 ? b.sup_total_amt * -1 : b.sup_total_amt) - (a.sup_total_amt < 0 ? a.sup_total_amt * -1 : a.sup_total_amt) );
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.sup_name.localeCompare(b.sup_name));
  }

  return (
    <div className="supleft">
      <div className="heading text-xl font-semibold">
        Suppliers
        <p className=" text-sky-600 num font-semibold">{data.length}</p>
      </div>
      <div className="giveget flex justify-between">
        <div className="give text-gray-500 flex gap-1 items-center">
          You'll Give :
          <span className="text-gray-700 font-bold">
            ₹
            {total.length > 0 && total[0].payTotal !== null
              ? parseFloat(total[0].payTotal).toFixed(2)
              : 0}
          </span>
          <IconArrowUpRight className="text-red-600" />
        </div>
        <div className="give text-gray-500 flex gap-1 items-center">
          You'll Get:
          <span className="text-gray-700 font-bold">
            ₹
            {total.length && total[0].receiveTotal !== null
              ? parseFloat(total[0].receiveTotal).toFixed(2)
              : 0}
          </span>
          <IconArrowDownLeft className="text-green-600" />
        </div>
        <button
          className="flex gap-1 cursor-pointer items-center p-2 shadow shadow-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500"
          onClick={props.add}
          disabled={parties === 2 || parties === 3 ? false : true}
        >
          <IconPlus className="w-5" />
          Add Supplier
        </button>
      </div>
      <div className="filters flex items-center justify-between">
        <div className="searchbar1 flex h-10 rounded p-1 w-72 items-center gap-2 border border-slate-400 hover:border-black">
          <IconSearch className="text-slate-500" />
          <input
            type="text"
            className="focus:outline-none p-1 w-56"
            placeholder="Name Or Phone Number"
            onChange={(e) => setSearchValue(e.target.value)}
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
                return code.sup_total_amt < 0;
              } else if (filter2 === "receive") {
                return code.sup_total_amt > 0;
              } else if (filter2 === "All") {
                return true;
              }
            })
            .filter(
              (code) =>
                code.sup_number.startsWith(searchValue) ||
                code.sup_name
                  .toLowerCase()
                  .startsWith(searchValue.toLowerCase())
            )
            .map((filteredItem, index) => (
              <SupCard key={index} tran={tran} data={filteredItem} />
            ))
        )}
      </div>
    </div>
  );
};

export default SupLeft;
