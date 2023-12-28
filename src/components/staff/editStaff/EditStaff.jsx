import { Box, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const EditStaff = (props) => {
  const { changeChange, accountId, staffId } = useContext(UserContext);
  const [staffDataById, setStaffDataById] = useState({
    staff_name: "",
    staff_number: "",
    staff_parties: "",
    staff_inventory: "",
    staff_bills: "",
    staff_id: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/st/fetchdataById/${staffId}`)
      .then((response) => {
        setStaffDataById({
          ...staffDataById,
          staff_name: response.data[0].staff_name,
          staff_number: response.data[0].staff_number,
          staff_parties: response.data[0].staff_parties,
          staff_inventory: response.data[0].staff_inventory,
          staff_bills: response.data[0].staff_bills,
        });
      });
  }, [staffId]);

  // const [inventory, setInventory] = useState("1");
  // const [bills, setBills] = useState("1");
  // const [parties, setParties] = useState("1");

  // const [on, setOn] = useState(false);

  // useEffect(() => {
  //   if (
  //     staffDataById.staff_parties === 3 &&
  //     staffDataById.staff_inventory === 2 &&
  //     staffDataById.staff_bills === 2
  //   ) {
  //     setOn(true);
  //   }
  // }, [staffDataById]);

  // useEffect(() => {
  //   console.log(on)
  //   if (on === true) {
  //     staffDataById.staff_parties = 3;
  //     staffDataById.staff_inventory = 2;
  //     staffDataById.staff_bills = 2;
  //   } else {
  //     staffDataById.staff_parties = 0;
  //     staffDataById.staff_inventory = 0;
  //     staffDataById.staff_bills = 0;
  //   }
  // }, [on]);

  const [err, setErr] = useState(null);
  const handleClick = async (e) => {
    staffDataById.staff_id = staffId;
    staffDataById.staff_parties =
      staffDataById.staff_parties !== "" ? staffDataById.staff_parties : "0";
    staffDataById.staff_inventory =
      staffDataById.staff_inventory !== ""
        ? staffDataById.staff_inventory
        : "0";
    staffDataById.staff_bills =
      staffDataById.staff_bills !== "" ? staffDataById.staff_bills : "0";
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/st/updateData",
        staffDataById
      );
      changeChange();
      props.snacku();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    console.log(staffDataById.staff_parties)
    if (
      staffDataById.staff_name !== "" &&
      staffDataById.staff_number !== "" &&
      (staffDataById.staff_parties !== 0 ||
        staffDataById.staff_inventory !== 0 ||
        staffDataById.staff_bills !== 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    staffDataById.staff_name,
    staffDataById.staff_number,
    staffDataById.staff_parties,
    staffDataById.staff_inventory,
    staffDataById.staff_bills,
  ]);

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="heading font-semibold text-2xl flex justify-between items-center">
        <div>Update Staff</div>
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
                value={staffDataById.staff_name}
                onChange={(e) =>
                  setStaffDataById({
                    ...staffDataById,
                    staff_name: e.target.value,
                  })
                }
                required
              />
            </Box>

            <Box className="box-sec">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Phone Number"
                name="staff_number"
                className="w-full"
                size="small"
                inputProps={{ maxLength: 10, minLength: 10 }}
                onChange={(e) =>
                  setStaffDataById({
                    ...staffDataById,
                    staff_number: e.target.value.replace(/\D/g, ""),
                  })
                }
                value={staffDataById.staff_number}
                required
              />
            </Box>

            <div>Permissions</div>
            {/* <div>
              <div>Give full permission to Staff</div>
              <div className="box-sec check-box-sec">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 cursor-pointer"
                  onChange={() => setOn(!on)}
                  checked={on === true ? true : false}
                />
                
                <span>Select All</span>
                
              </div>
            </div> */}

            <Box>
              <div>
                <div>Icon</div>
                <div>Parties</div>
                <div
                  onClick={() =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_parties: 0,
                    })
                  }
                >
                  Remove
                </div>
              </div>
              <div>Select what Staff can do</div>
              <div className="flex gap-2 p-2">
                <label htmlFor="pr_1">View Entries & Send Reminders</label>
                <input
                  type="radio"
                  id="pr_1"
                  name="parties"
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_parties: 1,
                    })
                  }
                  checked={staffDataById.staff_parties === 1}
                />
              </div>
              <div className="flex gap-2 p-2">
                <label htmlFor="pr_2">Add & View: Entries/Parties</label>
                <input
                  type="radio"
                  id="pr_2"
                  name="parties"
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_parties: 2,
                    })
                  }
                  checked={staffDataById.staff_parties === 2}
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
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_parties: 3,
                    })
                  }
                  checked={staffDataById.staff_parties === 3}
                />
              </div>
            </Box>

            <Box>
              <div>
                <div>Icon</div>
                <div> Inventory</div>
                <div
                  onClick={() =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_inventory: 0,
                    })
                  }
                >
                  Remove
                </div>
              </div>
              <div>Select what Staff can do</div>
              <div className="flex gap-2 p-2">
                <label htmlFor="in_1">Add Items & Stock In/Out</label>
                <input
                  type="radio"
                  id="in_1"
                  name="inventory"
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_inventory: 1,
                    })
                  }
                  checked={staffDataById.staff_inventory === 1}
                />
              </div>
              <div className="flex gap-2 p-2">
                <label htmlFor="in_2">
                  Add, Edit & Delete: Items, Stock In/Out
                </label>
                <input
                  type="radio"
                  id="in_2"
                  name="inventory"
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_inventory: 2,
                    })
                  }
                  checked={staffDataById.staff_inventory === 2}
                />
              </div>
            </Box>

            <Box>
              <div>
                <div>Icon</div>
                <div> Bills</div>
                <div
                  onClick={() =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_bills: 0,
                    })
                  }
                >
                  Remove
                </div>
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
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_bills: 1,
                    })
                  }
                  checked={staffDataById.staff_bills === 1}
                />
              </div>
              <div className="flex gap-2 p-2">
                <label htmlFor="bill_2">
                  Add, Edit & Delete for Bills, Cashbook & Reports
                </label>
                <input
                  type="radio"
                  id="bill_2"
                  name="bills"
                  onChange={(e) =>
                    setStaffDataById({
                      ...staffDataById,
                      staff_bills: 2,
                    })
                  }
                  checked={staffDataById.staff_bills === 2}
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
            Update Staff
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleClick}
          >
            Update Staff
          </button>
        )}
      </div>
    </form>
  );
};

export default EditStaff;
