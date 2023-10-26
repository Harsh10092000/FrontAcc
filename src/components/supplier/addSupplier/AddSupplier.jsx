import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserIdContext";

const AddSupplier = (props) => {
  const { changeChange } = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [isChecked2, setIsChecked2] = useState(false);
  const handleOnChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const [err, setErr] = useState(null);
  const [select, setSelect] = useState(false);
  const [values, setValues] = useState({
    sup_name: "",
    sup_number: "",
    sup_amt: "",
    sup_amt_type: "",
    sup_gstin: "",
    sup_sflat: "",
    sup_sarea: "",
    sup_spin: "",
    sup_scity: "",
    sup_sstate: "",
    sup_bflat: "",
    sup_barea: "",
    sup_bpin: "",
    sup_bcity: "",
    sup_bstate: "",
  });

  console.log("isChecked2 : " , isChecked2)
  if (isChecked2 === false) {
    (values.sup_bflat = values.sup_sflat),
      (values.sup_barea = values.sup_sarea),
      (values.sup_bpin = values.sup_spin),
      (values.sup_bcity = values.sup_scity),
      (values.sup_bstate = values.sup_sstate);
  }

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/sup/sendData", values);
      changeChange();
      props.snack();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      values.sup_name !== "" &&
      values.sup_number !== "" &&
      values.sup_amt !== "" &&
      values.sup_amt_type !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.sup_name, values.sup_number, values.sup_amt, values.sup_amt_type]);

  return (
    <form>
      <div>
        <Box sx={{ width: 400 }} role="presentation">
          <h1 className="text_left heading font-semibold text-2xl flex justify-between items-center">
            Add Supplier
          </h1>

          <div className="section-wrapper-2">
            <div className="section-2">
              <div
                sx={{
                  "& > :not(style)": { m: 1, width: "97%" },
                }}
                className="forms"
              >
                <div className="box-sec">
                  <TextField
                    label="Name"
                    id="outlined-basic"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    name="sup_name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="box-sec flex flex-col">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Phone Number"
                    type="tel"
                    className="w-full"
                    size="small"
                    name="sup_number"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        sup_number: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    value={values.sup_number}
                    inputProps={{ maxLength: 10 }}
                    required
                  />
                  <span className="text-red-600 text-xs ml-2 mt-1">
                    {err && err}
                  </span>
                </div>

                <div className="box-sec ">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Enter amount"
                    className="sec-1"
                    size="small"
                    name="sup_amt"
                    //onChange={handleChange}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        sup_amt: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    value={values.sup_amt}
                    required
                  />
                  <select
                    className={
                      select
                        ? "text-green-600 bg-white p-1 border border-slate-400 rounded"
                        : "text-red-600 bg-white p-1 border border-slate-400 rounded"
                    }
                    name="sup_amt_type"
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="pay" onClick={() => setSelect(false)}>
                      Pay
                    </option>
                    <option value="receive" onClick={() => setSelect(true)}>
                      Receive
                    </option>
                  </select>
                </div>
              </div>
              <div className="box-sec check-box-sec">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 cursor-pointer"
                  onChange={handleOnChange}
                />
                <span>Add GSTIN & GST</span>
              </div>

              {isChecked ? (
                <>
                  <div
                    sx={{
                      "& > :not(style)": { m: 1, width: "97%" },
                    }}
                    className="box-sec-2 forms"
                  >
                    <div className="box-sec ">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="GST IN"
                        className="w-full"
                        size="small"
                        name="sup_gstin"
                        onChange={handleChange}
                      />
                    </div>
                    <p className="text-xl font-semibold">Shipping Address</p>
                    <div className="box-sec">
                      <TextField
                        id="outlined-basic"
                        label="Flat / Building Number"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        name="sup_sflat"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="box-sec">
                      <TextField
                        id="outlined-basic"
                        label="Area / Locality"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        name="sup_sarea"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="box-sec">
                      <TextField
                        id="outlined-basic"
                        label="PIN Code"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        name="sup_spin"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="box-sec">
                      <TextField
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        className="sec-1 w-full"
                        size="small"
                        name="sup_scity"
                        onChange={handleChange}
                      />

                      <TextField
                        id="outlined-basic"
                        label="State"
                        variant="outlined"
                        className="sec-2"
                        size="small"
                        name="sup_sstate"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="box-sec check-box-sec text-center ">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2 cursor-pointer"
                      onChange={handleOnChange2}
                      defaultChecked
                    />
                    <span>Billing Address</span>
                  </div>

                  {isChecked2 ? (
                    <div
                      sx={{
                        "& > :not(style)": { m: 1, width: "97%" },
                      }}
                      className="box-sec-2 forms"
                    >
                      <p className="text_left text-xl font-semibold">
                        Billing Address
                      </p>
                      <div className="box-sec">
                        <TextField
                          id="outlined-basic"
                          label="Flat / Building Number"
                          variant="outlined"
                          className="w-full"
                          size="small"
                          name="sup_bflat"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="box-sec">
                        <TextField
                          id="outlined-basic"
                          label="Area / Locality"
                          variant="outlined"
                          className="w-full"
                          size="small"
                          name="sup_barea"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="box-sec">
                        <TextField
                          id="outlined-basic"
                          label="PIN Code"
                          variant="outlined"
                          className="w-full"
                          size="small"
                          name="sup_bpin"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="box-sec">
                        <TextField
                          id="outlined-basic"
                          label="City"
                          variant="outlined"
                          className="sec-1"
                          size="small"
                          name="sup_bcity"
                          onChange={handleChange}
                        />

                        <TextField
                          id="outlined-basic"
                          label="State"
                          variant="outlined"
                          className="sec-2"
                          size="small"
                          name="sup_bstate"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Box>
      </div>
      <div className="add-customer-btn-wrapper1">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            Add Supplier
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleClick}
          >
            Add Supplier
          </button>
        )}
      </div>
    </form>
  );
};

export default AddSupplier;
