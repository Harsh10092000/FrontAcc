// import {
//   IconBook2,
//   IconBriefcase,
//   IconBuildingBank,
//   IconCreditCard,
//   IconHelpCircle,
//   IconHome2,
//   IconLogout,
//   IconReportAnalytics,
//   IconServer,
//   IconSettings,
//   IconShoppingCart,
//   IconTruckDelivery,
//   IconTruckLoading,
//   IconUser,
//   IconUsers,
// } from "@tabler/icons-react";
// import "./navbar.scss";
// import { useState, useEffect, useContext } from "react";
// import { Menu, MenuItem } from "@mui/material";
// import Fade from "@mui/material/Fade";
// import { Link, useLocation } from "react-router-dom";
// import { UserContext } from "../../context/UserIdContext";

// const Navbar = () => {
//   const { change, parties, inventory, bills } = useContext(UserContext);
//   const location = useLocation();
//   const items = [
    
//     {
//       name: "Customer",
//       icon: <IconUser />,
//       linkto: parties !== 0 ? "/" : "",
      
//     },
//     {
//       name: "Supplier",
//       icon: <IconTruckLoading />,
//       //linkto: "/supplier",
//       linkto: parties !== 0 ? "/supplier" : "",
//     },

//     {
//       name: "Items",
//       icon: <IconServer />,
//       linkto: inventory !== 0 ? "/products" : "",
//       link2: inventory !== 0 ? "/services" : "",
//     },
//     {
//       name: "CashBook",
//       icon: <IconBuildingBank />,
//       linkto: "/cashbook",
//     },
//     {
//       name: "Expenses",
//       icon: <IconCreditCard />,
//       linkto: "/expenses",
//     },
//     {
//       name: "Sales",
//       icon: <IconShoppingCart />,
//       linkto: "/sales",
//       link2: "/salesForm",
//     },
//     {
//       name: "Purchase",
//       icon: <IconTruckDelivery />,
//       linkto: "/purchase",
//       link2: "/purchaseForm",
//     },
//     {
//       name: "Reports",
//       icon: <IconReportAnalytics />,
//       linkto: "/custReport",
//     },
//     {
//       name: "Account",
//       icon: <IconBriefcase />,
//       linkto: "/account",
//     },
//     {
//       name: "Settings",
//       icon: <IconSettings />,
//       linkto: "/settings",
//     },
//     {
//       name: "Staff",
//       icon: <IconUsers />,
//       linkto: "/staff",
//     },
//   ];
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <div className="navbar flex items-center w-full justify-between shadow-md">
//       <div className="left flex items-center">
//         <IconBook2 className="text-[#008cff] h-16 w-16" />
//         <div className="text-[50px] text-[#008cff]">
//           Acc
//           <span className="font-bold">Book</span>
//         </div>
//       </div>
//       <div className="center flex ">
//         <div className="items flex">
//           {items.map((item, index) => (
//             <Link
//               className={
//                 location.pathname === item.linkto ||
//                 location.pathname === item.link2
//                   ? "active"
//                   : ""
//               }
//               key={index}
//               to={item.linkto}
//             >
//               <div className="item flex flex-col items-center gap-1 justify-center cursor-pointer">
//                 <div className="icon1">{item.icon}</div>
//                 <div className="name text-xs">{item.name}</div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div className="right">
//         <div className="profile">
//           <div onClick={handleClick} className=" cursor-pointer">
//             AB
//           </div>
//           <Menu
//             id="fade-menu"
//             MenuListProps={{
//               "aria-labelledby": "fade-button",
//             }}
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             TransitionComponent={Fade}
//           >
//             <Link to="/home">
//               <MenuItem className="gap-2">
//                 <IconHome2 className="text-slate-600 w-5" />
//                 Home
//               </MenuItem>
//             </Link>
//             <Link to="/contact">
//               <MenuItem className="gap-2">
//                 <IconHelpCircle className="text-slate-600 w-5" />
//                 Contact Us
//               </MenuItem>
//             </Link>
//             <Link to="/login">
//               <MenuItem className="gap-2">
//                 <IconLogout className="text-slate-600 w-5" />
//                 Logout
//               </MenuItem>
//             </Link>
//           </Menu>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import {
  IconBook2,
  IconBriefcase,
  IconBuildingBank,
  IconCreditCard,
  IconHelpCircle,
  IconHome2,
  IconLogout,
  IconReportAnalytics,
  IconServer,
  IconSettings,
  IconShoppingCart,
  IconTruckDelivery,
  IconTruckLoading,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import "./navbar.scss";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAnimate, stagger, motion } from "framer-motion";
