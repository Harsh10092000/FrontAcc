import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { UserContext } from "../../../context/UserIdContext";
import {
  IconReceipt,
  IconTrash,
  IconEdit,
  IconChevronLeft,
  IconX,
  IconPhoto,
  IconCurrencyRupee,
  IconAlertOctagonFilled,
  IconCash,
} from "@tabler/icons-react";
import "./editpay.scss";
import axios from "axios";

const EditPay = (props) => {
  const { userId, changeChange } = useContext(UserContext);
  const { tranId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [data, setData] = useState({
    tran_pay: "",
    tran_description: "",
    tran_date: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchTranid/${tranId}`)
      .then((response) => {
        setResult(response.data);
        setData({
          ...data,
          tran_pay: response.data[0].tran_pay,
          tran_description: response.data[0].tran_description,
          tran_date: response.data[0].tran_date,
        });
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchDataUsingId/${userId}`
      )
      .then((response) => {
        setResult2(response.data);
      });
  }, [tranId]);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);

  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [fileSizeExceeded, setFileSizeExceeded] = React.useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("File Name");
  const [fileExists, setFileExists] = useState(false);

  const [open, setOpen] = React.useState(false);
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/auth/deleteTran/${tranId}`
      );
      changeChange();
      props.snackd();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      data.tran_date = filteredDate;
      console.log(data);
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/auth/updateTran/${tranId}`,
        data
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

  return (
    <>
      {result.map((item, index) => (
        <Box sx={{ width: 400 }} key={index} role="presentation">
          {openEntryDetails ? (
            <div>
              <Box sx={{ width: 400 }} className="w-full">
                <h1 className="text_left heading">Pay Entry Details</h1>
                <div className="customer-profile flex items-start px-4 py-6">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                    src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="avatar"
                  />
                  <div className="">
                    <div className="flex items-center justify-between">
                      {result2.map((item, index) => (
                        <h2
                          key={index}
                          className="text-lg font-normal text-gray-700 -mt-1"
                        >
                          {item.cust_name}
                        </h2>
                      ))}
                    </div>
                    <p className="text-gray-500  bg-slate-200 rounded-full text-center">
                      {item.tran_date}
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

                <div className="pay-edit-section-wrapper">
                  <div className="edit-section">
                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconCash />
                      </div>
                      <div className="customer-info-text">
                        <h2>You Pay</h2>

                        <p className=" font-medium">₹ {item.tran_pay}</p>
                      </div>
                    </div>

                    <div className="flex card-sec">
                      <div className="customer-info-icon-wrapper ">
                        <IconReceipt />
                      </div>
                      <div className="customer-info-text">
                        <h2>Description</h2>
                        <p className=" font-medium">
                          {item.tran_description ? item.tran_description : "-"}
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
                          {item.tran_bill ? (
                            <img
                              src={
                                import.meta.env.VITE_BACKEND +
                                "/images/" +
                                item.tran_bill
                              }
                              target="_blank"
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
                            <DialogActions>
                              <button className="p-3" onClick={handleImgClose}>
                                <IconX className=" text-white" size={30} />
                              </button>
                            </DialogActions>

                            <DialogContent>
                              <img
                                className="image"
                                src={
                                  import.meta.env.VITE_BACKEND +
                                  "/images/" +
                                  item.tran_bill
                                }
                                alt="no image"
                                width={1000}
                                height={1000}
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
                        <p className=" font-medium">₹{item.balance}</p>
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
                  //className="h-100 bg-transparent"
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
                          You are about to delete this Entry This action cannot
                          be undone.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="flex gap-4">
                        <button className="pb-3" onClick={handleClose}>
                          Cancel
                        </button>
                        <button
                          className="delete-btn text-red-600 pb-3 pr-3"
                          //onClick={props.snackd}
                          autoFocus
                          onClick={handleDelete}
                        >
                          Delete Entry
                        </button>
                      </DialogActions>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
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
              <div>
                <h1 className="text_left heading text-red-500 font-semibold text-lg">
                  Edit Entry
                </h1>

                <div className="pay-section-wrapper">
                  <div className="section-2">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "95%" },
                      }}
                      noValidate
                      autoComplete="off"
                      className="w-full"
                    >
                      <Box className="box-sec">
                        <TextField
                          label="Amount"
                          name="tran_pay"
                          value={data.tran_pay}
                          // onChange={handleChange}
                          onChange={(e) =>
                            setData({ ...data, tran_pay: e.target.value })
                          }
                          id="outlined-basic"
                          variant="outlined"
                          className="w-full m-0"
                          size="small"
                          required
                        />
                      </Box>

                      <Box className="box-sec">
                        <TextField
                          fullWidth
                          multiline
                          name="tran_description"
                          //onChange={handleChange}
                          onChange={(e) =>
                            setData({
                              ...data,
                              tran_description: e.target.value,
                            })
                          }
                          id="outlined-basic"
                          variant="outlined"
                          label="Description"
                          type="text"
                          placeholder="Enter Details"
                          InputProps={{
                            rows: 5,
                          }}
                          className="w-full"
                          value={data.tran_description}
                        />
                      </Box>

                      <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <DatePicker
                              name="tran_date"
                              //onChange={handleChange}
                              label="Date"
                              value={dayjs(data.tran_date)}
                              format="LL"
                              className="w-full"
                              maxDate={todaysDate}
                              onChange={(newValue) =>
                                setTransactionDate(newValue)
                              }
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
                              setFile(event.target.value);
                              setFileExists(true);
                              const get_file_size = event.target.files[0];
                              console.log(get_file_size);
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
                                {file}
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
                              File size exceeded the limit of{" "}
                              {maxFileSize / 1000} KB
                            </p>
                          </>
                        )}
                      </div>
                    </Box>
                  </div>
                </div>

                <div className="supplier-pay-btn-wrapper bg-white">
                  <button
                    className="add_btn2 text-red-600"
                    onClick={handleClickSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </Box>
      ))}
    </>
  );
};

export default EditPay;
