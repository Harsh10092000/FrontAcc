import { IconArrowUpRight, IconPlus, IconSearch } from "@tabler/icons-react";
import SaleTran from "../saleTran/SaleTran";
import "./saleleft.scss";
import { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
import { Link } from "react-router-dom";
const SaleLeft = (props) => {
  const { change , accountId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [tran, setTran] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND + `/api/sale/fetchData/${accountId}`).then((response) => {
      setResult(response.data);
    });
  }, [change]);

  const total_amt = result.reduce((acc, current) => {
    return acc + +current.sale_amt;
  }, 0);

  const [sortOption, setSortOption] = useState("recent");
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
      <div className="flex justify-between p-5 border-b border-slate-300">
        <div className="give text-gray-500 flex gap-1 items-center">
          Sales :<span className="text-gray-700 font-bold">₹ {total_amt.toFixed(2)}</span>
          <IconArrowUpRight className="text-red-600" />
        </div>
        <Link to="/salesForm">
          <button
            className="flex gap-1 text-cyan-600 p-2 rounded hover:bg-cyan-600/90 hover:text-white"
            style={{
              border: "1px solid #0891b2",
              transition: "all 400ms ease-in-out",
            }}
          >
            <IconPlus className="w-5" />
            Add Sale
          </button>
        </Link>
      </div>
      <div className="filters flex items-center justify-between">
        <div className="searchbar1 flex h-10 rounded p-1 w-72 items-center gap-2 border border-slate-400 hover:border-black">
          <IconSearch className="text-slate-500" />
          <input
            type="text"
            className="focus:outline-none p-1 w-56"
            placeholder="Name Or Invoive Number"
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
          <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
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
              <MenuItem value={filter2}></MenuItem>
              {/* <MenuItem value="All">All</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="partial">Partially Paid</MenuItem>
              <MenuItem value="full">Fully Paid</MenuItem> */}
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="sale">Sale</MenuItem>
              <MenuItem value="payIn">Paymenet In</MenuItem>
              <MenuItem value="payRe">Paymenet Return</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="heading1">
        <div className="name">Transaction</div>
        <div className="amount">Amount</div>
      </div>
      <div className="cards2">
        {sortedUsers
          .filter((code) =>
            code.sale_prefix_no.toString().startsWith(searchValue) ||
            code.sale_name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          // .filter((code) => {
          //   if (filter2 === "unpaid") {
          //     return code.sale_amt_due === code.sale_amt;
          //   } else if (filter2 === "partial") {
          //     return code.sale_amt_due > "0" && code.sale_amt_due < code.sale_amt;
          //   } else if (filter2 === "full") {
          //     return code.sale_amt_due === "0";
          //   } else if (filter2 === "All") {
          //     return true;
          //   }
          // })
          .filter((code) => {
            if (filter2 === "sale") {
              
              return (
                code.sale_payment_in_id === null &&
                code.sale_re_id === null
              );
            } else if (filter2 === "payIn") {
              return code.sale_payment_in_id !== null;
            } else if (filter2 === "payRe") {
              return code.sale_re_id !== null;
            } else if (filter2 === "All") {
              return true;
            } 
          })
          .map((filteredItem, index) => (
            <SaleTran
              allTran={result}
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
