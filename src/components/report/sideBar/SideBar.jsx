import {
  Icon3dCubeSphere,
  IconBuildingBank,
  IconShoppingCart,
  IconTruckLoading,
} from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const options = [
    {
      linkto: "/custReport",
      name: "Customer",
      icon: <IconUser />,
    },
    {
      linkto: "/supReport",
      name: "Supplier",
      icon: <IconTruckLoading />,
    },
    {
      linkto: "/cashReport",
      name: "CashBook",
      icon: <IconBuildingBank />,
    },
    {
      linkto: "/salesReport",
      name: "Sales",
      icon: <IconShoppingCart />,
    },
    {
      linkto: "/purchaseReport",
      name: "Purchase",
      icon: <Icon3dCubeSphere />,
    },
  ];
  return (
    <div className="w-[15vw]">
      <div className="pr-5 py-4 flex flex-col gap-5 ">
        {options.map((item, index) => (
          <Link to={item.linkto} key={index}>
            <div
              className={
                location.pathname === item.linkto
                  ? "item bg-blue-300/25 flex rounded-e-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
                  : "item hover:bg-blue-300/25 flex rounded-e-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
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

export default SideBar;
