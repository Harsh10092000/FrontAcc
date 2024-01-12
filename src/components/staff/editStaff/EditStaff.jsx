import { Box, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";

const EditStaff = (props) => {
  const { changeChange, staffId } = useContext(UserContext);
  const [staffDataById, setStaffDataById] = useState({
    staff_name: "",
    staff_email: "",
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
          staff_email: response.data[0].staff_email,
          staff_parties: response.data[0].staff_parties,
          staff_inventory: response.data[0].staff_inventory,
          staff_bills: response.data[0].staff_bills,
        });
      });
  }, [staffId]);

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
    console.log(staffDataById.staff_parties);
    if (
      staffDataById.staff_name !== "" &&
      staffDataById.staff_email !== "" &&
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
    staffDataById.staff_email,
    staffDataById.staff_parties,
    staffDataById.staff_inventory,
    staffDataById.staff_bills,
  ]);

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="heading font-semibold text-2xl flex justify-between items-center">
        <div>Edit Staff</div>
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

            <Box className="box-sec px-4 py-2">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Email"
                name="staff_email"
                className="w-full"
                size="small"
                type="email"
                value={staffDataById.staff_email}
                disabled
              />
            </Box>

            <div className="pt-4">
              <div className="px-4 py-2 bg-slate-200 text-lg ">Permissions</div>
              <div className="border-b border-slate-200 py-2 px-4">
                <div className="flex p-2 justify-between">
                  <div className="text-lg font-semibold">Parties</div>
                  <div
                    onClick={() =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_parties: 0,
                      })
                    }
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
                    onChange={() =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_parties: 1,
                      })
                    }
                    checked={staffDataById.staff_parties === 1}
                  />
                  <label htmlFor="pr_1">View Entries & Send Reminders</label>
                </div>
                <div className="flex gap-2 p-2">
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
                  <label htmlFor="pr_2">Add & View: Entries/Parties</label>
                </div>
                <div className="flex gap-2 p-2">
                  <input
                    type="radio"
                    id="pr_3"
                    name="parties"
                    onChange={() =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_parties: 3,
                      })
                    }
                    checked={staffDataById.staff_parties === 3}
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
                    onClick={() =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_inventory: 0,
                      })
                    }
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
                    onChange={(e) =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_inventory: 1,
                      })
                    }
                    checked={staffDataById.staff_inventory === 1}
                  />
                  <label htmlFor="in_1">Add Items & Stock In/Out</label>
                </div>
                <div className="flex gap-2 p-2">
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
                  <label htmlFor="in_2">
                    Add, Edit & Delete: Items, Stock In/Out
                  </label>
                </div>
              </div>

              <div className="border-b border-slate-200 py-2 px-4">
                <div className="flex p-2 justify-between">
                  <div className="text-lg font-semibold">Bills</div>
                  <div
                    onClick={() =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_bills: 0,
                      })
                    }
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
                    onChange={(e) =>
                      setStaffDataById({
                        ...staffDataById,
                        staff_bills: 1,
                      })
                    }
                    checked={staffDataById.staff_bills === 1}
                  />
                  <label htmlFor="bill_1">
                    View & Add for All Bills (Sales/Purchase/Returns) & Cashbook
                  </label>
                </div>
                <div className="flex gap-2 p-2">
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
                  <label htmlFor="bill_2">
                    Add, Edit & Delete for Bills, Cashbook & Reports
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cashout-btn-wrapper">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px] transition-all ease-in"
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
