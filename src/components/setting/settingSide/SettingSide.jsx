import {
  Icon3dCubeSphere,
  IconBrandDatabricks,
  IconBriefcase,
  IconBuildingBank,
  IconFileCertificate,
  IconLogout,
  IconShoppingCart,
  IconTruckLoading,
} from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SettingSide = () => {
  const location = useLocation();
  const options = [
    {
      linkto: "/settings/account",
      name: "Account",
      icon: <IconBriefcase />,
    },
    {
      linkto: "/settings/subscription",
      name: "Subscription",
      icon: <IconFileCertificate />,
    },
    {
      linkto: "/settings/logtrack",
      name: "Login/Logout Tracking",
      icon: <IconBrandDatabricks />,
    },
    {
      linkto: "/login",
      name: "Logout",
      icon: <IconLogout />,
    },
  ];
  return (
    <div className="w-[20vw]">
      <div className="options p-5 flex flex-col gap-5 ">
        {options.map((item, index) => (
          <Link to={item.linkto} key={index}>
            <div
              className={
                location.pathname === item.linkto
                  ? "item bg-indigo-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-indigo-500 cursor-pointer"
                  : "item hover:bg-indigo-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-indigo-500 cursor-pointer"
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

export default SettingSide;
