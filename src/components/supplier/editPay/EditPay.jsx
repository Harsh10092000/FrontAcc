import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Skeleton, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  IconPhoneCall,
  IconReceipt,
  IconTrash,
  IconEdit,
  IconChevronLeft,
  IconX,
  IconPhoto,
  IconCurrencyRupee,
  IconAlertOctagonFilled,
  IconCash,
  IconUser,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const EditPay = (props) => {
  const [skeleton, setSkeleton] = useState(true);
  const { supId, tranId, changeChange } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const value = dayjs(current_date);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("File Name");
  const [fileExists, setFileExists] = useState(false);
  const [open, setOpen] = useState(false);
  const [transactionDate, setTransactionDate] = useState(value);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

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
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [subAmtType, setSubAmtType] = useState("");
  const [prevSubTranPay, setPrevSubTranPay] = useState(0);
  const [prevSubBalance, setPrevSubBalance] = useState(0);
  const [tran, setTran] = useState([]);
  const [update, setUpdate] = useState({
    sup_tran_pay: "",
    sup_tran_date: "",
    sup_tran_description: "",
    sup_balance: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchSup/${supId}`)
      .then((res) => {
        setData(res.data);
        setSubAmtType(res.data[0].sup_amt_type);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchTranid/${tranId}`)
      .then((res) => {
        setTran(res.data);
        setUpdate({
          ...update,
          sup_tran_pay: res.data[0].sup_tran_pay,
          sup_tran_date: res.data[0].sup_tran_date,
          sup_tran_description: res.data[0].sup_tran_description,
          sup_balance: res.data[0].sup_balance,
        });
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchSupLastTran/${supId}`)
      .then((response) => {
        setPrevSubTranPay(response.data[0].sup_tran_pay);
        setPrevSubBalance(response.data[0].sup_balance);
      });
  }, [tranId]);
  const delTran = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/sup/delTran/${tranId}`
      );
      changeChange();
      props.snackd();
    } catch (err) {
      console.log(err);
    }
  };
  const updateTran = async (e) => {
    e.preventDefault();
    try {
      if (subAmtType === "pay") {
        if (update.sup_tran_pay > prevSubTranPay) {
          update.sup_balance =
            prevSubBalance + (update.sup_tran_pay - prevSubTranPay);
        } else if (update.sup_tran_pay < prevSubTranPay) {
          update.sup_balance =
            prevSubBalance - (prevSubTranPay - update.sup_tran_pay);
        }
      } else if (subAmtType === "receive") {
        if (update.sup_tran_pay > prevSubTranPay) {
          update.sup_balance =
            prevSubBalance - (update.sup_tran_pay - prevSubTranPay);
        } else if (update.sup_tran_pay < prevSubTranPay) {
          update.sup_balance =
            prevSubTranPay - update.sup_tran_pay + prevSubBalance;
        }
      }
      flag ? (update.sup_tran_date = filteredDate) : "";
      const formData = new FormData();
      formData.append("image", file);
      formData.append("sup_tran_pay", update.sup_tran_pay);
      formData.append("sup_tran_description", update.sup_tran_description);
      formData.append("sup_tran_date", update.sup_tran_date);
      formData.append("sup_balance", update.sup_balance);
      console.log("filr : ", file, formData);
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/sup/updateTran/${tranId}`,
        formData
      );

      changeChange();
      props.snacku();
    } catch (err) {
      console.log(err);
    }
  };
  const [imgOpen, setImgOpen] = useState(false);
  const handleImgOpen = () => {
    setImgOpen(true);
  };

  const handleImgClose = () => {
    setImgOpen(false);
  };

  const [error , setError] = useState(null)
  const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    if (update.sup_tran_pay !== ""   && error === null) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [update.sup_tran_pay, error]);


  return (
    <Box sx={{ width: 400 }} role="presentation">
      {openEntryDetails ? (
        skeleton ? (
          <Box sx={{ width: 400 }} role="presentation">
            <div>
              <Box sx={{ width: 400 }} className="w-full">
                <h1 className="text_left heading">Pay Entry Details</h1>
                <div className="customer-profile flex items-start px-4 py-6 gap-2">
                  <Skeleton variant="circular" width={50} height={50} />
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-normal text-gray-700 -mt-1">
                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={15}
                        />
                      </h2>
                    </div>
                    <p className="text-gray-500  bg-slate-200 rounded-full text-center">
                      <Skeleton variant="rectangular" width={50} height={15} />
                    </p>
                  </div>
                </div>

                <div className="pay-edit-entry-btn-wrapper flex justify-center">
                  <Skeleton variant="rounded" width={350} height={45} />
                </div>

                <div className="pay-edit-section-wrapper">
                  <div className="edit-section">
                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconCash />
                      </div>
                      <div className="customer-info-text">
                        <h2>You Pay</h2>

                        <p className=" font-medium">
                          
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={15}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconReceipt />
                      </div>
                      <div className="customer-info-text">
                        <h2>Description</h2>
                        <p className=" font-medium">
                          
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={15}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconPhoto />
                      </div>
                      <div className="customer-info-text">
                        <h2>Photo Attachment</h2>
                        <p className=" font-medium">
                          
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={15}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconCurrencyRupee />
                      </div>
                      <div className="customer-info-text">
                        <h2>Running Balance</h2>
                        <p className=" font-medium">
                          
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={15}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>

              <div className="add-customer-btn-wrapper flex justify-center">
                <Skeleton variant="rounded" width={350} height={45} />
              </div>
            </div>
          </Box>
        ) : (
          tran.map((item, index) => (
            <div key={index}>
              <Box sx={{ width: 400 }} className="w-full">
                <h1 className="text_left heading">Pay Entry Details</h1>
                <div className="customer-profile flex items-start px-4 py-6">
                  <div className="bg-sky-600/25 p-3 rounded-full text-blue-600">
                    <IconUser />
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between">
                      {data.map((item, index) => (
                        <h2
                          key={index}
                          className="text-lg font-normal text-gray-700 -mt-1"
                        >
                          {item.sup_name}
                        </h2>
                      ))}
                    </div>
                    <p className="text-gray-500  bg-slate-200 rounded-full text-center">
                      {item.sup_tran_date}
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

                <div className="supplier-pay-edit-section-wrapper">
                  <div className="edit-section">
                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconCash />
                      </div>
                      <div className="customer-info-text">
                        <h2>You Pay</h2>
                        <p className=" font-medium">₹{parseFloat(item.sup_tran_pay).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconReceipt />
                      </div>
                      <div className="customer-info-text">
                        <h2>Description</h2>
                        <p className=" font-medium">
                          {item.sup_tran_description
                            ? item.sup_tran_description
                            : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconPhoto />
                      </div>
                      <div className="customer-info-text">
                        <h2>Photo Attachment</h2>
                        <p className=" font-medium">
                          {item.sup_tran_bill ? (
                            <img
                              src={
                                import.meta.env.VITE_BACKEND +
                                "/sup/" +
                                item.sup_tran_bill
                              }
                              width={50}
                              height={50}
                              onClick={handleImgOpen}
                            />
                          ) : (
                            "-"
                          )}
                        </p>
                        <Dialog
                          open={imgOpen}
                          onClose={handleImgClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          maxWidth="xl"
                        >
                          <div>
                            <DialogContent>
                              <img
                                className="image"
                                src={
                                  import.meta.env.VITE_BACKEND +
                                  "/sup/" +
                                  item.sup_tran_bill
                                }
                                alt="no image"
                              />
                            </DialogContent>
                          </div>
                        </Dialog>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconCurrencyRupee />
                      </div>
                      <div className="customer-info-text">
                        <h2>Running Balance</h2>
                        <p className=" font-medium">₹422.05</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>

              <div className="add-customer-btn-wrapper flex justify-center">
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
                          You are about to delete this Entry . This action
                          cannot be undone.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="flex gap-4">
                        <button className="pb-3" onClick={handleClose}>
                          Cancel
                        </button>
                        <button
                          className="delete-btn text-red-600 pb-3 pr-3"
                          onClick={delTran}
                          autoFocus
                        >
                          Delete Entry
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
          <form className="block overflow-hidden">
            <h1 className="text_left heading text-red-500 font-semibold text-lg">
              Edit Entry
            </h1>

            <div className="supplier-pay-section-wrapper">
              <div className="section-2">
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "95%" },
                  }}
                  className="w-full forms p-6"
                >
                  <Box className="box-sec">
                    <TextField
                      label="Amount"
                      id="outlined-basic"
                      variant="outlined"
                      className="w-full m-0"
                      size="small"
                      value={update.sup_tran_pay}
                      onChange={(e) =>
                        setUpdate({
                          ...update,
                          sup_tran_pay: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1"),
                        })
                      }
                      required
                    />
                  </Box>

                  {console.log( update.sup_tran_pay)}

                  <Box className="box-sec">
                    <TextField
                      fullWidth
                      multiline
                      id="outlined-basic"
                      variant="outlined"
                      label="Description"
                      type="text"
                      placeholder="Enter Details"
                      InputProps={{
                        rows: 5,
                      }}
                      value={update.sup_tran_description}
                      onChange={(e) =>
                        setUpdate({
                          ...update,
                          sup_tran_description: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </Box>

                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="Date"
                          value={dayjs(update.sup_tran_date)}
                          format="LL"
                          className="w-full"
                          maxDate={value}
                          onChange={(newValue) => {
                            setTransactionDate(newValue), setFlag(true);
                          }}
                          onError={(newError) => {setError(newError)}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>

                  <div>
                    <div className="mb-4">
                      <input
                        type="file"
                        id="file-1"
                        className="hidden sr-only w-full"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(event) => {
                          setFile(event.target.files[0]);
                          setFileExists(true);
                          const get_file_size = event.target.files[0];
                          if (get_file_size.size > maxFileSize) {
                            setFileSizeExceeded(true);
                            return;
                          } else {
                            setFileSizeExceeded(false);
                          }
                        }}
                      />
                      <label
                        htmlFor="file-1"
                        id="file-1"
                        className="relative flex  items-center justify-center rounded-md text-center border border-dashed border-[#e0e0e0] py-8 px-16"
                      >
                        <div>
                          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                            Drop files here
                          </span>
                          <span className="mb-2 block text-base font-medium text-[#6B7280]">
                            Or
                          </span>
                          <span className="img-browse-btn inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                            Browse
                          </span>
                        </div>
                      </label>
                    </div>
                    {fileExists ? (
                      <div class=" rounded-md bg-[#F5F7FB] py-4 px-8">
                        <div class="flex items-center justify-between">
                          <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                            {file.name}
                          </span>
                          <button
                            class="text-[#07074D]"
                            onClick={(e) => {
                              e.preventDefault(), setFile("");
                              setFileExists(false);
                              setFileSizeExceeded(false);
                            }}
                          >
                            <IconX />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {fileSizeExceeded && (
                      <>
                        <p className="error">
                          File size exceeded the limit of {maxFileSize / 1000}{" "}
                          KB
                        </p>
                      </>
                    )}
                  </div>
                </Box>
              </div>
            </div>

            <div className="supplier-pay-btn-wrapper bg-white">
              <button className={submitDisabled ? "cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in" : "add_btn2 text-red-600" } onClick={updateTran} disabled={submitDisabled}>
                Save
              </button>
            </div>
          </form>
        </>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default EditPay;
