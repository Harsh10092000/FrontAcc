import { IconBriefcase, IconPlus } from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import SettingAcCard from "../settingAcCard/SettingAcCard";
const SettingAccount = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    changeAccountId,
    changeUser,
    changeSup,
    changeProduct,
    changeService,
    changeCashId,
    changeExpId,
    changeSaleId,
    changePurchaseId,
    changeStaffId,
    access,
    changeAccess,
    userType,
    change,
  } = useContext(UserContext);

  const [info, setInfo] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/act/fetchStaffData/${currentUser[0].log_id}`
      )
      .then((res) => {
        setStaffData(res.data);
      });
  }, [currentUser[0].log_id]);

  useEffect(() => {
    if (staffData.length > 0) {
      axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/act/fetchData/${staffData[0].staff_acc_id}`
        )
        .then((res) => {
          setInfo(res.data);
        });
    } else {
      axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/act/fetch/${currentUser[0].log_id}`
        )
        .then((res) => {
          setInfo(res.data);
        });
    }
  }, [staffData, change]);



  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/act/newUserLoginData/${currentUser[0].log_email}`
      )
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  useEffect(() => {
    console.log(userData, currentUser);
    if (parseInt(currentUser[0].log_user) === 1) {
      changeAccess(
        parseInt(currentUser[0].access) === 1 ? currentUser[0].access : 1
      );
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const changeId = (id) => {
    changeAccountId(id);
    changeUser(0);
    changeSup(0);
    changeProduct(0);
    changeService(0);
    changeCashId(0);
    changeExpId(0);
    changeSaleId(0);
    changePurchaseId(0);
    changeStaffId(0);
  };
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-5 justify-between">
        <div className="flex items-center gap-4">
          <div className="p-5 bg-teal-300/20 rounded text-teal-600">
            <IconBriefcase />
          </div>
          <div className="text-xl">Account Settings</div>
        </div>

        <Link to={parseInt(userType) === 1 ? "/addAccount" : ""}>
          <button
            className={
              parseInt(userType) === 1
                ? "shadow-sm shadow-emerald-600 p-2 rounded text-emerald-600 cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-500 flex items-center"
                : "shadow-sm shadow-slate-600 p-2 rounded text-slate-600 transition-all duration-500 flex items-center cursor-not-allowed"
            }
          >
            <IconPlus />
            Add Account
          </button>
        </Link>
      </div>
      <div className="bg-slate-100 mx-5 rounded-2xl p-3 h-[80vh] flex flex-col gap-4">
        <div className="shadow px-4 py-2 bg-white rounded flex items-center gap-4 text-blue-600/80">
          <div className="text-2xl">Accounts</div>
          <div className="px-5 bg-blue-600/10 rounded-full py-1 font-semibold">
            {info.length}
          </div>
        </div>
        <div className="h-[70vh] overflow-y-scroll flex flex-col gap-4">
          {info.map((item, index) => (
            <SettingAcCard
              data={item}
              key={index}
              change={() => changeId(item.business_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingAccount;
