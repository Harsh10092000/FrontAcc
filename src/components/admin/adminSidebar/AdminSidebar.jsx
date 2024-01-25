import React, { useState, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserIdContext";
const AdminSidebar = () => {
  const { changeAdminAccess, changeAdminId, changeAdminType } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("admin"));
    if (items) {
      setAdminData(items);
    } else {
      navigate("/adminlogin");
    }
  }, []);

  useEffect(() => {
    if (adminData.length > 0) {
      changeAdminId(adminData[0].super_id),
        changeAdminType(adminData[0].super_type);
      changeAdminAccess(adminData[0].super_access);
    }
  }, [adminData]);

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
      linkto: "/admin/moderator",
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
  ];

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };
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

        <div
          onClick={logout}
          className="item hover:bg-blue-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
          style={{ transition: "all 200ms ease-in-out" }}
        >
          <IconLogout2 />
          <div className="text-lg">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
