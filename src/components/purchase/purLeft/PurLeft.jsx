import { IconArrowDownLeft, IconPlus, IconSearch } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PurTran from "../purTran/PurTran";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const PurLeft = () => {
  const { change, accountId, purchaseId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [tran, setTran] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/purchase/fetchData/${accountId}`
      )
      .then((response) => {
        setResult(response.data);
      });
  }, [change]);

  const total_amt = result.reduce((acc, current) => {
    return acc + +current.purchase_amt;
  }, 0);

  const [sortOption, setSortOption] = useState("recent");
  const handleChange1 = (e) => {
    setSortOption(e.target.value);
  };

  const [filter2, setFilter2] = useState("All");
  const handleChange2 = (e) => {
    setFilter2(e.target.value);
  };

  
  const [searchValue, setSearchValue] = useState("");
  let sortedUsers = [...result];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.purchase_id - a.purchase_id);
  } else if (sortOption === "highestAmount") {
    sortedUsers.sort((a, b) => b.purchase_amt - a.purchase_amt);
  } else if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.purchase_name.localeCompare(b.purchase_name));
  }

  // const totalAmtPaid = tran
  //   .filter(
  //     (filteredItem) =>
  //       parseInt(filteredItem.purchase_pay_out_id) ===
  //       parseInt(purchaseDataById.purchase_id)
  //   )
  //   .reduce(function (prev, current) {
  //     return prev + +current.purchase_amt_paid;
  //   }, 0);

    const [totalAmtPaid , setTotalAmtPaid] = useState(0);
  const t = (id) => {
    console.log("id : ", id);
    setTotalAmtPaid(result
      .filter(
        (filteredItem) =>
          parseInt(filteredItem.purchase_pay_out_id) === parseInt(id)
      )
      .reduce(function (prev, current) {
        return prev + +current.purchase_amt_paid;
      }, 0));
 
  };
  console.log("totalAmtPaid : ", totalAmtPaid);
  return (
    <div className="left bg-white shadow-lg w-full flex flex-col h-full">
      <div className="heading text-xl font-semibold">
        Purchase
        <p className=" text-sky-600 num font-semibold">5</p>
      </div>
      <div className="flex justify-between p-5 border-b border-slate-300">
        <div className="give text-gray-500 flex gap-1 items-center">
          Sales :<span className="text-gray-700 font-bold">₹ 20000</span>
          <IconArrowDownLeft className="text-green-600" />
        </div>
        <Link to="/purchaseForm">
          <button
            className="flex gap-1 text-cyan-600 p-2 rounded hover:bg-cyan-600/90 hover:text-white"
            style={{
              border: "1px solid #0891b2",
              transition: "all 400ms ease-in-out",
            }}
          >
            <IconPlus className="w-5" />
            Add Purchase
          </button>
        </Link>
      </div>
      <div className="filters flex items-center justify-between">
        <div className="searchbar1 flex h-10 rounded p-1 w-72 items-center gap-2 border border-slate-400 hover:border-black">
          <IconSearch className="text-slate-500" />
          <input
            type="text"
            className="focus:outline-none p-1 w-56"
            placeholder="Name Or Invoice Number"
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
          <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
            <InputLabel id="demo-select-small-label">Filter By</InputLabel>

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Filter By"
              onChange={handleChange2}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="pur">Purchase</MenuItem>
              <MenuItem value="payOut">Paymenet Out</MenuItem>
              <MenuItem value="payRe">Paymenet Return</MenuItem>
              <MenuItem value="un">Unpaid</MenuItem>
              <MenuItem value="pp">Partially paid</MenuItem>
              <MenuItem value="full">Fully Paid</MenuItem>
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
          .filter(
            (code) =>
              code.purchase_prefix_no.toString().startsWith(searchValue) ||
              code.purchase_name
                .toLowerCase()
                .startsWith(searchValue.toLowerCase())
          )
          .filter((code) => {
            if (filter2 === "pur") {
              
              return (
                code.purchase_pay_out_id === null &&
                code.purchase_re_id === null
              );
            } else if (filter2 === "payOut") {
              return code.purchase_pay_out_id !== null;
            } else if (filter2 === "payRe") {
              return code.purchase_re_id !== null;
            } else if (filter2 === "All") {
              return true;
            } else if (filter2 === "pp") {
              () => t(code.purchase_id);
              console.log(code.purchase_pay_out_id , code.purchase_re_id , code.purchase_amt , totalAmtPaid);
              return (code.purchase_pay_out_id === null && code.purchase_re_id === null && totalAmtPaid < parseFloat(code.purchase_amt));
            } else if (filter2 === "full") {
              () => t(code.purchase_id);
              console.log(code.purchase_pay_out_id , code.purchase_re_id , code.purchase_amt , totalAmtPaid);
              return (code.purchase_pay_out_id === null && code.purchase_re_id === null && totalAmtPaid === parseFloat(code.purchase_amt));
            }
          })
          .map((filteredItem, index) => (
            <PurTran
              allTran={result}
              key={index}
              result={tran}
              //click={props.click}
              data={filteredItem}
            />
          ))}
      </div>
    </div>
  );
};

export default PurLeft;
