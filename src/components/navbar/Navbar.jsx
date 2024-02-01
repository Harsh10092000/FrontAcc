import {
  IconBook2,
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
import axios from "axios";
import khataeaseLogo from "../../assets/khataease-logo.png";
import khataeaseLogo2 from "../../assets/khataease-logo2.png";
import { AuthContext } from "../../context/AuthContext";

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
  const { parties, inventory, bills, access, accountId, userType , changeAccess, changeAccountId, changeBills, changeInventory , changeParties, changeUId, changeUserType} =
    useContext(UserContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  useEffect(() => {
    const items1 = window.localStorage.getItem("user");
    if (items1) {
      console.log("items1 : " , items1)
    } else {
      console.log("no items present")
      navigate("/login");
    }
  }, []);



  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/act/fetchAccessData/${accountId}`
      )
      .then((res) => {
        if (parseInt(userType) === 0 && parseInt(res.data[0].access) === 0) {
          localStorage.removeItem("user");
          navigate("/staffRestricted");
        } else if (
          parseInt(res.data[0].access) === 0 &&
          location.pathname !== "/addAccount" &&
          location.pathname !== "/settings/account"
        ) {
          navigate("/accountRestricted");
        }
      });
  });

  const access_validation =
    parseInt(access) !== 0 && access !== undefined && access !== null;
  const parties_validation =
    parties !== 0 &&
    parseInt(access) !== 0 &&
    access !== undefined &&
    access !== null;
  const inventory_validation =
    inventory !== 0 &&
    parseInt(access) !== 0 &&
    access !== undefined &&
    access !== null;
  const bills_validation =
    bills !== 0 &&
    parseInt(access) !== 0 &&
    access !== undefined &&
    access !== null;





  const items = [
    {
      name: "Customer",
      icon: <IconUser />,
      linkto: "/",
      user_access: parties_validation,
    },

    {
      name: "Supplier",
      icon: <IconTruckLoading />,
      linkto: "/supplier",
      user_access: parties_validation,
    },

    {
      name: "Items",
      icon: <IconServer />,
      linkto: "/products",
      link2: "/services",
      user_access: inventory_validation,
    },

    {
      name: "CashBook",
      icon: <IconBuildingBank />,
      linkto: "/cashbook",
      user_access: bills_validation,
    },

    {
      name: "Expenses",
      icon: <IconCreditCard />,
      linkto: "/expenses",
      user_access: bills_validation,
    },

    {
      name: "Sales",
      icon: <IconShoppingCart />,
      linkto: "/sales",
      link2: "/salesForm",
      user_access: bills_validation,
    },

    {
      name: "Purchase",
      icon: <IconTruckDelivery />,
      linkto: "/purchase",
      link2: "/purchaseForm",
      user_access: bills_validation,
    },

    {
      name: "Reports",
      icon: <IconReportAnalytics />,
      linkto: "/custReport",
      user_access: access_validation,
    },
    {
      name: "Staff",
      icon: <IconUsers />,
      linkto: "/staff",
      user_access: access_validation && userType === 1,
    },

    {
      name: "Settings",
      icon: <IconSettings />,
      linkto: "/settings/account",
      user_access: access_validation,
    },
  ];
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

 
  // const { currentUser } = useContext(AuthContext);
  // useEffect(() => {
  //   if (currentUser) {
  //     changeAccountId(currentUser[0].business_id);
  //     changeUId(currentUser[0].log_id);
  //     changeAccess(currentUser[0].access);
  //     changeUserType(currentUser[0].log_user);
  //     console.log(currentUser[0].log_user, currentUser[0].access);
  //     if (currentUser[0].log_user === 0) {
  //       changeParties(currentUser[0].staff_parties);
  //       changeBills(currentUser[0].staff_bills);
  //       changeInventory(currentUser[0].staff_inventory);
  //     }
  //   }
  // }, []);

  return (
    <div className="navbar flex items-center w-[full] justify-around shadow-md">
      <div className="left flex items-center ">
        {/* <IconBook2 className="text-sec h-16 w-16" />
        <div className="text-[50px] text-sec">
          Acc
          <span className="font-bold text-amber-500">Book</span>
        </div> */}
        {/* <div><img src={khataeaseLogo2} alt="" className="w-[95%]"  /> </div> */}
        <div><img src={khataeaseLogo} alt="" className="w-[70%]"  /> </div>
      </div>
      <div></div>
      <div className="center flex ">
        <div className="items flex">
          {items
            .filter((code) => code.linkto !== undefined)
            .map((item, index) => (
              item.user_access &&
              <Link
                className={
                  location.pathname === item.linkto ||
                  location.pathname === item.link2
                    ? "shadow active"
                    : ""
                }
                key={index}
                to={item.user_access ? item.linkto : ""}
              >
                <div
                  className={
                    item.user_access
                      ? "item flex flex-col items-center gap-1 justify-center cursor-pointer"
                      : "cursor-not-allowed item flex flex-col items-center gap-1 justify-center "
                  }
                >
                  {/* <div className="icon1">{item.icon}</div> */}
                  <div className="name text-sm font-semibold">{item.name}</div>
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
