import { Box, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/UserIdContext";

 const EditModerator = (props) => {
  const { changeChange, moderatorId } = useContext(UserContext);
  const [moderatorDataById, setModeratorDataById] = useState({
    mod_name: "",
    mod_email: "",
    mod_accounts: "",
    mod_gst: "",
    mod_payplan: "",
    mod_id: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchModeratorById/${moderatorId}`)
      .then((response) => {
        setModeratorDataById({
          ...moderatorDataById,
          mod_name: response.data[0].mod_name,
          mod_email: response.data[0].mod_email,
          mod_accounts: response.data[0].mod_accounts,
          mod_gst: response.data[0].mod_gst,
          mod_payplan: response.data[0].mod_payplan,
        });
      });
  }, [moderatorId]);

  const [err, setErr] = useState(null);
  const handleClick = async (e) => {
    
    moderatorDataById.mod_accounts =
      moderatorDataById.mod_accounts !== "" ? moderatorDataById.mod_accounts : "0";
    moderatorDataById.mod_gst =
      moderatorDataById.mod_gst !== ""
        ? moderatorDataById.mod_gst
        : "0";
    moderatorDataById.mod_payplan =
      moderatorDataById.mod_payplan !== "" ? moderatorDataById.mod_payplan : "0";
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/editModerator/${moderatorId}`,
        moderatorDataById
      );
      changeChange();
      props.snacku();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    console.log(moderatorDataById.mod_accounts);
    if (
      moderatorDataById.mod_name !== "" &&
      moderatorDataById.mod_email !== "" &&
      (moderatorDataById.mod_accounts !== 0 ||
        moderatorDataById.mod_gst !== 0 ||
        moderatorDataById.mod_payplan !== 0)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    moderatorDataById.mod_name,
    moderatorDataById.mod_email,
    moderatorDataById.mod_accounts,
    moderatorDataById.mod_gst,
    moderatorDataById.mod_payplan,
  ]);

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="heading font-semibold text-2xl flex justify-between items-center">
        <div>Edit Moderator</div>
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
                value={moderatorDataById.mod_name}
                onChange={(e) =>
                  setModeratorDataById({
                    ...moderatorDataById,
                    mod_name: e.target.value,
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
                name="mod_email"
                className="w-full"
                size="small"
                type="email"
                value={moderatorDataById.mod_email}
                disabled
              />
            </Box>

            <div className="pt-4">
              <div className="px-4 py-2 bg-slate-200 text-lg ">Permissions</div>
              <div className="border-b border-slate-200 py-2 px-4">
                <div className="flex p-2 justify-between">
                  <div className="text-lg font-semibold">Accounts</div>
                  <div
                    onClick={() =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_accounts: 0,
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
                    id="accounts_1"
                    name="accounts"
                    onChange={() =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_accounts: 1,
                      })
                    }
                    checked={moderatorDataById.mod_accounts === 1}
                  />
                  <label htmlFor="accounts_1">View Entries & Send Reminders</label>
                </div>
                <div className="flex gap-2 p-2">
                  <input
                    type="radio"
                    id="accounts_2"
                    name="accounts"
                    onChange={(e) =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_accounts: 2,
                      })
                    }
                    checked={moderatorDataById.mod_accounts === 2}
                  />
                  <label htmlFor="accounts_2">Add & View: Entries/Parties</label>
                </div>
                
              </div>
              <div className="border-b border-slate-200 py-2 px-4">
                <div className="flex p-2 justify-between">
                  <div className="text-lg font-semibold">Gst</div>
                  <div
                    onClick={() =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_gst: 0,
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
                    id="gst_1"
                    name="gst"
                    onChange={(e) =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_gst: 1,
                      })
                    }
                    checked={moderatorDataById.mod_gst === 1}
                  />
                  <label htmlFor="gst_1">Add Items & Stock In/Out</label>
                </div>
                <div className="flex gap-2 p-2">
                  <input
                    type="radio"
                    id="gst_2"
                    name="gst"
                    onChange={(e) =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_gst: 2,
                      })
                    }
                    checked={moderatorDataById.mod_gst === 2}
                  />
                  <label htmlFor="gst_2">
                    Add, Edit & Delete: Items, Stock In/Out
                  </label>
                </div>
              </div>

              <div className="border-b border-slate-200 py-2 px-4">
                <div className="flex p-2 justify-between">
                  <div className="text-lg font-semibold">Payment Plan</div>
                  <div
                    onClick={() =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_payplan: 0,
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
                    id="payPlan_1"
                    name="payPlan"
                    onChange={(e) =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_payplan: 1,
                      })
                    }
                    checked={moderatorDataById.mod_payplan === 1}
                  />
                  <label htmlFor="payPlan_1">
                    View & Add for All Bills (Sales/Purchase/Returns) & Cashbook
                  </label>
                </div>
                <div className="flex gap-2 p-2">
                  <input
                    type="radio"
                    id="payPlan_2"
                    name="payPlan"
                    onChange={(e) =>
                      setModeratorDataById({
                        ...moderatorDataById,
                        mod_payplan: 2,
                      })
                    }
                    checked={moderatorDataById.mod_payplan === 2}
                  />
                  <label htmlFor="payPlan_2">
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
            Update Moderator
          </button>
        ) : (
          <button
            className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
            onClick={handleClick}
          >
            Update Moderator
          </button>
        )}
      </div>
    </form>
  );
};

export default EditModerator;
