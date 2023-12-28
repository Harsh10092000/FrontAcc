import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { UserContext } from "../../context/UserIdContext";

const Admin = () => {
  const { changeChange } = useContext(UserContext);
  const [accData, setAccData] = useState([]);
  const [planData, setPlanData] = useState([]);
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
  }, []);

  const restrictCompany = (id) => {};

  const [businessId, setBusinessId] = useState(0);
  const [data, setData] = useState({
    restrict: "restrict",
  });
  const restrictAcc = async (e) => {
    e.preventDefault();
    console.log(businessId);
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

  return (
    <div>
      {accData.map((item) => (
        <div className="flex gap-6">
          <div>{item.business_name}</div>
          <div onClick={() => setBusinessId(item.business_id)}>View</div>
          <div onClick={restrictAcc}>Restrict</div>
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
            addPayPlan={addPayPlan.plan_dur}
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
    </div>
  );
};

export default Admin;
