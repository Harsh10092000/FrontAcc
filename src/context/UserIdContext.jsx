import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const changeUser = (id) => {
    setUserId(id);
  };
  const [supId, setSupId] = useState(0);
  const changeSup = (sup) => {
    setSupId(sup);
  };
  const [pId, setPId] = useState(0);
  const changeProduct = (pid) => {
    setPId(pid);
  };
  const [serId, setSerId] = useState(0);
  const changeService = (serid) => {
    setSerId(serid);
  };
  const [change, setChange] = useState(0);
  const changeChange = () => {
    setChange((prev) => prev + 1);
  };
  const [tranId, setTranId] = useState(0);
  const changeTranId = (tid) => {
    setTranId(tid);
  };
  const [cashId, setCashId] = useState(0);
  const changeCashId = (cashId) => {
    setCashId(cashId);
  };
  const [expId, setExpId] = useState(0);
  const changeExpId = (expid) => {
    setExpId(expid);
  };
  const [saleId, setSaleId] = useState(0);
  const changeSaleId = (saleid) => {
    setSaleId(saleid);
  };

  const [purchaseId, setPurchaseId] = useState(0);
  const changePurchaseId = (purchaseid) => {
    setPurchaseId(purchaseid);
  };
  const [accountId, setAccountId] = useState(0);
  const changeAccountId = (accountId) => {
    setAccountId(accountId);
  };

  const [parties, setParties] = useState(3);
  const changeParties = (parties) => {
    setParties(parties);
  };
  const [inventory, setInventory] = useState(2);
  const changeInventory = (inventory) => {
    setInventory(inventory);
  };
  const [bills, setBills] = useState(2);
  const changeBills = (bills) => {
    setBills(bills);
  };

  const [staffId, setStaffId] = useState(0);
  const changeStaffId = (staffId) => {
    setStaffId(staffId);
  };

  const [testId, setTestId] = useState(0);
  const changeTestId = (uId) => {
    setTestId(uId);
  };

  //user
  const [uId, setUId] = useState(1);
  const changeUId = (uId) => {
    setUId(uId);
  };

  const [access, setAccess] = useState(1);
  const changeAccess = (access) => {
    setAccess(access);
  };

  const [userType, setUserType] = useState(0);
  const changeUserType = (userType) => {
    setUserType(userType);
  };

  //gst code
  const [hsnId, setHsnId] = useState(0);
  const changeHsnId = (hsnId) => {
    setHsnId(hsnId);
  };

  const [sacId, setSacId] = useState(0);
  const changeSacId = (sacId) => {
    setSacId(sacId);
  };

  //admin
  const [adminAccess, setAdminAccess] = useState(0);
  const changeAdminAccess = (adminAccess) => {
    setAdminAccess(adminAccess);
  };

  const [adminId, setAdminId] = useState(0);
  const changeAdminId = (adminId) => {
    setAdminId(adminId);
  };

  const [adminType, setAdminType] = useState(0);
  const changeAdminType = (adminType) => {
    setAdminType(adminType);
  };
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      setAccountId(currentUser[0].business_id);
      changeUId(currentUser[0].log_id);
      changeAccess(currentUser[0].access);
      changeUserType(currentUser[0].log_user);
      console.log(currentUser[0].log_user, currentUser[0].access);
      if (currentUser[0].log_user === 0) {
        changeParties(currentUser[0].staff_parties);
        changeBills(currentUser[0].staff_bills);
        changeInventory(currentUser[0].staff_inventory);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        changeUser,
        tranId,
        changeTranId,
        supId,
        changeSup,
        pId,
        changeProduct,
        serId,
        changeService,
        change,
        changeChange,
        cashId,
        changeCashId,
        expId,
        changeExpId,
        saleId,
        changeSaleId,
        purchaseId,
        changePurchaseId,
        accountId,
        changeAccountId,
        parties,
        changeParties,
        inventory,
        changeInventory,
        bills,
        changeBills,
        staffId,
        changeStaffId,
        uId,
        changeUId,
        testId,
        changeTestId,
        access,
        changeAccess,
        userType,
        changeUserType,
        sacId,
        changeSacId,
        hsnId,
        changeHsnId,
        adminAccess,
        changeAdminAccess,
        adminId,
        changeAdminId,
        adminType,
        changeAdminType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