import { UserContext } from "../../context/UserIdContext";
import { useNavigate } from "react-router-dom";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
  
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.1,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}
const Navbar = () => {
  const navigate = useNavigate();
  const { change, parties, inventory, bills } = useContext(UserContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const items = [

    parties !== 0 && 
    {
      name: "Customer",
      icon: <IconUser />,
      linkto: "/",
    } ,
    parties !== 0 && 
    {
      name: "Supplier",
      icon: <IconTruckLoading />,
      linkto: "/supplier",
    },
    
    inventory !== 0 ?
    {
      name: "Items",
      icon: <IconServer />,
      linkto: "/products",
      link2: "/services",
    } 
    : "",
    bills !== 0 && 
    {
      name: "CashBook",
      icon: <IconBuildingBank />,
      linkto: "/cashbook",
    },
    bills !== 0 && 
    {
      name: "Expenses",
      icon: <IconCreditCard />,
      linkto: "/expenses",
    },
    bills !== 0 && 
    {
      name: "Sales",
      icon: <IconShoppingCart />,
      linkto: "/sales",
      link2: "/salesForm",
    },
    bills !== 0 && 
    {
      name: "Purchase",
      icon: <IconTruckDelivery />,
      linkto: "/purchase",
      link2: "/purchaseForm",
    } ,
    
    {
      name: "Reports",
      icon: <IconReportAnalytics />,
      linkto: "/custReport",
    },
    {
      name: "Staff",
      icon: <IconUsers />,
      linkto: "/staff",
    },
    {
      name: "Settings",
      icon: <IconSettings />,
      linkto: "/settings/account",
    },
    // {
    //   name: "Account",
    //   icon: <IconBriefcase />,
    //   linkto: "/account",
    // },
  ];
  const logout =()=>{
    localStorage.removeItem("user")
    navigate("/login");
  }
  return (
    <div className="navbar flex items-center w-full justify-around shadow-md">
      <div className="left flex items-center">
        <IconBook2 className="text-[#008cff] h-16 w-16" />
        <div className="text-[50px] text-[#008cff]">
          Acc
          <span className="font-bold">Book</span>
        </div>
      </div>
      <div className="center flex ">
        <div className="items flex">
          {items.filter((code) => code.linkto !== undefined)
          .map((item, index) => (
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
        <div className="profile" ref={scope}>
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => setIsOpen(!isOpen)}
            className=" cursor-pointer"
          >
            AB
          </motion.div>
          <ul
            style={{
              pointerEvents: isOpen ? "auto" : "none",
              clipPath: "inset(10% 50% 90% 50% round 10px)",
            }}
            className="absolute flex flex-col gap-3 bg-white p-2"
          >
            <Link to="/home">
              <li className="flex gap-1 items-center">
                <IconHome2 className="text-slate-600 w-5" />
                Home
              </li>
            </Link>
            <Link to="/contact">
              <li className="flex gap-1 items-center">
                <IconHelpCircle className="text-slate-600 w-5" />
                Contact Us
              </li>
            </Link>
            
              <li className="flex gap-1 items-center" onClick={logout}>
                <IconLogout className="text-slate-600 w-5" />
                Logout
              </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
