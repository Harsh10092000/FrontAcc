import { Box, TextField } from "@mui/material";
import "./addcustomer.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
import dayjs from "dayjs";

const AddCustomer = (props) => {
  const { changeChange, accountId } = useContext(UserContext);
  const [values, setValues] = useState({
    cust_name: "",
    cust_number: "",
    cust_amt: "",
    amt_type: "",
    cust_gstin: "",
    cust_sflat: "",
    cust_sarea: "",
    cust_spin: "",
    cust_scity: "",
    cust_sstate: "",
    cust_bflat: "",
    cust_barea: "",
    cust_bpin: "",
    cust_bcity: "",
    cust_bstate: "",
    cust_date: "",
    cust_acc_id: "",
  });

  const today = new Date();
  var filteredDate = today.toString().slice(4, 16);

  
 
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND + "/api/auth/send", values);
      changeChange();
      props.snack();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [isChecked2, setIsChecked2] = useState(false);
  const handleOnChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  if (isChecked2 === false) {
    
    (values.cust_bflat = values.cust_sflat),
    (values.cust_barea = values.cust_sarea),
    (values.cust_bpin = values.cust_spin),
    (values.cust_bcity = values.cust_scity),
    (values.cust_bstate = values.cust_sstate);
  }
  values.cust_acc_id = accountId,
  values.cust_date = filteredDate;

  const [select, setSelect] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      values.cust_name !== "" &&
      values.cust_number !== "" &&
      values.cust_number.length > 9 &&
      values.cust_amt !== "" &&
      values.cust_amt > 0 &&
      values.amt_type !== "" &&
      (values.cust_spin === "" || values.cust_spin.length > 5) &&
      (values.cust_bpin === "" || values.cust_bpin.length > 5)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.cust_name, values.cust_number, values.cust_amt, values.amt_type, values.cust_spin, values.cust_bpin]);

  
  return (
    <div>
      <form method="post">
        <Box sx={{ width: 400 }} role="presentation">
          <h1 className="heading font-semibold text-2xl flex justify-between items-center">
            <div>Add Customer</div>
          </h1>
          <div className="section-wrapper-2">
            <div className="section-2">
              <div className="forms">
                <div className="box-sec">
                  <TextField
                    label="Full Name"
                    id="outlined-basic"
                    variant="outlined"
                    className="w-full m-0"
                    size="small"
                    name="cust_name"
                    inputProps={{ maxLength: 20 }}
                    value={values.cust_name}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        cust_name: e.target.value.replace(/[^A-Z a-z.]/g, ""),
                      })
                    }
                    required
                  />
                </div>
                   
                <div className="box-sec flex-col">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Phone Number"
                    name="cust_number"
                    className="w-full"
                    size="small"
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        cust_number: e.target.value.replace(/[^0-9]/g, ""),
                        
                      })
                    }
                   
                    value={values.cust_number}
                    required
                  />
                  <div className="text-red-600 text-sm ml-2">{err && err}</div>
                </div>
                <div className="box-sec ">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Opening Balance"
                    name="cust_amt"
                    className="sec-1"
                    size="small"
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        cust_amt: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                      })
                    }
                    value={values.cust_amt}
                    required
                  />
                  <select
                    className={
                      select
                        ? "text-green-600 bg-white p-1 border border-slate-400 rounded"
                        : "text-red-600 bg-white p-1 border border-slate-400 rounded"
                    }
                    name="amt_type"
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
                  <div className="box-sec-2 forms">
                    <div className="box-sec ">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="GST IN"
                        className="w-full"
                        size="small"
                        name="cust_gstin"
                        inputProps={{ maxLength: 15 }}
                        value={values.cust_gstin}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cust_gstin: e.target.value.replace(
                              /[^A-Z0-9]/g,
                              ""
                            ),
                          })
                        }
                      />
                    </div>
                    <p className="text-left mt-2">Shipping Address</p>
                    <div className="box-sec">
                      <TextField
                        id="outlined-basic"
                        label="Flat / Building Number"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        name="cust_sflat"
                        value={values.cust_sflat}
                        inputProps={{ maxLength: 40}}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cust_sflat: e.target.value.replace(
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
                        name="cust_sarea"
                        value={values.cust_sarea}
                        inputProps={{ maxLength: 40}}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cust_sarea: e.target.value.replace(
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
                        name="cust_spin"
                        inputProps={{ maxLength: 6 }}
                        value={values.cust_spin}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cust_spin: e.target.value.replace(/[^0-9]/g, ""),
                          })
                        }
                        //error={values.cust_spin.length > 5 ?  false : true}

                      />
                    </div>
                    <div className="box-sec">
                      <TextField
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        className="sec-1 w-full"
                        size="small"
                        name="cust_scity"
                        value={values.cust_scity}
                        inputProps={{ maxLength: 30}}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cust_scity: e.target.value.replace(
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
                        name="cust_sstate"
                        value={values.cust_sstate}
                        inputProps={{ maxLength: 30}}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cust_sstate: e.target.value.replace(
                              /[^A-Z a-z]/g,
                              ""
                            ),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="box-sec check-box-sec text-center">
                    <input
                      type="checkbox"
                      onChange={handleOnChange2}
                      className="w-4 h-4 mr-2 cursor-pointer"
                      defaultChecked
                    />
                    <span>Billing Address same as Shipping Address</span>
                  </div>

                  {isChecked2 ? (
                    <div className="box-sec-2 forms">
                      <p className="text_left">Billing Address</p>
                      <div className="box-sec">
                        <TextField
                          id="outlined-basic"
                          label="Flat / Building Number"
                          variant="outlined"
                          className="w-full"
                          size="small"
                          name="cust_bflat"
                          value={values.cust_bflat}
                          inputProps={{ maxLength: 40}}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              cust_bflat: e.target.value.replace(
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
                          name="cust_barea"
                          value={values.cust_barea}
                          inputProps={{ maxLength: 40}}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              cust_barea: e.target.value.replace(
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
                          name="cust_bpin"
                          inputProps={{ maxLength: 6 }}
                          value={values.cust_bpin}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              cust_bpin: e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ),
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
                          name="cust_bcity"
                          value={values.cust_bcity}
                          inputProps={{ maxLength: 30}}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              cust_bcity: e.target.value.replace(
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
                          name="cust_bstate"
                          value={values.cust_bstate}
                          inputProps={{ maxLength: 30}}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              cust_bstate: e.target.value.replace(
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
          <div className="add-customer-btn-wrapper1">
            {submitDisabled ? (
              <button
                disabled={submitDisabled}
                className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              >
                Add Customer
              </button>
            ) : (
              <button
                onClick={handleClick}
                disabled={submitDisabled}
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
              >
                Add Customer
              </button>
            )}
          </div>
        </Box>
      </form>
    </div>
  );
};

export default AddCustomer;
