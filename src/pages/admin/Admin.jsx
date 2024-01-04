import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { UserContext } from "../../context/UserIdContext";

const Admin = () => {
  const { changeChange , change } = useContext(UserContext);
  const [accData, setAccData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [allCouponData, setAllCouponData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetch`)
      .then((response) => {
        setAccData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchPayPlan`)
      .then((response) => {
        setPlanData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchCoupon`)
      .then((response) => {
        setAllCouponData(response.data);
      });
  }, [change]);

  const restrictCompany = (id) => {};

  const [businessId, setBusinessId] = useState(0);
  const [data, setData] = useState({
    restrict: 0,
  });
  const [data1, setData1] = useState({
    unrestrict: 1,
  });
  const restrictAcc = async (businessId) => {
    
    
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/restrictAcc/${businessId}`,
        data
      );
      changeChange();
      //props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const unrestrictAcc = async (businessId) => {
    
    console.log(businessId);
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/unrestrictAcc/${businessId}`,
        data1
      );
      changeChange();
      //props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const [addPayPlan, setAddPayPlan] = useState({
    plan_dur: "",
    plan_price: "",
  });

  const addPlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + `/api/ad/addPayPLan`,
        addPayPlan
      );
      changeChange();
      //props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePlan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/updatePayPLan/`,
        data
      );
      changeChange();
      //props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const delPlan = async (planId) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/ad/delPayPLan/${planId}`
      );
      changeChange();
    } catch (err) {
      console.log(err);
    }
  };



  const [addCouponData, setAddCouponData] = useState({
    offer_code: "",
    offer_value: "",
    offer_type: "",
  });

  const [updatedCouponData , setUpdatedCouponData] = useState({
    offer_code: "",
    offer_value: "",
    offer_type: "",
    code_id: "",
  });

  const addCoupon = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + `/api/ad/addCoupon`,
        addCouponData
      );
      changeChange();
      //props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const editCoupon = async (codeId) => {
    updatedCouponData.code_id = codeId
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/updateCoupon`,
        updatedCouponData
      );
      changeChange();
      //props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const delCoupon = async (codeId) => {
    
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/ad/delCoupon/${codeId}`
      );
      changeChange();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      {accData.map((item) => (
        <div className="flex gap-6">
          <div>{item.business_name}</div>
          <div>{item.business_id}</div>
          <div onClick={() => setBusinessId(item.business_id)}>View</div>
          <div onClick={(e) => (e.preventDefault() , restrictAcc(item.business_id))}>Restrict</div>
          <div onClick={(e) => (e.preventDefault() , unrestrictAcc(item.business_id))}>Unrestrict</div>
        </div>
      ))}

      {accData
        .filter((code) => businessId === code.business_id)
        .map((item) => (
          <div>
            <div>{item.business_name}</div>
            <div>{item.business_type}</div>
            <div>{item.business_nature}</div>
            <div>{item.business_type}</div>
            <div>{item.business_gst}</div>
            <div>{item.business_address}</div>
          </div>
        ))}

      <div className="p-3">
        {planData.map((item) => (
          <div className="flex gap-5  ">
            <div>{item.plan_dur} Months</div>
            <div>{item.plan_price} Rs</div>
            <button>Edit</button>
            <button onClick={() => delPlan(item.plan_id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className=" w-80">
        <div>Add Plans</div>
        <Box className="box-sec">
          <TextField
            label="Plan Duration In Months"
            id="outlined-basic"
            variant="outlined"
            className="w-full m-0"
            size="small"
            name="plan_dur"
            type="text"
            onChange={(e) =>
              setAddPayPlan({
                ...addPayPlan,
                plan_dur: e.target.value,
              })
            }
            value={addPayPlan.plan_dur}
            required
          />
        </Box>

        <Box className="box-sec pt-5">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Plan Amount"
            name="plan_price"
            className="w-full"
            size="small"
            type="text"
            onChange={(e) =>
              setAddPayPlan({
                ...addPayPlan,
                plan_price: e.target.value.replace(/\D/g, ""),
              })
            }
            value={addPayPlan.plan_price}
            required
          />
        </Box>
        <div>
          <button onClick={addPlan}>Submit</button>
        </div>
      </div>

      <div className=" w-80">
        <div>Create Coupon code</div>
        <Box className="box-sec">
          <TextField
            label="Offer Code"
            id="outlined-basic"
            variant="outlined"
            className="w-full m-0"
            size="small"
            name="offer_code"
            type="text"
            onChange={(e) =>
              setAddCouponData({
                ...addCouponData,
                offer_code: e.target.value,
              })
            }
            value={addCouponData.offer_code}
            required
          />
        </Box>

        
        <Box className="flex">
          <select
            className=" py-[8.5px] border"
            name="discount_unit"
            onChange={(e) =>
              setAddCouponData({ ...addCouponData, offer_type: e.target.value })
            }
            defaultValue="amount"
          >
            <option value="amount">Amount</option>
            <option value="percentage">Percentage</option>
          </select>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={addCouponData.offer_value}
            onChange={(e) =>
              setAddCouponData({
                ...addCouponData,
                offer_value: e.target.value.replace(/\D/g, ""),
              })
            }
            name="offer_value"
            className=" w-[35%]"
            required
          />
        </Box>
        <div>
          <button onClick={addCoupon}>Submit</button>
        </div>
      
      </div>

      <div className="p-3">
        {allCouponData.map((item) => (
          <div className="flex gap-5  ">
            <div>{item.code_name} Months</div>
            <div>{ item.code_type === "amount" ? "Rs " + item.code_value : item.code_value + " %"} </div>
            <button onClick={() => editCoupon(item.code_id)}>Edit</button>
            <button onClick={() => delCoupon(item.code_id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Admin;
