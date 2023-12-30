import { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import "./editsup.scss";
import TextField from "@mui/material/TextField";
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
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { Skeleton } from "@mui/material";
const EditSup = (props) => {
  const [skeleton, setSkeleton] = useState(true);

  const { supId, change, changeChange, changeSup } = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [isChecked2, setIsChecked2] = useState(false);
  const handleOnChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openEntryDetails, setOpenEntryDetails] = useState(true);
  const [openSupplierPay, setOpenSupplierPay] = useState(false);
  const handleClick = () => {
    setOpenSupplierPay(!openSupplierPay);
    setOpenEntryDetails(!openEntryDetails);
  };
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({
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
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchSup/${supId}`)
      .then((response) => {
        setData(response.data);
        setInfo({
          ...info,
          sup_name: response.data[0].sup_name,
          sup_number: response.data[0].sup_number,
          sup_amt: response.data[0].sup_amt,
          sup_amt_type: response.data[0].sup_amt_type,
          sup_gstin: response.data[0].sup_gstin,
          sup_sflat: response.data[0].sup_sflat,
          sup_sarea: response.data[0].sup_sarea,
          sup_spin: response.data[0].sup_spin,
          sup_scity: response.data[0].sup_scity,
          sup_sstate: response.data[0].sup_sstate,
          sup_bflat: response.data[0].sup_bflat,
          sup_barea: response.data[0].sup_barea,
          sup_bpin: response.data[0].sup_bpin,
          sup_bcity: response.data[0].sup_bcity,
          sup_bstate: response.data[0].sup_bstate,
        });
        setSkeleton(false);
      });
  }, [supId, change]);
  const delSup = async () => {
    await axios.delete(
      import.meta.env.VITE_BACKEND + `/api/sup/delSup/${supId}`
    );
    changeSup(0);
    changeChange();
    props.snack();
  };
  const updateSup = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/sup/updateSup/${supId}`,
        info
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
      info.sup_name !== "" &&
      info.sup_number !== "" &&
      info.sup_number.length > 9 &&
      (info.sup_spin === "" || info.sup_spin.length > 5) &&
      (info.sup_bpin === "" || info.sup_bpin.length > 5)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [info.sup_name, info.sup_number, info.sup_spin, info.sup_bpin]);

  return (
    <div>
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
          data.map((item, index) => (
            <div key={index}>
              <div>
                <Box sx={{ width: 400 }} className="w-full">
                  <h1 className="text_left heading">Edit Supplier</h1>
                  <div className="customer-profile flex items-start px-4 py-6 gap-4">
                    <div className="icon2 p-3 rounded-full">
                      <IconUser className="text-blue-500" />
                    </div>
                    <div className="">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-normal text-gray-700 -mt-1">
                          {item.sup_name}
                        </h2>
                      </div>
                      <p className="text-gray-500  bg-slate-200 rounded text-center">
                        Supplier
                      </p>
                    </div>
                  </div>
                  <div className="supplier-edit-btn-wrapper flex justify-center">
                    <button
                      className="supplier-edit-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
                      type="submit"
                      onClick={handleClick}
                    >
                      <IconEdit />
                      Edit Entry
                    </button>
                  </div>
                  <div className="supplier-edit-section-wrapper">
                    <div className="edit-section">
                      <div className="flex card-sec">
                        <div className="customer-info-icon-wrapper ">
                          <IconCash />
                        </div>
                        <div className="customer-info-text">
                          <h2>Opening Balance</h2>
                          <p className=" font-medium flex gap-2">
                            ₹ {item.sup_amt}
                            <span className=" capitalize">
                              {item.sup_amt_type}
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
                          <p className=" font-medium">{item.sup_number}</p>
                        </div>
                      </div>

                      <div className="flex card-sec">
                        <div className="customer-info-icon-wrapper ">
                          <IconReceipt />
                        </div>
                        <div className="customer-info-text">
                          <h2>GST Number</h2>
                          <p className=" font-medium">
                            {item.sup_gstin ? item.sup_gstin : "-"}
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
                            {item.sup_sflat ? item.sup_sflat + "," : ""}
                            {item.sup_sarea ? " " + item.sup_sarea + "," : ""}
                            {item.sup_scity ? " " + item.sup_scity + "," : ""}
                            {item.sup_sstate ? " " + item.sup_sstate + "," : ""}
                            {item.sup_spin ? " " + item.sup_spin : ""}
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
                            {item.sup_bflat ? item.sup_bflat + "," : ""}
                            {item.sup_barea ? " " + item.sup_barea + "," : ""}
                            {item.sup_bcity ? " " + item.sup_bcity + "," : ""}
                            {item.sup_bstate ? " " + item.sup_bstate + "," : ""}
                            {item.sup_bpin ? " " + item.sup_bpin : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
              <div className="add-customer-btn-wrapper flex justify-center">
                <button
                  className="delete-btn text-red-600 flex gap-1 justify-center"
                  type="submit"
                  onClick={handleClickOpen}
                >
                  <IconTrash />
                  Delete Customer
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
                          You are about to delete this supplier This action
                          cannot be undone.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="flex gap-4">
                        <button className="pb-3" onClick={handleClose}>
                          Cancel
                        </button>
                        <button
                          className="delete-btn text-red-600 pb-3 pr-3"
                          onClick={delSup}
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
        <>
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
          <form>
            <div>
              <Box>
                <h1 className="text_left heading">Edit Supplier</h1>
                <div className="section-wrapper-2">
                  <div className="section-2">
                    <Box
                      sx={{
                        "& > :not(style)": { m: 1, width: "97%" },
                      }}
                      className="forms"
                    >
                      <Box className="box-sec">
                        <TextField
                          label="Name"
                          id="outlined-basic"
                          variant="outlined"
                          className="w-full"
                          size="small"
                          value={info.sup_name}
                          onChange={(e) =>
                            setInfo({
                              ...info,
                              sup_name: e.target.value.replace(
                                /[^A-Z a-z.]/g,
                                ""
                              ),
                            })
                          }
                          inputProps={{ maxLength: 20 }}
                          required
                        />
                      </Box>

                      <Box className="box-sec">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Phone Number"
                          type="tel"
                          className="w-full"
                          size="small"
                          value={info.sup_number}
                          inputProps={{ maxLength: 10 }}
                          onChange={(e) =>
                            setInfo({
                              ...info,
                              sup_number: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          required
                        />
                      </Box>

                      <Box className="box-sec ">
                        <TextField
                          disabled
                          id="outlined-basic"
                          variant="outlined"
                          label="Enter amount"
                          className="sec-1"
                          size="small"
                          inputProps={{ maxLength: 10 }}
                          value={info.sup_amt}
                          required
                        />
                        <select
                          disabled
                          className={
                            info.sup_amt_type === "receive"
                              ? "text-green-600 bg-white p-1 border border-slate-400 rounded"
                              : "text-red-600 bg-white p-1 border border-slate-400 rounded"
                          }
                          value={info.sup_amt_type}
                        >
                          <option value="pay">Pay</option>
                          <option value="receive">Receive</option>
                        </select>
                      </Box>
                    </Box>
                    <Box className="box-sec check-box-sec">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 cursor-pointer"
                        onChange={handleOnChange}
                      />
                      <span>Add GSTIN & GST</span>
                    </Box>

                    {isChecked ? (
                      <>
                        <Box
                          sx={{
                            "& > :not(style)": { m: 1, width: "97%" },
                          }}
                          className="box-sec-2 forms"
                        >
                          <Box className="box-sec ">
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              label="GST IN"
                              className="w-full"
                              size="small"
                              inputProps={{ maxLength: 15 }}
                              value={info.sup_gstin}
                              onChange={(e) =>
                                setInfo({
                                  ...info,
                                  sup_gstin: e.target.value.replace(
                                    /[^A-Z0-9]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </Box>
                          <p className="text-xl font-semibold">
                            Shipping Address
                          </p>
                          <Box className="box-sec">
                            <TextField
                              id="outlined-basic"
                              label="Flat / Building Number"
                              variant="outlined"
                              className="w-full"
                              size="small"
                              value={info.sup_sflat}
                              inputProps={{ maxLength: 40 }}
                              onChange={(e) =>
                                setInfo({
                                  ...info,
                                  sup_sflat: e.target.value.replace(
                                    /[^A-Z a-z 0-9 /]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </Box>

                          <Box className="box-sec">
                            <TextField
                              id="outlined-basic"
                              label="Area / Locality"
                              variant="outlined"
                              className="w-full"
                              size="small"
                              value={info.sup_sarea}
                              inputProps={{ maxLength: 40 }}
                              onChange={(e) =>
                                setInfo({
                                  ...info,
                                  sup_sarea: e.target.value.replace(
                                    /[^A-Z a-z 0-9 /]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </Box>
                          <Box className="box-sec">
                            <TextField
                              id="outlined-basic"
                              label="PIN Code"
                              variant="outlined"
                              className="w-full"
                              size="small"
                              value={info.sup_spin}
                              inputProps={{ maxLength: 6 }}
                              onChange={(e) =>
                                setInfo({
                                  ...info,
                                  sup_spin: e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </Box>
                          <Box className="box-sec">
                            <TextField
                              id="outlined-basic"
                              label="City"
                              variant="outlined"
                              className="sec-1 w-full"
                              size="small"
                              value={info.sup_scity}
                              inputProps={{ maxLength: 30 }}
                              onChange={(e) =>
                                setInfo({
                                  ...info,
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
                              value={info.sup_sstate}
                              inputProps={{ maxLength: 30 }}
                              onChange={(e) =>
                                setInfo({
                                  ...info,
                                  sup_sstate: e.target.value.replace(
                                    /[^A-Z a-z]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </Box>
                        </Box>
                        <Box className="box-sec check-box-sec text-center ">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 cursor-pointer"
                            onChange={handleOnChange2}
                            defaultChecked
                          />
                          <span>Billing Address</span>
                        </Box>

                        {isChecked2 ? (
                          <Box
                            sx={{
                              "& > :not(style)": { m: 1, width: "97%" },
                            }}
                            noValidate
                            className="forms"
                          >
                            <p className="text_left">Billing Address</p>
                            <Box className="box-sec">
                              <TextField
                                id="outlined-basic"
                                label="Flat / Building Number"
                                variant="outlined"
                                className="w-full"
                                size="small"
                                value={info.sup_bflat}
                                inputProps={{ maxLength: 40 }}
                                onChange={(e) =>
                                  setInfo({
                                    ...info,
                                    sup_bflat: e.target.value.replace(
                                      /[^A-Z a-z 0-9 /]/g,
                                      ""
                                    ),
                                  })
                                }
                              />
                            </Box>
                            <Box className="box-sec">
                              <TextField
                                id="outlined-basic"
                                label="Area / Locality"
                                variant="outlined"
                                className="w-full"
                                size="small"
                                value={info.sup_barea}
                                inputProps={{ maxLength: 40 }}
                                onChange={(e) =>
                                  setInfo({
                                    ...info,
                                    sup_barea: e.target.value.replace(
                                      /[^A-Z a-z 0-9 /]/g,
                                      ""
                                    ),
                                  })
                                }
                              />
                            </Box>
                            <Box className="box-sec">
                              <TextField
                                id="outlined-basic"
                                label="PIN Code"
                                variant="outlined"
                                className="w-full"
                                size="small"
                                value={info.sup_bpin}
                                inputProps={{ maxLength: 6 }}
                                onChange={(e) =>
                                  setInfo({
                                    ...info,
                                    sup_bpin: e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    ),
                                  })
                                }
                              />
                            </Box>
                            <Box className="box-sec">
                              <TextField
                                id="outlined-basic"
                                label="City"
                                variant="outlined"
                                className="sec-1"
                                size="small"
                                value={info.sup_bcity}
                                inputProps={{ maxLength: 30 }}
                                onChange={(e) =>
                                  setInfo({
                                    ...info,
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
                                value={info.sup_bstate}
                                inputProps={{ maxLength: 30 }}
                                onChange={(e) =>
                                  setInfo({
                                    ...info,
                                    sup_bstate: e.target.value.replace(
                                      /[^A-Z a-z]/g,
                                      ""
                                    ),
                                  })
                                }
                              />
                            </Box>
                          </Box>
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
            <div className="add-customer-edit-btn-wrapper bg-white z-50">
              {submitDisabled ? (
                <button
                  disabled={submitDisabled}
                  className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
                >
                  Update Supplier
                </button>
              ) : (
                <button
                  className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                  onClick={updateSup}
                >
                  Update Supplier
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EditSup;
