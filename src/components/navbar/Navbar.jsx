import {
  IconBook2,
  IconBriefcase,
  IconBuildingBank,
  IconCreditCard,
  IconHelpCircle,
  IconHome2,
  IconLogout,
  IconServer,
  IconSettings,
  IconTruckLoading,
  IconUser,
} from "@tabler/icons-react";
import "./navbar.scss";
import { useState, useEffect, useContext } from "react";
import { Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserIdContext";
const Navbar = () => {
  const { change } = useContext(UserContext);
  const location = useLocation();
  const items = [
    {
      name: "Customer",
      icon: <IconUser />,
      linkto: "/",
    },
    {
      name: "Supplier",
      icon: <IconTruckLoading />,
      linkto: "/supplier",
    },
    {
      name: "Items",
      icon: <IconServer />,
      linkto: "/products",
      link2: "/services",
    },
    {
      name: "CashBook",
      icon: <IconBuildingBank />,
      linkto: "/cashbook",
    },
    {
      name: "Expenses",
      icon: <IconCreditCard />,
      linkto: "/expenses",
    },
    {
      name: "Sales",
      icon: <IconSettings />,
      linkto: "/Sales",
    },
    {
      name: "Account",
      icon: <IconBriefcase />,
      linkto: "/account",
    },
    {
      name: "Settings",
      icon: <IconSettings />,
      linkto: "/settings",
    },
    
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar flex items-center w-full justify-between shadow-md">
      <div className="left flex items-center">
        <IconBook2 className="text-[#008cff] h-16 w-16" />
        <div className="text-[50px] text-[#008cff]">
          Acc
          <span className="font-bold">Book</span>
        </div>
      </div>
      <div className="center flex ">
        <div className="items flex">
          {items.map((item, index) => (
            <Link
              className={
                location.pathname === item.linkto ||
                location.pathname === item.link2
                  ? "active"
                  : ""
              }
              key={index}
              to={item.linkto}
            >
              <div className="item flex flex-col items-center gap-1 justify-center cursor-pointer">
                <div className="icon1">{item.icon}</div>
                <div className="name text-xs">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="profile">
          <div onClick={handleClick} className=" cursor-pointer">
            AB
          </div>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <Link to="/home">
              <MenuItem className="gap-2">
                <IconHome2 className="text-slate-600 w-5" />
                Home
              </MenuItem>
            </Link>
            <Link to="/contact">
              <MenuItem className="gap-2">
                <IconHelpCircle className="text-slate-600 w-5" />
                Contact Us
              </MenuItem>
            </Link>
            <Link to="/login">
              <MenuItem className="gap-2">
                <IconLogout className="text-slate-600 w-5" />
                Logout
              </MenuItem>
            </Link>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
