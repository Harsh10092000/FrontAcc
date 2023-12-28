import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserIdContext";
import { useNavigate } from "react-router-dom";
const GetData = () => {
  const navigate = useNavigate();
  const {
    changeAccountId,
    changeParties,
    changeInventory,
    changeBills,
    uId,
    changeUId,
    bills,
    testId,
  } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [staffData, setStaffData] = useState([]);
  console.log("bills : " , bills , currentUser)

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchStaffData/${currentUser[0].log_id}`)
      .then((res) => {
        setStaffData(res.data);
      });
  }, [testId]);

  
  useEffect(() => {
    if (staffData.length > 0) {
      console.log(staffData , staffData[0].staff_acc_id);
      changeParties(staffData[0].staff_parties);
      changeInventory(staffData[0].staff_inventory);
      changeBills(staffData[0].staff_bills);
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${staffData[0].staff_acc_id}`)
      .then((res) => {
        changeAccountId(res.data[0].business_id);
      });
    } else {
      axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetch/${currentUser[0].log_id}`)
      .then((res) => {
        changeAccountId(res.data[0].business_id);
      });
    }
  }, [staffData]);
  console.log("bills : " , bills)

//navigate("/");

  
};

export default GetData;
