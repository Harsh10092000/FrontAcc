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
// const AdminSidebar = () => {
//   const { changeAdminAccess, changeAdminId, changeAdminType , changeAdminAccAccess,
//     changeAdminGstAccess,
//     changeAdminPayAccess , adminType , adminAccAccess, adminGstAccess, adminPayAccess } =
//     useContext(UserContext);
//   const navigate = useNavigate();

//   const [adminData, setAdminData] = useState([]);
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("admin"));
//     if (items) {
//       setAdminData(items);
//     } else {
//       navigate("/adminlogin");
//     }
//   }, []);

//   const checkAdmin = parseInt(adminType) !== 0;
  

//   useEffect(() => {
//     if (adminData.length > 0) {
//       changeAdminId(adminData[0].super_id);
//       changeAdminType(adminData[0].super_type);
//       changeAdminAccess(adminData[0].super_access);
//       changeAdminAccAccess(adminData[0].mod_accounts);
//       changeAdminGstAccess(adminData[0].mod_gst);
//       changeAdminPayAccess(adminData[0].mod_payplan);
//     }
//   }, [adminData]);

//   const location = useLocation();

//   //const access = true;

//  const access = true;

//   const accounts_validation =
//     adminAccAccess !== 0 ;

    

//   const gst_validation =
//     adminGstAccess !== 0 ;

//   const payPlan_validation =
//     adminPayAccess !== 0 ;

//   const options = [
//     {
//       linkto: "/admin/account",
//       name: "All Accounts",
//       icon: <IconBrandDatabricks />,
//       access:accounts_validation,
//     },
//     {
//       linkto: "/payplan",
//       name: "Payment Plan",
//       icon: <IconWallet />,
//       access:payPlan_validation,
//     },
//     {
//       linkto: "/admin/moderator",
//       name: "Moderator",
//       icon: <IconBrandAmongUs />,
//       access: adminType === 1 ? true : false,
//     },
//     {
//       linkto: "/admin/hsn",
//       name: "HSN Codes",
//       icon: <IconBoxSeam />,
//       access:gst_validation,
//     },
//     {
//       linkto: "/admin/sac",
//       name: "SAC Codes",
//       icon: <IconDevices2 />,
//       access:gst_validation,
//     },
//   ];

//   const logout = () => {
//     localStorage.removeItem("admin");
//     navigate("/adminlogin");
//   };
//   return (
//     <div className="w-[20vw]">
//       <div className="flex items-center p-5">
//         <IconUserHexagon className="text-[#008cff] h-16 w-16" />
//         <div className="text-[50px] text-[#008cff]">
//           Acc
//           <span className="font-bold text-4xl text-amber-400 uppercase">
//             admin
//           </span>
//         </div>
//       </div>
//       <div className="options p-5 flex flex-col gap-5 ">
//         {
//         options.map((item, index) => (
//           item.access &&
//           <Link to={item.linkto} key={index}>
//             <div
//               className={
//                 location.pathname === item.linkto
//                   ? "item bg-blue-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
//                   : "item hover:bg-blue-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
//               }
//               key={index}
//               style={{ transition: "all 200ms ease-in-out" }}
//             >
//               {item.icon}
//               <div className="text-lg">{item.name}</div>
//             </div>
//           </Link>
//         ))}

//         <div
//           onClick={logout}
//           className="item hover:bg-blue-300/25 flex rounded-xl px-4 py-2 gap-4 items-center text-blue-500 cursor-pointer"
//           style={{ transition: "all 200ms ease-in-out" }}
//         >
//           <IconLogout2 />
//           <div className="text-lg">Logout</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

// import React, { useState, useEffect, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   IconBoxSeam,
//   IconBrandAmongUs,
//   IconBrandDatabricks,
//   IconDevices2,
//   IconLogout2,
//   IconUserHexagon,
//   IconWallet,
// } from "@tabler/icons-react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../../context/UserIdContext";
const AdminSidebar = () => {
  const {
    changeAdminAccess,
    changeAdminId,
    changeAdminType,
    changeAdminAccAccess,
    changeAdminGstAccess,
    changeAdminPayAccess,
    adminType,
    adminAccAccess,
    adminGstAccess,
    adminPayAccess,
  } = useContext(UserContext);
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

  const checkAdmin = parseInt(adminType) !== 0;

  console.log("adminData : ", adminData);
  useEffect(() => {
    if (adminData.length > 0) {
      console.log("inside useeffect");
      changeAdminId(adminData[0].super_id);
      changeAdminType(adminData[0].super_type);
      changeAdminAccess(adminData[0].super_access);
      if (parseInt(adminData[0].super_type) === 1) {
        changeAdminAccAccess(2);
        changeAdminGstAccess(2);
        changeAdminPayAccess(2);
      } else {
        changeAdminAccAccess(adminData[0].mod_accounts);
        changeAdminGstAccess(adminData[0].mod_gst);
        changeAdminPayAccess(adminData[0].mod_payplan);
      }
    }
  }, [adminData]);

  console.log("admin type : " , adminType);

  const location = useLocation();

  //const access = true;

  const access = true;

  const accounts_validation = adminAccAccess !== 0;

  const gst_validation = adminGstAccess !== 0;

  const payPlan_validation = adminPayAccess !== 0;

  const options = [
    {
      linkto: "/admin/account",
      name: "All Accounts",
      icon: <IconBrandDatabricks />,
      access: accounts_validation,
    },
    {
      linkto: "/payplan",
      name: "Payment Plan",
      icon: <IconWallet />,
      access: payPlan_validation,
    },
    {
      linkto: "/admin/moderator",
      name: "Moderator",
      icon: <IconBrandAmongUs />,
      access: adminType == 1 ? true : false,
    },
    {
      linkto: "/admin/hsn",
      name: "HSN Codes",
      icon: <IconBoxSeam />,
      access: gst_validation,
    },
    {
      linkto: "/admin/sac",
      name: "SAC Codes",
      icon: <IconDevices2 />,
      access: gst_validation,
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
        {options.map(
          (item, index) =>
            item.access && (
              <Link to={item.linkto} key={index}>
                {console.log(item.access)}
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
            )
        )}

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
