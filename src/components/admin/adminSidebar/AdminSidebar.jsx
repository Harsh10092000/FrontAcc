import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconBoxSeam,
  IconBrandAmongUs,
  IconBrandDatabricks,
  IconDevices2,
  IconLogout2,
  IconUserHexagon,
  IconWallet,
} from "@tabler/icons-react";

const AdminSidebar = () => {
  const location = useLocation();

  const options = [
    {
      linkto: "/admin/account",
      name: "All Accounts",
      icon: <IconBrandDatabricks />,
    },
    {
      linkto: "/payplan",
      name: "Payment Plan",
      icon: <IconWallet />,
    },
    {
      linkto: "/moderator",
      name: "Moderator",
      icon: <IconBrandAmongUs />,
    },
    {
      linkto: "/admin/hsn",
      name: "HSN Codes",
      icon: <IconBoxSeam />,
    },
    {
      linkto: "/admin/sac",
      name: "SAC Codes",
      icon: <IconDevices2 />,
    },
    {
      linkto: "/logout",
      name: "Logout",
      icon: <IconLogout2 />,
    },
  ];
  return (
    <div className="w-[20vw]">
      <div className="flex items-center p-5">
        <IconUserHexagon className="text-[#008cff] h-16 w-16" />
        <div className="text-[50px] text-[#008cff]">
          Acc
          <span className="font-bold text-4xl text-amber-400 uppercase">
            admin
          </span>
        </div>
      </div>
      <div className="options p-5 flex flex-col gap-5 ">
        {options.map((item, index) => (
          <Link to={item.linkto} key={index}>
            <div
              className={
                location.pathname === item.linkto
                  ? "item bg-blue-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
                  : "item hover:bg-blue-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
              }
              key={index}
              style={{ transition: "all 200ms ease-in-out" }}
            >
              {item.icon}
              <div className="text-lg">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
