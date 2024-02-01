import { IconPlus, IconSearch } from "@tabler/icons-react";
import "./proleft.scss";
import { useLocation, Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import ProCard from "../proCard/ProCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const ProLeft = (props) => {
  const [skeleton, setSkeleton] = useState(true);
  const { change, pId, accountId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/auth/fetchTotalStockValue/${accountId}`
      )
      .then((response) => {
        setResult2(response.data);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchData/${accountId}`)
      .then((res) => {
        setData(res.data);
      });
  }, [change, accountId]);

  const [sortOption, setSortOption] = useState("recent");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };
  const [filter2, setFilter2] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...result2];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.product_id - a.product_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.sale_price - a.sale_price);
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.product_name.localeCompare(b.product_name));
  } else if (sortOption === "stockHighToLow") {
    sortedUsers.sort((a, b) => b.balStock - a.balStock);
  } else if (sortOption === "stockLowToHigh") {
    sortedUsers.sort((a, b) => a.balStock - b.balStock);
  }

  const location = useLocation();

  const lowStock = result2.reduce(function (prev, current) {
    return prev + +current.lowStockStatus;
  }, 0);

  const stockValue = result2.reduce(function (prev, current) {
    return prev + +(current.balStock * current.sale_price);
  }, 0);

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
          <p className=" text-sky-600 num font-semibold">{result2.length}</p>
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

      <div className="info flex justify-between items-center">
        {skeleton ? (
          <div className="flex gap-20">
            <div className="total text-slate-400 text-lg font-semibold flex items-center gap-2">
              Total Stock Value :
              <Skeleton variant="rectangular" width={50} height={20} />
            </div>
            <div className="low text-slate-400 text-lg font-semibold flex items-center gap-2">
              Low Stock Products :
              <Skeleton variant="rectangular" width={50} height={20} />
            </div>
          </div>
        ) : (
          <div className="flex gap-20">
            <div className="total text-slate-400 text-lg font-semibold">
              Total Stock Value :
              <span className="text-black font-semibold">{stockValue}</span>
            </div>
            <div className="low text-slate-400 text-lg font-semibold">
              Low Stock Products :
              <span className="text-red-600 font-semibold">{lowStock}</span>
            </div>
          </div>
        )}
        <button
          className="flex gap-1 cursor-pointer items-center p-2 shadow shadow-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500"
          onClick={props.add}
        >
          <IconPlus className="w-5" />
          Add Product
        </button>
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
        {skeleton ? (
          <div className={"cardItem cursor-pointer"}>
            <div
              className="flex justify-between  items-center p-3 "
              style={{ borderBottom: "1px solid rgb(245 245 245" }}
            >
              <div className="flex items-center gap-4 w-[200px]">
                <Skeleton variant="circular" width={50} height={50} />
                <div className="flex flex-col gap-1">
                  <span className="text-lg text-slate-700">
                    <Skeleton variant="rectangular" width={60} height={20} />
                  </span>
                </div>
              </div>
              <div className="w-[95px]">
                <div className="text-slate-800 text-lg">
                  <Skeleton variant="rectangular" width={100} height={20} />
                </div>
              </div>
              <div className="w-[70px]">
                <div className="qty text-slate-800 text-lg">
                  <Skeleton variant="rectangular" width={60} height={20} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          sortedUsers

            .filter((code) => {
              if (filter2 === "lowStock") {
                return code.balStock <= code.low_stock;
              } else if (filter2 === "All") {
                return true;
              }
            })
            .filter((code) =>
              code.product_name
                .toLowerCase()
                .startsWith(searchValue.toLowerCase())
            )
            .map((filteredItem, index) => (
              <ProCard key={index} data={filteredItem} />
            ))
        )}
      </div>
    </div>
  );
};

export default ProLeft;
