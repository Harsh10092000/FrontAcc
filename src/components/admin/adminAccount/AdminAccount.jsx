import React from "react";
import AdminCard from "../adminCard/AdminCard";
import { UserContext } from "../../../context/UserIdContext";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

const AdminAccount = () => {
  const { change } = useContext(UserContext);
  const [accData, setAccData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetch`)
      .then((response) => {
        setAccData(response.data);
      });
  }, [change]);

  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };
  let sortedUsers = [...accData];

  if (sortOption === "recent") {
    sortedUsers.sort((a, b) => b.business_id - a.business_id);
  } else if (sortOption === "oldest") {
    sortedUsers.sort((a, b) => a.business_id - b.business_id);
  } 

  const [filter, setFilter] = useState("all");
  
  return (
    <div className="w-full px-4">
      <div className="p-5 flex gap-4 items-center">
        <div className="text-2xl font-semibold text-sky-600/80">Accounts</div>
        <div className="bg-sky-600/10 text-sky-600 px-5 py-1 rounded-full">
          {accData.length}
        </div>
      </div>
      <div className="bg-slate-100 h-[90vh] rounded-xl p-4 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-xl flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <div>Search Accounts</div>
            <input
              type="text"
              className="border border-solid border-slate-300 p-2 rounded focus:oultine-sky-600 w-96"
              placeholder="Search..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div>Sort</div>
            <select onChange={handleSort} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div>Filter</div>
            <select onChange={(e) => {
                setFilter(e.target.value);
              }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl grid grid-cols-4 text-xl  font-semibold">
          <div>Account Name</div>
          <div className="justify-self-center">Email</div>
          <div className="justify-self-center">Status</div>
          <div className="justify-self-center">Actions</div>
        </div>
        {sortedUsers
        .filter((code) => {
          if (filter === "active") {
            return parseInt(code.access) === 1;
          } else if (filter === "inactive") {
            return parseInt(code.access) === 0;
          } else if (filter === "all") {
            return true;
          }
        })
          .filter(
            (code) =>
              code.log_email
                .toLowerCase()
                .startsWith(searchValue.toLowerCase()) ||
              code.business_name
                .toLowerCase()
                .startsWith(searchValue.toLowerCase())
          )
          .map((item) => (
            <AdminCard data={item} />
          ))}
      </div>
    </div>
  );
};

export default AdminAccount;
