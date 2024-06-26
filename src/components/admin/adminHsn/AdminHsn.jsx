import React from "react";
import AdminHsnCard from "../adminHsnCard/AdminHsnCard";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import AddHsnCode from "../addHsnCode/AddHsnCode";
import {useSnackbar } from "notistack";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { IconPlus } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import EditHsnCode from "../editHsnCode/EditHsnCode";
const AdminHsn = () => {
  const [visibleItems, setVisibleItems] = useState(20);
  const containerRef = useRef(null);
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 30);
      }
    });
  };

  useEffect(() => {
    const options = {
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const { change } = useContext(UserContext);
  const [hsnData, setHsnData] = useState([]);
  let a = false;
  useEffect(() => {
    if (a === false) {
      axios
        .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchHsnCodes`)
        .then((response) => {
          setHsnData(response.data);
        });
      a = true;
    }
  }, [change]);

  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    add: false,
    edit: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const toggleDrawer1 = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClickVariant = (variant, anchor1, msg) => {
    console.log("variant, anchor1, msg : " , variant, anchor1, msg)
    toggleDrawer1(anchor1, false);
    enqueueSnackbar(msg, { variant });
  };

  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  let sortedUsers = [...hsnData];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.id - a.id);
  } else if (sortOption === "oldest") {
    sortedUsers.sort((a, b) => a.id - b.id);
  }

  const [filter, setFilter] = useState("all");

  const list = (anchor) => (
    <Box sx={{ width: 400 }} role="presentation">
      {console.log("anchor : " , anchor )}
      {anchor === "add" ? (
        <AddHsnCode
          snack={() =>
            handleClickVariant("success", "add", "Hsn Code Has been Added")
            
          }
        />
      ) : anchor === "edit" ? (
        <EditHsnCode
          snacku={() =>
            handleClickVariant("success", "edit", "Updated Successfully")

          }
        />
      ) : (
        "-"
      )}
    </Box>
  );
  return (
    
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["add"]}
        onClose={toggleDrawer("add", false)}
      >
        {list("add")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["edit"]}
        onClose={toggleDrawer("edit", false)}
      >
        {list("edit")}
      </Drawer>
      <div className="w-full px-4">
        <div className="p-5 flex gap-4 items-center">
          <div className="text-2xl font-semibold text-sky-600/80">
            HSN Codes
          </div>
          <div className="bg-sky-600/10 text-sky-600 px-5 py-1 rounded-full">
            {hsnData.length}
          </div>
        </div>
        <div className="bg-slate-100 h-[90vh] rounded-xl p-4 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl flex items-center gap-4 justify-between">
            <div className=" flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <div>Search HSN Code</div>
                <input
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  type="text"
                  className="border border-solid border-slate-300 p-2 rounded focus:oultine-sky-600 w-96"
                  placeholder="Search..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Sort By</div>
                <select
                  onChange={handleSort}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="recent">Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <div>Filter</div>
                <select
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="0">0</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                  <option value="35">35%</option>
                </select>
              </div>
            </div>
            <button
              onClick={toggleDrawer("add", true)}
              className=" shadow-sm shadow-emerald-600 p-2 rounded text-emerald-600 cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-500 flex items-center"
            >
              <IconPlus />
              Add Hsn Code
            </button>
          </div>
          <div className="bg-white p-4 rounded-xl grid grid-cols-4 text-xl  font-semibold">
            <div className="pl-4">Code </div>
            <div className="justify-self-center">Description </div>
            <div className="justify-self-center">GST </div>
            <div className="justify-self-center">Actions</div>
          </div>
          <div className="flex flex-col gap-3 h-full overflow-y-scroll p-1">
            {
              // searchValue !== null && (searchValue !== "") === true &&
              sortedUsers
                
                .filter((code) => {
                  if (filter === "0") {
                    return parseInt(code.igst) === 0;
                  } else if (filter === "5") {
                    return parseInt(code.igst) === 5;
                  } else if (filter === "12") {
                    return parseInt(code.igst) === 12;
                  } else if (filter === "18") {
                    return parseInt(code.igst) === 18;
                  } else if (filter === "28") {
                    return parseInt(code.igst) === 28;
                  } else if (filter === "35") {
                    return parseInt(code.igst) === 35;
                  } else if (filter === "all") {
                    return true;
                  }
                })
                .filter(
                  (code) =>
                    code.hsn_code.toString().startsWith(searchValue) ||
                    code.hsn_desc
                      .toLowerCase()
                      .startsWith(searchValue.toLowerCase())
                ).slice(0, visibleItems)
                .map((item) => (
                  <AdminHsnCard
                    data={item}
                    //add={toggleDrawer("add", true)}
                    edit={toggleDrawer("edit", true)}
                  />
                ))
            }
            <div ref={containerRef}></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminHsn;
