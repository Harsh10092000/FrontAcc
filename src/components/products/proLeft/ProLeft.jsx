import { IconPlus, IconSearch } from "@tabler/icons-react";
import "./proleft.scss";
import { useLocation, Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ProCard from "../proCard/ProCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const ProLeft = (props) => {
  const { change, pId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/fetchProductData")
      .then((response) => {
        setResult(response.data);
      });

    axios
      .get(`http://localhost:8000/api/auth/fetchTotalStockValue`)
      .then((response) => {
        setResult2(response.data);
      });
    axios.get("http://localhost:8000/api/ser/fetchData").then((res) => {
      setData(res.data);
    });
  }, [change]);

  const [sortOption, setSortOption] = useState("");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...result];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.product_id - a.product_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.sale_price - a.sale_price);
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.product_name.localeCompare(b.product_name));
  } else if (sortOption === "stockHighToLow") {
    sortedUsers.sort((a, b) => b.balance_stock  - a.balance_stock );
  }
  else if (sortOption === "stockLowToHigh") {
    sortedUsers.sort((a, b) => a.balance_stock  - b.balance_stock );
  }

  
  
  const location = useLocation();

  return (
    <div className="proleft">
      <div className="heading text-lg font-semibold">
        <div
          className={
            location.pathname === "/products"
              ? "flex gap-2 sets activate cursor-pointer"
              : "flex gap-2 sets cursor-pointer"
          }
        >
          Products
          <p className=" text-sky-600 num font-semibold">{result.length}</p>
        </div>
        <Link to="/services">
          <div
            className={
              location.pathname === "/services"
                ? "flex gap-2 sets activate cursor-pointer"
                : "flex gap-2 sets cursor-pointer"
            }
          >
            Services
            <p className=" text-sky-600 num font-semibold">{data.length}</p>
          </div>
        </Link>
      </div>

      {result2.map((item, index) => (
        <div className="info flex justify-between items-center" key={index}>
          <div className="total text-slate-400 text-lg font-semibold">
            Total Stock Value :
            <span className="text-black font-semibold">
              {item.stockValue ? item.stockValue.toFixed(2) : "0"}
            </span>
          </div>
          <div className="low text-slate-400 text-lg font-semibold">
            Low Stock Products :{" "}
            <span className="text-red-600 font-semibold">
              {item.lowStockProducts}
            </span>
          </div>
          <button className="flex gap-1" onClick={props.add}>
            <IconPlus className="w-5" />
            Add Product
          </button>
        </div>
      ))}

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
              
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="highestAmount">Highest Amount</MenuItem>
              <MenuItem value="name">By Name</MenuItem>
              <MenuItem value="stockLowToHigh">Stock Low - High</MenuItem>
              <MenuItem value="stockHighToLow">Stock High - Low</MenuItem>
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
              onChange={(e) => {
                setFilter2(e.target.value);
              }}
            >
              
               <MenuItem value="All">All</MenuItem>
              <MenuItem value="lowStock">Low Stock</MenuItem>
              </Select>
          </FormControl>
        </div>
      </div>
      <div className="heading1">
        <div className="pname text-slate-600">Product Name</div>
        <div className="sprice text-slate-600">Sales Price</div>
        <div className="qty text-slate-600">Stock Qty</div>
      </div>
      
      <div className="cards">
        {console.log("searchValue : ",searchValue)}
        {sortedUsers

          .filter((code) => {
            if (filter2 === "lowStock") {
              return code.balance_stock <= code.low_stock;
            } else if (filter2 === "All") {
              return true;
            }
          })
          .filter(
            (code) =>
              code.product_name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          .map((filteredItem, index) => (
            <ProCard key={index} data={filteredItem} />
          ))}
      </div>
    </div>
  );
};

export default ProLeft;
