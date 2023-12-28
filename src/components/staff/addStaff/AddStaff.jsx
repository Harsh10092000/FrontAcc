import { Box, TextField } from "@mui/material";
import "./addstaff.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const AddStaff = (props) => {
  // const mailOptions = {
  //   from: 'harshgupta.calinfo@gmail.com',
  //   to: 'harshwork1009@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });

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

  // const [on, setOn] = useState(false);

  // useEffect(() => {
  //   if (on === true) {
  //     setParties("3");
  //     setBills("2");
  //     setInventory("2");
  //   } else {
  //     setParties("0");
  //     setBills("0");
  //     setInventory("0");
  //   }
  // }, [on]);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      values.staff_name !== "" &&
      values.staff_email !== "" &&
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
  ]);

  const [cotp, setCotp] = useState(0);
  const fetchOtp = async (e) => {
    e.preventDefault();
    try {
      axios
        .get(
          import.meta.env.VITE_BACKEND + `/api/st/sendOtp/${values.staff_email}`
        )
        .then((res) => {
          //console.log(res.data)
          setCotp(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  

  const checkOtp = (otp) => {
    if (cotp == otp) {
      console.log("match : ", otp);
    } else {
      console.log("no match : ", otp);
    }
  };

  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="heading font-semibold text-2xl flex justify-between items-center">
        <div>Add Staff</div>
      </h1>

      <div className="cashout-section-wrapper">
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

            <Box className="box-sec">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Email"
                name="staff_email"
                className="w-full"
                size="small"
                type="email"
                //inputProps={{ maxLength: 10, minLength: 10 }}
                // onChange={(e) =>
                //   setValues({
                //     ...values,
                //     staff_number: e.target.value.replace(/\D/g, ""),
                //   })
                // }
                onChange={(e) =>
                  setValues({
                    ...values,
                    //staff_email: e.target.value.replace(/[^A-Z a-z 0-9]/g, "").replace(/@[A-Za-z]/g, "").replace(/.[A-Za-z]/g, ""),
                    //staff_email: e.target.value.replace(/^\.|[^0-9A-Z a-z@.]/g, "").replace(/(\@\d*\@)/, "$1").replace(/^(\d*\@\d{0,2}).*$/, "$1"),
                    staff_email : e.target.value.replace(/^\@|[^0-9A-Z a-z.@]/g, "").replace(/(\@\d*\@)/, "$1").replace(/^(\d*\@\d{0,2})@*$/, "$1"),
                  })
                }
                value={values.staff_email}
                required
                //helperText={values.staff_number.length > 9 ? "" : "error"}
              />
            </Box>

            <button onClick={fetchOtp}>send otp</button>
            <div>{cotp}</div>

            {cotp && (
              <Box className="box-sec">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Email"
                  name="staff_email"
                  className="w-full"
                  size="small"
                  type="text"
                  onChange={(e) => checkOtp(e.target.value)}
                  //value={}
                  required
                />
              </Box>
            )}

            <div>Permissions</div>

            {/* <div>
              <div>Give full permission to Staff</div>
              <div className="box-sec check-box-sec">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 cursor-pointer"
                  onChange={() => setOn(!on)}
                />
                <span>Select All</span>
              </div>
            </div> */}

            <Box>
              <div>
                <div>Icon</div>
                <div>Parties</div>
              </div>
              <div>Select what Staff can do</div>
              <div className="flex gap-2 p-2">
                <label htmlFor="pr_1">View Entries & Send Reminders</label>
                <input
                  type="radio"
                  id="pr_1"
                  name="parties"
                  checked={parties === 1 ? true : false}
                  onChange={(e) => setParties(1)}
                />
              </div>
              <div className="flex gap-2 p-2">
                <label htmlFor="pr_2">Add & View: Entries/Parties</label>
                <input
                  type="radio"
                  id="pr_2"
                  name="parties"
                  checked={parties === 2 ? true : false}
                  onClick={(e) => setParties(2)}
                />
              </div>

              <div className="flex gap-2 p-2">
                <label htmlFor="pr_3">
                  Add, View, Edit & Delete: Entries/Parties & Reports
                </label>
                <input
                  type="radio"
                  id="pr_3"
                  name="parties"
                  checked={parties === 3 ? true : false}
                  onClick={(e) => setParties(3)}
                />
              </div>
            </Box>

            <Box>
              <div>
                <div>Icon</div>
                <div> Inventory</div>
              </div>
              <div>Select what Staff can do</div>
              <div className="flex gap-2 p-2">
                <label htmlFor="in_1">Add Items & Stock In/Out</label>
                <input
                  type="radio"
                  checked={inventory === 1 ? true : false}
                  id="in_1"
                  name="inventory"
                  onChange={(e) => setInventory(1)}
                />
              </div>
              <div className="flex gap-2 p-2">
                <label htmlFor="in_2">
                  Add, Edit & Delete: Items, Stock In/Out
                </label>
                <input
                  type="radio"
                  checked={inventory === 2 ? true : false}
                  id="in_2"
                  name="inventory"
                  onClick={(e) => setInventory(2)}
                />
              </div>
            </Box>

            <Box>
              <div>
                <div>Icon</div>
                <div> Bills</div>
              </div>
              <div>Select what Staff can do</div>
              <div className="flex gap-2 p-2">
                <label htmlFor="bill_1">
                  View & Add for All Bills (Sales/Purchase/Returns) & Cashbook
                </label>
                <input
                  type="radio"
                  id="bill_1"
                  name="bills"
                  checked={bills === 1 ? true : false}
                  onChange={(e) => setBills(1)}
                />
              </div>
              <div className="flex gap-2 p-2">
                <label htmlFor="bill_2">
                  Add, Edit & Delete for Bills, Cashbook & Reports
                </label>
                <input
                  type="radio"
                  checked={bills === 2 ? true : false}
                  id="bill_2"
                  name="bills"
                  onClick={(e) => setBills(2)}
                />
              </div>
            </Box>
          </Box>
        </div>
      </div>

      <div className="cashout-btn-wrapper">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
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
