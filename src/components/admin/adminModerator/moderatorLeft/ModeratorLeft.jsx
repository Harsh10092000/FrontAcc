import { IconPlus, IconSearch } from "@tabler/icons-react";
import ModeratorObj from "../moderatorObj/ModeratorObj";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserIdContext";
import axios from "axios";

const ModeratorLeft = (props) => {
  //const uId = 5;
  const { change } = useContext(UserContext);
  const [moderatorData , setModeratorData] = useState([]);
  const [searchValue , setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchModerator`)
      .then((response) => {
        setModeratorData(response.data);
      });
  }, [change]);

  return (

    <div className="bg-white shadow-lg w-full flex flex-col h-full">
      <div className="text-xl font-semibold flex p-5 gap-2 text-[#008cffb4] items-center border-b border-slate-300">
      Moderator
        <p className="font-semibold text-sm px-5 bg-blue-300/20 py-1 rounded-full text-sky-600">
          {moderatorData.length}
        </p>
      </div>
      <div className="p-5 border-b border-slate-300 grid grid-cols-12">
        <div className="flex h-10 rounded p-1 w-full items-center gap-2 border border-slate-400 hover:border-black col-span-6">
          <IconSearch className="text-slate-500" />
          <input
            type="text"
            className="focus:outline-none p-1 w-full"
            placeholder="Search for moderator..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className="col-span-4"></div>
        <button
          className="flex gap-1 col-span-2 items-center justify-center rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
          style={{
            border: "1px solid #109e5b",
            transition: "all 400ms ease-in-out",
          }}
          onClick={props.add}
        >
          <IconPlus className="w-5" />
          Add Moderator
        </button>
      </div>
      <div>
        <div className="text-xl px-4 py-2 text-black">
          <div>Moderator Information</div>
        </div>
        <div className="flex flex-col gap-1 h-[100vh] overflow-y-scroll">
          
          {moderatorData.
          filter(
              (code) =>
                code.mod_email.toString().toLowerCase().startsWith(searchValue.toString().toLowerCase()) ||
                code.mod_name
                  .toLowerCase()
                  .startsWith(searchValue.toLowerCase())
            )
          .map((filteredItem, index) => (
            <ModeratorObj data={filteredItem} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeratorLeft;
