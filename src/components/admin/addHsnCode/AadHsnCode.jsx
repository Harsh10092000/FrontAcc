import { useContext, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

export const AddHsnCode = (props) => {
  const { changeChange } = useContext(UserContext);

  const [values, setValues] = useState({
    hsn_code: "",
    hsn_desc: "",
    hsn_gst: "",
    hsn_cess: "",
  });

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;

  const addHsn = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + `/api/ad/addHsnCode`,
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
    if (values.hsn_code > 0 && values.hsn_desc.length > 0) {
      setSubmitDisabled(false);
    } else setSubmitDisabled(true);
  }, [values.hsn_code, values.hsn_desc]);

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
                label="Hsn Code"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0 "
                name="hsn_code"
                inputProps={{ maxLength: 10 }}
                value={values.hsn_code}
                onChange={(e) =>
                  setValues({
                    ...values,
                    hsn_code: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                fullWidth
                multiline
                label="Hsn Desc"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                InputProps={{
                  rows: 5,
                }}
                name="hsn_desc"
                inputProps={{ maxLength: 200 }}
                value={values.hsn_desc}
                onChange={(e) =>
                  setValues({
                    ...values,
                    hsn_desc: e.target.value.replace(
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
                name="hsn_gst"
                inputProps={{ maxLength: 10 }}
                value={values.hsn_gst}
                onChange={(e) =>
                  setValues({
                    ...values,
                    hsn_gst: e.target.value.replace(numberValidation, "$1"),
                  })
                }
              />
            </Box>
            <Box className="box-sec">
              <TextField
                label="CESS %"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                name="hsn_cess"
                inputProps={{ maxLength: 10 }}
                value={values.hsn_cess}
                onChange={(e) =>
                  setValues({
                    ...values,
                    hsn_cess: e.target.value.replace(numberValidation, "$1"),
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
          Add Hsn Code
        </button>
      </div>
    </form>
  );
};
