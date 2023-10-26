import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
