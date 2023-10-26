import "./supleft.scss";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SupCard from "../supCard/SupCard";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const SupLeft = (props) => {
  const { change } = useContext(UserContext);
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [data, setData] = useState([]);
  const [tran, setTran] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/sup/fetchData").then((response) => {
      setData(response.data);
    });
    axios.get("http://localhost:8000/api/sup/fetchAll").then((response) => {
      setTran(response.data);
    });
  }, [change]);
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

  const [sortOption, setSortOption] = useState("");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...data];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.sup_id - a.sup_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.sup_amt - a.sup_amt);
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
          You'll Give :{" "}
          <span className="text-gray-700 font-bold">₹ {total_receive}</span>
          <IconArrowUpRight className="text-red-600" />
        </div>
        <div className="give text-gray-500 flex gap-1 items-center">
          You'll Get:{" "}
          <span className="text-gray-700 font-bold">₹ {total_pay}</span>
          <IconArrowDownLeft className="text-green-600" />
        </div>
        <button className="flex gap-1" onClick={props.add}>
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
              value={age}
              label="Filter By"
              onChange={(e) => {
                setFilter2(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="receive">Pay</MenuItem>
              <MenuItem value="pay">Receive</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="heading1">
        <div className="name">Name</div>
        <div className="amount">Amount</div>
      </div>
      <div className="cards">
        {sortedUsers

          .filter((code) => {
            if (filter2 === "pay") {
              return code.sup_amt_type === "receive";
            } else if (filter2 === "receive") {
              return code.sup_amt_type === "pay";
            } else if (filter2 === "All") {
              return true;
            }
          })
          .filter(
            (code) =>
              code.sup_number.startsWith(searchValue) ||
              code.sup_name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          .map((filteredItem, index) => (
            <SupCard key={index} tran={tran} data={filteredItem} />
          ))}
      </div>
    </div>
  );
};

export default SupLeft;
