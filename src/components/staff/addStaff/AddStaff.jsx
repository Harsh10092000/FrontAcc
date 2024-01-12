import { Box, TextField } from "@mui/material";
import "./addstaff.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
import InputAdornment from "@mui/material/InputAdornment";

const AddStaff = (props) => {
  const { changeChange, accountId, uId } = useContext(UserContext);
  const [values, setValues] = useState({
    staff_name: "",
    staff_email: "",
    staff_parties: "",
    staff_inventory: "",
    staff_bills: "",
    staff_acc_id: "",
    staff_owner_id: "",
  });

  const [inventory, setInventory] = useState(0);
  const [bills, setBills] = useState(0);
  const [parties, setParties] = useState(0);

  values.staff_acc_id = accountId;
  values.staff_parties = parties !== 0 ? parties : 0;
  values.staff_inventory = inventory !== 0 ? inventory : 0;
  values.staff_bills = bills !== 0 ? bills : 0;
  values.staff_owner_id = uId;
  const [err, setErr] = useState(null);
  const [cotp, setCotp] = useState("");
  const fetchOtp = async (e) => {
    e.preventDefault();
    try {
      axios
        .get(
          import.meta.env.VITE_BACKEND + `/api/st/sendOtp/${values.staff_email}`
        )
        .then((res) => {
          setCotp(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [otp, setOtp] = useState(0);

  const [validateOtp, setValidateOtp] = useState(false);
  useEffect(() => {
    if (parseInt(cotp) === parseInt(otp)) {
      setValidateOtp(true);
    } else {
      setValidateOtp(false);
    }
  }, [otp, cotp]);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      values.staff_name !== "" &&
      values.staff_email !== "" &&
      validateOtp === true &&
      (values.staff_parties !== 0 ||
        values.staff_inventory !== 0 ||
        values.staff_bills !== 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    values.staff_name,
    values.staff_email,
    values.staff_parties,
    values.staff_inventory,
    values.staff_bills,
    validateOtp,
  ]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/st/sendData",
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
        <div>Add Staff</div>
      </h1>

      <div className="cashout-section-wrapper pt-4">
        <div className="section-2">
          <div className="w-full">
            <Box className="box-sec px-4 py-2">
              <TextField
                label="Staff Name"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="staff_name"
                type="text"
                onChange={(e) =>
                  setValues({
                    ...values,
                    staff_name: e.target.value.replace(/[^A-Z a-z]/g, ""),
                  })
                }
                value={values.staff_name}
                required
              />
            </Box>

            <Box className="box-sec px-4 py-2">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Email"
                name="staff_email"
                className="w-full"
                size="small"
                type="email"
                onChange={(e) => (
                  setValues({
                    ...values,
                    //staff_email: e.target.value.replace(/[^A-Z a-z 0-9]/g, "").replace(/@[A-Za-z]/g, "").replace(/.[A-Za-z]/g, ""),
                    //staff_email: e.target.value.replace(/^\.|[^0-9A-Z a-z@.]/g, "").replace(/(\@\d*\@)/, "$1").replace(/^(\d*\@\d{0,2}).*$/, "$1"),
                    staff_email: e.target.value
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
                value={values.staff_email}
                required
              />
            </Box>

            {cotp.toString().length === 6 ? (
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
            </div>

            {validateOtp === true ? (
              <div className="pt-4">
                <div className="px-4 py-2 bg-slate-200 text-lg ">
                  Permissions
                </div>
                <div className="border-b border-slate-200 py-2 px-4">
                  <div className="flex p-2 justify-between">
                    <div className="text-lg font-semibold">Parties</div>
                    <div
                      onClick={() => setParties(0)}
                      className="shadow shadow-rose-600 hover:bg-rose-600 hover:text-white transition-all ease-in-out duration-500 p-1 text-rose-600 cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="pr_1"
                      name="parties"
                      onChange={() => setParties(1)}
                      checked={parties === 1 ? true : false}
                    />
                    <label htmlFor="pr_1">View Entries & Send Reminders</label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="pr_2"
                      name="parties"
                      onClick={() => setParties(2)}
                      checked={parties === 2 ? true : false}
                    />
                    <label htmlFor="pr_2">Add & View: Entries/Parties</label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="pr_3"
                      name="parties"
                      onClick={() => setParties(3)}
                      checked={parties === 3 ? true : false}
                    />
                    <label htmlFor="pr_3">
                      Add, View, Edit & Delete: Entries/Parties & Reports
                    </label>
                  </div>
                </div>
                <div className="border-b border-slate-200 py-2 px-4">
                  <div className="flex p-2 justify-between">
                    <div className="text-lg font-semibold">Inventory</div>
                    <div
                      onClick={() => setInventory(0)}
                      className="shadow shadow-rose-600 hover:bg-rose-600 hover:text-white transition-all ease-in-out duration-500 p-1 text-rose-600 cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>

                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="in_1"
                      name="inventory"
                      onChange={() => setInventory(1)}
                      checked={inventory === 1 ? true : false}
                    />
                    <label htmlFor="in_1">Add Items & Stock In/Out</label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="in_2"
                      name="inventory"
                      onClick={() => setInventory(2)}
                      checked={inventory === 2 ? true : false}
                    />
                    <label htmlFor="in_2">
                      Add, Edit & Delete: Items, Stock In/Out
                    </label>
                  </div>
                </div>

                <div className="border-b border-slate-200 py-2 px-4">
                  <div className="flex p-2 justify-between">
                    <div className="text-lg font-semibold">Bills</div>
                    <div
                      onClick={() => setBills(0)}
                      className="shadow shadow-rose-600 hover:bg-rose-600 hover:text-white transition-all ease-in-out duration-500 p-1 text-rose-600 cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="bill_1"
                      name="bills"
                      onChange={() => setBills(1)}
                      checked={bills === 1 ? true : false}
                    />
                    <label htmlFor="bill_1">
                      View & Add for All Bills (Sales/Purchase/Returns) &
                      Cashbook
                    </label>
                  </div>
                  <div className="flex gap-2 p-2">
                    <input
                      type="radio"
                      id="bill_2"
                      name="bills"
                      onClick={() => setBills(2)}
                      checked={bills === 1 ? true : false}
                    />
                    <label htmlFor="bill_2">
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

export default AddStaff;
