import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import SaleTran from "../saleTran/SaleTran";
import "./saleleft.scss";
import { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
const SaleLeft = (props) => {
  const { change } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [tran, setTran] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/sale/fetchData").then((response) => {
      setResult(response.data);
    });
  }, [change]);

  console.log("result : ", result);

  const total_amt = result
    
    .reduce((acc, current) => {
      return acc + +current.sale_amt
    }, 0);

  const [sortOption, setSortOption] = useState("");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...result];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.sale_id - a.sale_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.sale_amt - a.sale_amt);
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.sale_name.localeCompare(b.sale_name));
  }

  return (
    <div className="left bg-white shadow-lg w-full flex flex-col h-full">
      <div className="heading text-xl font-semibold">
        Sales
        <p className=" text-sky-600 num font-semibold">{result.length}</p>
      </div>
      <div className="giveget flex justify-between">
        <div className="give text-gray-500 flex gap-1 items-center">
          Sales :<span className="text-gray-700 font-bold">₹ {total_amt}</span>
          <IconArrowUpRight className="text-red-600" />
        </div>

        <button className="flex gap-1 " onClick={props.add}>
          <IconPlus className="w-5" />
          Add Sale
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
        <div className="name">Transaction</div>
        <div className="amount">Amount</div>
      </div>
      <div className="cards">
        {sortedUsers

          // .filter((code) => {
          //   if (filter2 === "pay") {
          //     return code.amt_type === "receive";
          //   } else if (filter2 === "receive") {
          //     return code.amt_type === "pay";
          //   } else if (filter2 === "All") {
          //     return true;
          //   }
          // })
          .filter((code) =>
            code.sale_name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          .map((filteredItem, index) => (
            <SaleTran
              key={index}
              result={tran}
              click={props.click}
              data={filteredItem}
            />
          ))}
      </div>
    </div>
  );
};

export default SaleLeft;
