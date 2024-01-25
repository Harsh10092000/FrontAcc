import { IconPlus, IconSearch } from "@tabler/icons-react";
import DrawerMod from "../../drawerModerator/DrawerModerator";
import { useEffect, useState } from "react";
import { Drawer, TextField } from "@mui/material";
import ModeratorCard from "../moderatorCard/ModeratorCard";
import axios from "axios";

const ModeratorLeft = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const closeDraw = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ad/fetchModerator")
      .then((response) => {
        setUser(response.data);
      });
  }, [open, user]);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DrawerMod draw={closeDraw} />
      </Drawer>
      <div className="flex flex-col w-full shadow-xl">
        <div className="text-xl font-semibold  text-sky-600 p-3">Moderator</div>
        <div className="flex flex-row gap-32 p-4 border-slate-300 border-y justify-between">
          <div className="w-96 h-10 flex gap-1 items-center border border-slate-400 hover:border-black hover:border-[1px] rounded p-1">
            <IconSearch className="w-6 h-6" />
            <input
              type="text"
              placeholder="Search Moderator here .... "
              className="h-9 text-md focus:outline-none w-full"
            />
          </div>
          <div>
            <button
              className="flex gap-1 col-span-2 items-center justify-center rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white h-10 w-40  shadow-green-600 shadow"
              style={{
                border: "1px solid #109e5b",
                transition: "all 400ms ease-in-out",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <IconPlus className="w-5" />
              Add Moderator
            </button>
          </div>
        </div>
        <div className="p-3 text-xl text-black  ">
          <div>Moderator Information</div>
          <div className="mt-5 px-3 flex flex-col gap-3 h-[78vh]  overflow-contain overflow-y-scroll">
            {user.map((items, key) => (
              <ModeratorCard data={items} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeratorLeft;
