import { Box, TextField } from "@mui/material";
// import "./addstaff.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/UserIdContext";
import InputAdornment from "@mui/material/InputAdornment";

const AddModerator = (props) => {
  const { changeChange, accountId, uId } = useContext(UserContext);
  const [values, setValues] = useState({
    mod_name: "",
    mod_email: "",
    mod_accounts: "",
    mod_gst: "",
    mod_payplan: "",
    super_type: 0,
  });
 
  const [gst, setGst] = useState(0);
  const [payplan, setPayplan] = useState(0);
  const [accounts, setAccounts] = useState(0);

  
  values.mod_accounts = accounts !== 0 ? accounts : 0;
  values.mod_gst = gst !== 0 ? gst : 0;
  values.mod_payplan = payplan !== 0 ? payplan : 0;

  const [err, setErr] = useState(null);
  const [cotp, setCotp] = useState("");
  // const fetchOtp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     axios
  //       .get(
  //         import.meta.env.VITE_BACKEND + `/api/st/sendOtp/${values.mod_email}`
  //       )
  //       .then((res) => {
  //         setCotp(res.data);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [otp, setOtp] = useState(0);

  const [validateOtp, setValidateOtp] = useState(true);
  // useEffect(() => {
  //   if (parseInt(cotp) === parseInt(otp)) {
  //     setValidateOtp(true);
  //   } else {
  //     setValidateOtp(false);
  //   }
  // }, [otp, cotp]);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      values.mod_name !== "" &&
      values.mod_email !== "" &&
      validateOtp === true &&
      (values.mod_accounts !== 0 ||
        values.mod_gst !== 0 ||
        values.mod_payplan !== 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    values.mod_name,
    values.mod_email,
    values.mod_accounts,
    values.mod_gst,
    values.mod_payplan,
    validateOtp,
  ]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/ad/addModerator",
        values
      );
      changeChange();
      props.snack();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="heading font-semibold text-2xl flex justify-between items-center">
        <div>Add Moderator</div>
      </h1>

      <div className="cashout-section-wrapper pt-4">
        <div className="section-2">
          <div className="w-full">
            <Box className="box-sec px-4 py-2">
              <TextField
                label="Moderator Name"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="mod_name"
                type="text"
                onChange={(e) =>
                  setValues({
                    ...values,
                    mod_name: e.target.value.replace(/[^A-Z a-z]/g, ""),
                  })
                }
                value={values.mod_name}
                required
              />
            </Box>

            <Box className="box-sec px-4 py-2">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Email"
                name="mod_email"
                className="w-full"
                size="small"
                type="email"
                onChange={(e) => (
                  setValues({
                    ...values,
                    //staff_email: e.target.value.replace(/[^A-Z a-z 0-9]/g, "").replace(/@[A-Za-z]/g, "").replace(/.[A-Za-z]/g, ""),
                    //staff_email: e.target.value.replace(/^\.|[^0-9A-Z a-z@.]/g, "").replace(/(\@\d*\@)/, "$1").replace(/^(\d*\@\d{0,2}).*$/, "$1"),
                    mod_email: e.target.value
                      .replace(/^\@|[^0-9A-Z a-z.@]/g, "")
                      .replace(/(\@\d*\@)/, "$1")
                      .replace(/^(\d*\@\d{0,2})@*$/, "$1"),
                  }),
                  setCotp("")
                )}
                helperText={
                  cotp.toString().length > 7 && cotp !== null
                    ? "Email Alraedy Exists"
                    : cotp
                }
                value={values.mod_email}
                required
              />
            </Box>

            {/* {cotp.toString().length === 6 ? (
              <Box className="box-sec px-4 py-2">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="OTP"
                  name="staff_email"
                  className="w-full"
                  size="small"
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={cotp == otp ? true : false}
                  inputProps={{ maxLength: 6 }}
                  InputProps={
                    cotp == otp
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              Verified
                            </InputAdornment>
                          ),
                        }
                      : ""
                  }
                  helperText={
                    otp.length > 5 && (cotp == otp) === false ? "Wrong OTP" : ""
                  }
                />
              </Box>
            ) : (
              ""
            )}
            <div className="px-4 py-2 ">
              <button
                onClick={fetchOtp}
                className="shadow shadow-blue-600 text-blue-600 w-full py-2 rounded hover:bg-blue-600 hover:text-white transition-all ease-in-out duration-500"
              >
                Send OTP
              </button>
            </div> */}

            {validateOtp === true ? (
              <div className="pt-4">
                <div className="px-4 py-2 bg-slate-200 text-lg ">
                  Permissions
                </div>
                <div className="border-b border-slate-200 py-2 px-4">
                  <div className="flex p-2 justify-between">
                    <div className="text-lg font-semibold">Accounts</div>
                    <div
                      onClick={() => setAccounts(0)}
                      className="shadow shadow-rose-600 hover:bg-rose-600 hover:text-white transition-all ease-in-out duration-500 p-1 text-rose-600 cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="accounts_1"
                      name="accounts"
                      onChange={() => setAccounts(1)}
                      checked={accounts === 1 ? true : false}
                    />
                    <label htmlFor="accounts_1">View Entries & Send Reminders</label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="accounts_2"
                      name="accounts"
                      onClick={() => setAccounts(2)}
                      checked={accounts === 2 ? true : false}
                    />
                    <label htmlFor="accounts_2">Add & View: Entries/Parties</label>
                  </div>
                 
                </div>
                <div className="border-b border-slate-200 py-2 px-4">
                  <div className="flex p-2 justify-between">
                    <div className="text-lg font-semibold">Gst</div>
                    <div
                      onClick={() => setGst(0)}
                      className="shadow shadow-rose-600 hover:bg-rose-600 hover:text-white transition-all ease-in-out duration-500 p-1 text-rose-600 cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>

                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="gst_1"
                      name="gst"
                      onChange={() => setGst(1)}
                      checked={gst === 1 ? true : false}
                    />
                    <label htmlFor="in_1">Add Items & Stock In/Out</label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="gst_2"
                      name="gst"
                      onClick={() => setGst(2)}
                      checked={gst === 2 ? true : false}
                    />
                    <label htmlFor="in_2">
                      Add, Edit & Delete: Items, Stock In/Out
                    </label>
                  </div>
                </div>

                <div className="border-b border-slate-200 py-2 px-4">
                  <div className="flex p-2 justify-between">
                    <div className="text-lg font-semibold">Payment Plan</div>
                    <div
                      onClick={() => setPayplan(0)}
                      className="shadow shadow-rose-600 hover:bg-rose-600 hover:text-white transition-all ease-in-out duration-500 p-1 text-rose-600 cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="payplan_1"
                      name="payplan"
                      onChange={() => setPayplan(1)}
                      checked={payplan === 1 ? true : false}
                    />
                    <label htmlFor="payplan_2">
                      View & Add for All Bills (Sales/Purchase/Returns) &
                      Cashbook
                    </label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="payplan_2"
                      name="payplan"
                      onClick={() => setPayplan(2)}
                      checked={payplan === 2 ? true : false}
                    />
                    <label htmlFor="payplan_2">
                      Add, Edit & Delete for Bills, Cashbook & Reports
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="cashout-btn-wrapper">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px] transition-all ease-in"
          >
            Add Staff
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleClick}
          >
            Add Staff
          </button>
        )}
      </div>
    </form>
  );
};

export default AddModerator
