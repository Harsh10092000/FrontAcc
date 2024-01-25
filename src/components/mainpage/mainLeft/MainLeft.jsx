import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import CardItem from "../cardItem/CardItem";
import "./mainleft.scss";
import { useContext, useEffect, useState, useRef } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
import { helpertext } from "../../HelperText";

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
    sortedUsers.sort(
      (a, b) =>
        (b.cust_total_amt < 0 ? b.cust_total_amt * -1 : b.cust_total_amt) -
        (a.cust_total_amt < 0 ? a.cust_total_amt * -1 : a.cust_total_amt)
    );
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.cust_name.localeCompare(b.cust_name));
  }

  const [visibleItems, setVisibleItems] = useState(10);
  const containerRef = useRef(null);
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 2);
      }
    });
  };

  useEffect(() => {
    const options = {
      threshold: 0.50,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);


  const filteredData  = sortedUsers
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
  const msg = filteredData.length === 0 ? helpertext[4].noData : null;

  return (
    <div className="left bg-pri shadow-lg w-full flex flex-col h-full">
      <div className="heading text-xl font-semibold">
        Customers
        <p className=" text-sec num font-semibold">{result.length}</p>
      </div>
      <div className="giveget flex justify-between">
        <div className="give text-gray-500 flex gap-1 items-center">
          Total Paid :
          <span className="text-gray-700 font-bold">
            ₹
            {total.length > 0 && total[0].payTotal !== null
              ? parseFloat(total[0].payTotal).toFixed(2)
              : 0}
          </span>
          <IconArrowUpRight className="text-red-600" />
        </div>
        <div className="give text-gray-500 flex gap-1 items-center">
          Total Recieved:
          <span className="text-gray-700 font-bold">
            ₹
            {total.length > 0 && total[0].receiveTotal !== null
              ? parseFloat(total[0].receiveTotal).toFixed(2)
              : 0}
          </span>
          <IconArrowDownLeft className="text-green-600" />
        </div>
        <button
          className={
            parties === 1
              ? " hover:bg-slate-200 border-none flex gap-1 cursor-not-allowed text-slate-400 bg-slate-200 rounded"
              : "flex gap-1 cursor-pointer items-center p-2 shadow shadow-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500"
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
            className="focus:outline-none p-1 w-56 bg-transparent"
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
          filteredData.length > 0 ?
          filteredData.slice(0, visibleItems)
            .map((filteredItem, index) => (
              <CardItem
                key={index}
                result={tran}
                click={props.click}
                users={filteredItem}
                message={msg}
              />
            ))
            : <CardItem
            message={msg}
          />
        )}
        <div ref={containerRef}></div>
      </div>
    </div>
  );
};

export default MainLeft;
