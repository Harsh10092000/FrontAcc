import { useContext, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

export const AddPaymentPlan = (props) => {
  const { changeChange } = useContext(UserContext);

  const [values, setValues] = useState({
    plan_amt: "",
    plan_dur: "",
  });

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;

  const addPlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + `/api/ad/addPayPLan`,
        values
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled , setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (values.plan_amt > 0 && values.plan_dur > 0) {
        setSubmitDisabled(false);
    } else setSubmitDisabled(true);
  },[values.plan_amt , values.plan_dur]);

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="text_left heading text-green-500 font-semibold text-lg">
        Add New Entry
      </h1>

      <div className="section-wrapper-2">
        <div className="section-2">
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "95%" },
            }}
            noValidate
            autoComplete="off"
            className="w-full p-6"
          >
            <Box className="box-sec">
              <TextField
                label="Amount"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="plan_amt"
                inputProps={{ maxLength: 10 }}
                value={values.plan_amt}
                onChange={(e) =>
                  setValues({
                    ...values,
                    plan_amt: e.target.value.replace(numberValidation, "$1"),
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                label="Duration"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="plan_dur"
                inputProps={{ maxLength: 2 }}
                value={values.plan_dur}
                onChange={(e) =>
                  setValues({
                    ...values,
                    plan_dur: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                required
              />
            </Box>

          </Box>
        </div>
      </div>

      <div className="add-customer-btn-wrapper1">
        <button onClick={submitDisabled ? "" : addPlan} className={submitDisabled ? "cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in" : "text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"}>
          Add Payment Plan
        </button>
      </div>
    </form>
  );
};
