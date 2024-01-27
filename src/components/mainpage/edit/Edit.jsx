import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Skeleton, TextField } from "@mui/material";
import {
  IconPhoneCall,
  IconMapPin,
  IconReceipt,
  IconTrash,
  IconEdit,
  IconChevronLeft,
  IconAlertOctagonFilled,
  IconUser,
  IconCash,
} from "@tabler/icons-react";
import "./edit.scss";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const Edit = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [isChecked2, setIsChecked2] = useState(false);
  const handleOnChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const [openEntryDetails, setOpenEntryDetails] = useState(true);
  const [openSupplierPay, setOpenSupplierPay] = useState(false);
  const handleClick = () => {
    setOpenSupplierPay(!openSupplierPay);
    setOpenEntryDetails(!openEntryDetails);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { userId, change, changeChange, changeUser } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [data, setData] = useState({
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
  });
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchCust/${userId}`)
      .then((response) => {
        setResult(response.data);
        setData({
          ...data,
          cust_name: response.data[0].cust_name,
          cust_number: response.data[0].cust_number,
          cust_amt: response.data[0].cust_amt,
          amt_type: response.data[0].amt_type,
          cust_gstin: response.data[0].cust_gstin,
          cust_sflat: response.data[0].cust_sflat,
          cust_sarea: response.data[0].cust_sarea,
          cust_spin: response.data[0].cust_spin,
          cust_scity: response.data[0].cust_scity,
          cust_sstate: response.data[0].cust_sstate,
          cust_bflat: response.data[0].cust_bflat,
          cust_barea: response.data[0].cust_barea,
          cust_bpin: response.data[0].cust_bpin,
          cust_bcity: response.data[0].cust_bcity,
          cust_bstate: response.data[0].cust_bstate,
        });
        setSkeleton(false);
      });
  }, [change, userId]);
  const deleteCustomer = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + `/api/auth/delcust/${userId}`
      );
      changeChange();
      props.snack();
      changeUser(0);
    } catch (err) {
      console.log(err);
    }
  };
  if (isChecked2 === false) {
  (data.cust_bflat = data.cust_sflat),
    (data.cust_barea = data.cust_sarea),
    (data.cust_bpin = data.cust_spin),
    (data.cust_bcity = data.cust_scity),
    (data.cust_bstate = data.cust_sstate);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(
        import.meta.env.VITE_BACKEND + `/api/auth/updatecust/${userId}`,
        data
      );
      changeChange();
      props.snacku();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      data.cust_name !== "" &&
      data.cust_number !== "" &&
      data.cust_number > 9 &&
      (data.cust_gstin === "" || data.cust_gstin.length > 14) &&
      (data.cust_spin === "" || data.cust_spin.length > 5) &&
      (data.cust_bpin === "" || data.cust_bpin.length > 5)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data.cust_name, data.cust_number,data.cust_spin, data.cust_bpin, data.cust_gstin]);

  return (
    <Box sx={{ width: 400 }} role="presentation">
      {openEntryDetails ? (
        skeleton ? (
          <div>
            <Box sx={{ width: 400 }} className="w-full">
              <h1 className="text_left heading">Pay Entry Details</h1>
              <div className="customer-profile flex items-start px-4 py-6 gap-4">
                <Skeleton variant="circular" width={45} height={45} />

                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-normal text-gray-700 -mt-1">
                      <Skeleton variant="rectangular" width={60} height={15} />
                    </h2>
                  </div>
                  <p className="text-gray-500  bg-slate-200 rounded text-center">
                    <Skeleton variant="rectangular" width={60} height={15} />
                  </p>
                </div>
              </div>

              <div className="pay-edit-entry-btn-wrapper flex justify-center">
                <Skeleton variant="rounded" width={370} height={45} />
              </div>

              <div className="customer-edit-section-wrapper">
                <div className="edit-section">
                  <div className="flex card-sec">
                    <div className="customer-info-icon-wrapper ">
                      <IconCash />
                    </div>
                    <div className="customer-info-text">
                      <h2>Opening Balance</h2>
                      <p className=" font-medium flex gap-2 mt-2">
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={18}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex card-sec">
                    <div className="customer-info-icon-wrapper ">
                      <IconPhoneCall />
                    </div>
                    <div className="customer-info-text">
                      <h2>Phone Number</h2>
                      <p className=" font-medium">
                        {" "}
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={18}
                        />
                      </p>
                    </div>
                  </div>

                  <div className="flex card-sec">
                    <div className="customer-info-icon-wrapper ">
                      <IconReceipt />
                    </div>
                    <div className="customer-info-text">
                      <h2>GST Number</h2>
                      <p className=" font-medium">
                        {" "}
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={18}
                        />
                      </p>
                    </div>
                  </div>

                  <div className="flex card-sec">
                    <div className="customer-info-icon-wrapper ">
                      <IconMapPin />
                    </div>
                    <div className="customer-info-text">
                      <h2>Shipping Address</h2>
                      <p className=" font-medium">
                        {" "}
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={18}
                        />
                      </p>
                    </div>
                  </div>

                  <div className="flex card-sec">
                    <div className="customer-info-icon-wrapper ">
                      <IconMapPin />
                    </div>
                    <div className="customer-info-text">
                      <h2>Billing Address</h2>
                      <p className=" font-medium">
                        {" "}
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={18}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Box>

            <div className="delete-customer-btn-wrapper flex justify-center">
              <Skeleton variant="rounded" width={370} height={45} />
            </div>
          </div>
        ) : (
          result.map((filteredPersons) => (
            <div key={userId}>
              <Box sx={{ width: 400 }} className="w-full">
                <h1 className="text_left heading">Pay Entry Details</h1>
                <div className="customer-profile flex items-start px-4 py-6 gap-4">
                  <div className="icon2 p-3 rounded-full">
                    <IconUser className="text-blue-500" />
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-normal text-gray-700 -mt-1">
                        {filteredPersons.cust_name}
                      </h2>
                    </div>
                    <p className="text-gray-500  bg-slate-200 rounded text-center">
                      Customer
                    </p>
                  </div>
                </div>

                <div className="pay-edit-entry-btn-wrapper flex justify-center">
                  <button
                    className="edit-entry-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
                    type="submit"
                    onClick={handleClick}
                  >
                    <IconEdit />
                    Edit Entry
                  </button>
                </div>

                <div className="customer-edit-section-wrapper">
                  <div className="edit-section">
                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconCash />
                      </div>
                      <div className="customer-info-text">
                        <h2>Opening Balance</h2>
                        <p className=" font-medium flex gap-2">
                          ₹ {parseFloat(filteredPersons.cust_amt).toFixed(2)}
                          <span className=" capitalize">
                            {filteredPersons.amt_type}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconPhoneCall />
                      </div>
                      <div className="customer-info-text">
                        <h2>Phone Number</h2>
                        <p className=" font-medium">
                          {filteredPersons.cust_number}
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconReceipt />
                      </div>
                      <div className="customer-info-text">
                        <h2>GST Number</h2>
                        <p className=" font-medium">
                          {filteredPersons.cust_gstin
                            ? filteredPersons.cust_gstin
                            : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconMapPin />
                      </div>
                      <div className="customer-info-text">
                        <h2>Shipping Address</h2>
                        <p className=" font-medium">
                          {filteredPersons.cust_sflat
                            ? filteredPersons.cust_sflat + ","
                            : ""}
                          {filteredPersons.cust_sarea
                            ? " " + filteredPersons.cust_sarea + ","
                            : ""}
                          {filteredPersons.cust_scity
                            ? " " + filteredPersons.cust_scity + ","
                            : ""}
                          {filteredPersons.cust_sstate
                            ? " " + filteredPersons.cust_sstate + ","
                            : ""}
                          {filteredPersons.cust_spin
                            ? " " + filteredPersons.cust_spin
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconMapPin />
                      </div>
                      <div className="customer-info-text">
                        <h2>Billing Address</h2>
                        <p className=" font-medium">
                          {filteredPersons.cust_bflat
                            ? filteredPersons.cust_bflat + ","
                            : ""}
                          {filteredPersons.cust_barea
                            ? " " + filteredPersons.cust_barea + ","
                            : ""}
                          {filteredPersons.cust_bcity
                            ? " " + filteredPersons.cust_bcity + ","
                            : ""}
                          {filteredPersons.cust_bstate
                            ? " " + filteredPersons.cust_bstate + ","
                            : ""}
                          {filteredPersons.cust_bpin
                            ? " " + filteredPersons.cust_bpin
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>

              <div className="delete-customer-btn-wrapper flex justify-center">
                <button
                  className="delete-btn text-red-600 flex gap-1 justify-center"
                  type="submit"
                  onClick={handleClickOpen}
                >
                  <IconTrash />
                  Delete Entry
                </button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div className="flex">
                    <div className="pt-5 pl-3">
                      <IconAlertOctagonFilled
                        size={60}
                        className="text-red-600"
                      />
                    </div>
                    <div>
                      <DialogTitle id="alert-dialog-title">
                        Are You Sure ?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          You are about to delete this customer This action
                          cannot be undone.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="flex gap-4">
                        <button className="pb-3" onClick={handleClose}>
                          Cancel
                        </button>
                        <button
                          className="delete-btn text-red-600 pb-3 pr-3"
                          onClick={deleteCustomer}
                          autoFocus
                        >
                          Delete Customer
                        </button>
                      </DialogActions>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          ))
        )
      ) : (
        <div></div>
      )}
      {openSupplierPay ? (
        <div>
          <div className="back-btn-wrapper ">
            <button
              className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
              type="submit"
              onClick={handleClick}
            >
              <IconChevronLeft />
              Back
            </button>
          </div>
          <form method="post">
            <div>
              <Box sx={{ width: 400 }} role="presentation">
                <h1 className="text_left heading font-semibold text-2xl flex justify-between items-center">
                  Edit Customer
                </h1>

                <div className="add-customer-edit-wrapper">
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
                          value={data.cust_name}
                          onChange={(e) =>
                            setData({ ...data, cust_name: e.target.value.replace(/[^A-Z a-z]/g, "") })
                          }
                          required
                        />
                      </div>

                      <div className="box-sec">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Phone Number"
                          type="tel"
                          className="w-full"
                          size="small"
                          inputProps={{ maxLength: 10 }}
                          value={data.cust_number}
                          onChange={(e) =>
                            setData({
                              ...data,
                              cust_number: e.target.value.replace(/[^0-9]/g, ""),
                            })
                          }
                          helperText={data.cust_number.length < 10 ? "Please Enter valid mobile number" : "" }
                          required
                        />
                      </div>

                      <div className="box-sec ">
                        <TextField
                          disabled
                          id="outlined-basic"
                          variant="outlined"
                          label="Enter amount"
                          className="sec-1"
                          size="small"  
                          value={data.cust_amt}
                          required
                        />
                        <select
                          disabled
                          className={
                            data.amt_type === "receive"
                              ? "text-green-600 bg-white p-1 border border-slate-400 rounded"
                              : "text-red-600 bg-white p-1 border border-slate-400 rounded"
                          }
                          value={data.amt_type}
                          onChange={(e) =>
                            setData({ ...data, amt_type: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"), })
                          }
                        >
                          <option value="pay">Pay</option>
                          <option value="receive">Receive</option>
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
                              value={data.cust_gstin}
                              inputProps={{ maxLength: 15}}
                              onChange={(e) =>
                                setData({ ...data, cust_gstin: e.target.value.replace(
                                  /[^A-Z0-9a-z]/g,
                                  ""
                                ), })
                              }
                              helperText={data.cust_gstin.length < 15 && data.cust_gstin !== ""  ? "Please Enter valid GST Number" : "" }
                              size="small"
                            />
                          </div>
                          <p className="mt-2">Shipping Address</p>
                          <div className="box-sec">
                            <TextField
                              id="outlined-basic"
                              label="Flat / Building Number"
                              variant="outlined"
                              className="w-full"
                              size="small"
                              value={data.cust_sflat}
                              inputProps={{ maxLength: 40}}
                              onChange={(e) =>
                                setData({ ...data, cust_sflat: e.target.value.replace(
                                  /[^A-Z a-z 0-9 /]/g,
                                  ""
                                ), })
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
                              value={data.cust_sarea}
                              inputProps={{ maxLength: 40}}
                              onChange={(e) =>
                                setData({ ...data, cust_sarea: e.target.value.replace(
                                  /[^A-Z a-z 0-9 /]/g,
                                  ""
                                ), })
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
                              value={data.cust_spin}
                              inputProps={{ maxLength: 6 }}
                              onChange={(e) =>
                                setData({ ...data, cust_spin: e.target.value.replace(/[^0-9]/g, ""), })
                              }
                              helperText={data.cust_spin.length < 6 && data.cust_spin !== ""  ? "Please Enter valid PIN Code" : "" }
                            />
                          </div>
                          <div className="box-sec">
                            <TextField
                              id="outlined-basic"
                              label="City"
                              variant="outlined"
                              className="sec-1 w-full"
                              value={data.cust_scity}
                              inputProps={{ maxLength: 30}}
                              onChange={(e) =>
                                setData({ ...data, cust_scity: e.target.value.replace(
                                  /[^A-Z a-z]/g,
                                  ""
                                ), })
                              }
                              size="small"
                            />

                            <TextField
                              id="outlined-basic"
                              label="State"
                              variant="outlined"
                              className="sec-2"
                              size="small"
                              value={data.cust_sstate}
                              inputProps={{ maxLength: 30}}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  cust_sstate: e.target.value.replace(
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
                            <p className="text_left">Billing Address</p>
                            <div className="box-sec">
                              <TextField
                                id="outlined-basic"
                                label="Flat / Building Number"
                                variant="outlined"
                                className="w-full"
                                size="small"
                                value={data.cust_bflat}
                                inputProps={{ maxLength: 40}}
                                onChange={(e) =>
                                  setData({
                                    ...data,
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
                                value={data.cust_barea}
                                inputProps={{ maxLength: 40}}
                                onChange={(e) =>
                                  setData({
                                    ...data,
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
                                value={data.cust_bpin}
                                inputProps={{ maxLength: 6}}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    cust_bpin: e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    ),
                                  })
                                }
                                helperText={data.cust_bpin.length < 6 && data.cust_bpin !== ""  ? "Please Enter valid PIN Code" : "" }
                              />
                            </div>
                            <div className="box-sec">
                              <TextField
                                id="outlined-basic"
                                label="City"
                                variant="outlined"
                                className="sec-1"
                                size="small"
                                value={data.cust_bcity}
                                inputProps={{ maxLength: 30}}
                                onChange={(e) =>
                                  setData({
                                    ...data,
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
                                inputProps={{ maxLength: 30}}
                                value={data.cust_bstate}
                                onChange={(e) =>
                                  setData({
                                    ...data,
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
              </Box>
            </div>
            <div className="add-customer-edit-btn-wrapper bg-white">
              {submitDisabled ? (
                <button
                  disabled={submitDisabled}
                  className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
                >
                  Update Customer
                </button>
              ) : (
                <button
                  className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                  onClick={handleSubmit}
                >
                  Update Customer
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default Edit;
