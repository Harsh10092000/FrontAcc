import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { UserContext } from "../../../context/UserIdContext";

const AddSacCode = (props) => {
  const { changeChange } = useContext(UserContext);

  const [values, setValues] = useState({
    sac_code: "",
    sac_desc: "",
    sac_gst: "",
  });

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;

  const addHsn = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + `/api/ad/addSacCode`,
        values
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (values.sac_code > 0 && values.sac_desc.length > 0) {
      setSubmitDisabled(false);
    } else setSubmitDisabled(true);
  }, [values.sac_code, values.sac_desc]);
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
            <Box className="box-sec ">
              <TextField
                label="Sac Code"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0 "
                name="sac_code"
                inputProps={{ maxLength: 10 }}
                value={values.sac_code}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sac_code: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                fullWidth
                multiline
                label="Sac Desc"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                InputProps={{
                  rows: 5,
                }}
                name="sac_desc"
                inputProps={{ maxLength: 200 }}
                value={values.sac_desc}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sac_desc: e.target.value.replace(
                      /^\.|^\,|[^0-9 A-Z a-z.,]/g,
                      ""
                    ),
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                label="GST %"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                name="sac_gst"
                inputProps={{ maxLength: 10 }}
                value={values.sac_gst}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sac_gst: e.target.value.replace(numberValidation, "$1"),
                  })
                }
              />
            </Box>
          </Box>
        </div>
      </div>

      <div className="add-customer-btn-wrapper1">
        <button
          onClick={submitDisabled ? "" : addHsn}
          className={
            submitDisabled
              ? "cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              : "text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
          }
        >
          Add Sac Code
        </button>
      </div>
    </form>
  );
};

export default AddSacCode;
