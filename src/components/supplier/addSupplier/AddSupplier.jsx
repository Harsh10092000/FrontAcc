import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserIdContext";

const AddSupplier = (props) => {
  const { changeChange, accountId } = useContext(UserContext);
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
    sup_date: "",
    sup_acc_id: "",
  });

  if (isChecked2 === false) {
    (values.sup_bflat = values.sup_sflat),
      (values.sup_barea = values.sup_sarea),
      (values.sup_bpin = values.sup_spin),
      (values.sup_bcity = values.sup_scity),
      (values.sup_bstate = values.sup_sstate);
  }

  const today = new Date();
  var filteredDate = today.toString().slice(4, 16);
  values.sup_date = filteredDate;
  values.sup_acc_id = accountId;
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/sup/sendData",
        values
      );
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
      values.sup_number.length > 9 &&
      values.sup_amt !== "" &&
      values.sup_amt > 0 &&
      values.sup_amt_type !== "" &&
      (values.sup_spin === "" || values.sup_spin.length > 5) &&
      (values.sup_bpin === "" || values.sup_bpin.length > 5)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.sup_name, values.sup_number, values.sup_amt, values.sup_amt_type, values.sup_spin, values.sup_bpin]);

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
                    inputProps={{ maxLength: 20 }}
                    value={values.sup_name}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        sup_name: e.target.value.replace(/[^A-Z a-z.]/g, ""),
                      })
                    }
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
                    inputProps={{ maxLength: 10}}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        sup_amt: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
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
                        inputProps={{ maxLength: 15 }}
                        value={values.sup_gstin}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            sup_gstin: e.target.value.replace(/[^A-Z0-9]/g, ""),
                          })
                        }
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
                        inputProps={{ maxLength: 40 }}
                        value={values.sup_sflat}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            sup_sflat: e.target.value.replace(
                              /[^A-Z a-z 0-9 /]/g,
                              ""
                            ),
                          })
                        }
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
                        value={values.sup_sarea}
                        inputProps={{ maxLength: 40 }}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            sup_sarea: e.target.value.replace(
                              /[^A-Z a-z 0-9 /]/g,
                              ""
                            ),
                          })
                        }
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
                        inputProps={{ maxLength: 6 }}
                        value={values.sup_spin}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            sup_spin: e.target.value.replace(/[^0-9]/g, ""),
                          })
                        }
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
                        value={values.sup_scity}
                        inputProps={{ maxLength: 30 }}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            sup_scity: e.target.value.replace(
                              /[^A-Z a-z]/g,
                              ""
                            ),
                          })
                        }
                      />

                      <TextField
                        id="outlined-basic"
                        label="State"
                        variant="outlined"
                        className="sec-2"
                        size="small"
                        name="sup_sstate"
                        value={values.sup_sstate}
                        inputProps={{ maxLength: 30 }}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            sup_sstate: e.target.value.replace(
                              /[^A-Z a-z]/g,
                              ""
                            ),
                          })
                        }
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
                          value={values.sup_bflat}
                          inputProps={{ maxLength: 40 }}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              sup_bflat: e.target.value.replace(
                                /[^A-Z a-z 0-9 /]/g,
                                ""
                              ),
                            })
                          }
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
                          value={values.sup_barea}
                          inputProps={{ maxLength: 40 }}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              sup_barea: e.target.value.replace(
                                /[^A-Z a-z 0-9 /]/g,
                                ""
                              ),
                            })
                          }
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
                          inputProps={{ maxLength: 6 }}
                          value={values.sup_bpin}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              sup_bpin: e.target.value.replace(/[^0-9]/g, ""),
                            })
                          }
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
                          value={values.sup_bcity}
                          inputProps={{ maxLength: 30 }}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              sup_bcity: e.target.value.replace(
                                /[^A-Z a-z]/g,
                                ""
                              ),
                            })
                          }
                        />

                        <TextField
                          id="outlined-basic"
                          label="State"
                          variant="outlined"
                          className="sec-2"
                          size="small"
                          name="sup_bstate"
                          value={values.sup_bstate}
                          inputProps={{ maxLength: 30 }}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              sup_bstate: e.target.value.replace(
                                /[^A-Z a-z]/g,
                                ""
                              ),
                            })
                          }
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
