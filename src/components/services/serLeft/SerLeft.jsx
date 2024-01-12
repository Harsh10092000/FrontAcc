import "./serleft.scss";
import { useLocation, Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import SerCard from "../serCard/SerCard";
import products from "../../../pages/products/productsdata";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const SerLeft = (props) => {
  const { change, accountId } = useContext(UserContext);
  const [filterByValue, setFilterByValue] = useState("All");

  const location = useLocation();

  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);
  const [serTranData, setSerTranData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchData/${accountId}`)
      .then((res) => {
        setResult(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchSerTranData`)
      .then((res) => {
        setSerTranData(res.data);
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData/${accountId}`
      )
      .then((response) => {
        setData(response.data);
      });
  }, [change]);

  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const [sortOption, setSortOption] = useState("recent");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  console.log("sortOption : ", sortOption);
  let sortedUsers = [...result];
  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.ser_id - a.ser_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.ser_price - a.ser_price);
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.ser_name.localeCompare(b.ser_name));
  } else if (sortOption === "salesPriceHighToLow") {
    sortedUsers.sort((a, b) => b.ser_price - a.ser_price);
  } else if (sortOption === "salesPriceLowToHigh") {
    sortedUsers.sort((a, b) => a.ser_price - b.ser_price);
  }

  return (
    <div className="serleft">
      <div className="heading text-lg font-semibold">
        <Link to="/products">
          <div
            className={
              location.pathname === "/products"
                ? "flex gap-2 sets activate cursor-pointer"
                : "flex gap-2 sets cursor-pointer"
            }
          >
            Products
            <p className=" text-sky-600 num font-semibold">{data.length}</p>
          </div>
        </Link>
        <div
          className={
            location.pathname === "/services"
              ? "flex gap-2 sets activate cursor-pointer"
              : "flex gap-2 sets cursor-pointer"
          }
        >
          Services
          <p className=" text-sky-600 num font-semibold">{result.length}</p>
        </div>
      </div>
      <div className="filters flex items-center justify-between">
        <div className="searchbar1 flex h-10 rounded p-1 w-72 items-center gap-2 border border-slate-400 hover:border-black">
          <IconSearch className="text-slate-500" />
          <input
            type="text"
            className="focus:outline-none p-1 w-56"
            placeholder="Search By Product Name"
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
              //value={filter}
              label="Sort By"
              onChange={handleChange1}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="highestAmount">Highest Amount</MenuItem>
              <MenuItem value="name">By Name</MenuItem>
              <MenuItem value="salesPriceHighToLow">
                Sales Price High - Low
              </MenuItem>
              <MenuItem value="salesPriceLowToHigh">
                Sales Price Low - High
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter2">
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-select-small-label">Filter By</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              //value={age}
              label="Filter By"
              onChange={(e) => setFilterByValue(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="lowSales">Low Sales</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button
          className="flex gap-1 cursor-pointer items-center p-2 shadow shadow-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500"
          onClick={props.add}
        >
          <IconPlus /> Add Service
        </button>
      </div>
      <div className="heading1">
        <div className="pname text-slate-600">Service Name</div>
        <div className="sprice text-slate-600">Sales Price</div>
        <div className="qty text-slate-600">No. Of Sales</div>
      </div>

      <div className="cards">
        {sortedUsers

          .filter((code) => {
            if (filterByValue === "lowSales") {
              return code.ser_sales === null;
            } else if (filterByValue === "All") {
              return true;
            }
          })
          .filter((code) =>
            code.ser_name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          .map((filteredItem, index) => {
            const sum = serTranData
              .filter(
                (item) =>
                  parseInt(item.sale_cnct_id) === parseInt(filteredItem.ser_id)
              )
              .reduce(function (prev, current) {
                if (current.ser_quantity) {
                  return prev + +current.ser_quantity;
                } else {
                  return prev - +current.ser_return;
                }
              }, 0);
            return <SerCard key={index} data={filteredItem} totalSales={sum} />;
          })}
      </div>
    </div>
  );
};

export default SerLeft;
