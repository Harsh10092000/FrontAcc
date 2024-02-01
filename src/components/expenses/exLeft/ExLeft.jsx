import { IconSearch } from "@tabler/icons-react";
import "./exleft.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ExTran from "../exTran/ExTran";
import { UserContext } from "../../../context/UserIdContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const ExLeft = (props) => {
  const { change, expId, accountId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/exp/fetchExpensesData/${accountId}`
      )
      .then((response) => {
        setResult(response.data);
      });
  }, [change, expId, accountId]);

  const [sortOption, setSortOption] = useState("latestFirst");
  const [filterByValue, setFilterByValue] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  let sortedUsers = [...result];

  if (sortOption === "latestFirst") {
    sortedUsers.sort((a, b) => b.exp_id - a.exp_id);
  } else if (sortOption === "oldestFirst") {
    sortedUsers.sort((a, b) => a.exp_id - b.exp_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.exp_total - a.exp_total);
  } else if (sortOption === "lowestAmount") {
    sortedUsers.sort((a, b) => a.exp_total - b.exp_total);
  }

  let categories = [...new Set(result.map((item) => item.exp_category))];

  return (
    <div className="exleft">
      <div className="border-b border-slate-300 p-4 font-semibold text-blue-600 text-xl">
        Expenses
      </div>
      <div className="flex items-center justify-between p-4 border-b border-slate-300">
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
              label="Sort By"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
              }}
            >
              <MenuItem value="latestFirst">Latest First</MenuItem>
              <MenuItem value="oldestFirst">Oldest First</MenuItem>
              <MenuItem value="highestAmount">Highest Amount</MenuItem>
              <MenuItem value="lowestAmount">Lowest Amount</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter2">
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-select-small-label">Filter By</InputLabel>

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Filter By"
              value={filterByValue}
              onChange={(e) => setFilterByValue(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map((item) => (
                <MenuItem value={item} label={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex justify-between p-3 border-b border-slate-300 bg-slate-100 text-slate-600 font-semibold">
        <div className="name">Name</div>
        <div className="amount">Amount</div>
      </div>

      <div className="transactions border-b border-slate-300">
        {sortedUsers

          .filter((code) => {
            if (filterByValue !== "All") {
              return code.exp_category === filterByValue;
            } else {
              return code;
            }
          })
          .filter((code) =>
            code.exp_category
              .toLowerCase()
              .startsWith(searchValue.toLowerCase())
          )
          .map((filteredItem, index) => (
            <ExTran key={index} data={filteredItem} />
          ))}
      </div>
      <div className="expbtn px-6 py-4">
        <button
          className="rounded-lg p-2 w-full shadow shadow-emerald-600 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all ease-in-out duration-300"
          onClick={props.add}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExLeft;
