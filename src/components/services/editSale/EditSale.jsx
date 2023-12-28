import * as React from "react";
import { useState } from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import {
  IconReceipt,
  IconTrash,
  IconEdit,
  IconChevronLeft,
  IconAlertOctagonFilled,
  IconUser,
} from "@tabler/icons-react";
import "./editsale.scss";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import { useEffect } from "react";

const EditSale = (props) => {
  const { tranId, changeChange, change, serId } = useContext(UserContext);
  const value1 = "DOZ";
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const value = dayjs(current_date);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [flag, setFlag] = useState(false);
  const [transactionDate, setTransactionDate] = useState(value);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);
  const [openEntryDetails, setOpenEntryDetails] = useState(true);
  const [openSupplierPay, setOpenSupplierPay] = useState(false);
  const handleClick = () => {
    setOpenSupplierPay(!openSupplierPay);
    setOpenEntryDetails(!openEntryDetails);
  };
  const [data, setData] = useState({
    ser_tran_price: "",
    ser_quantity: "",
    ser_date: "",
    ser_description: "",
  });
  const delTran = () => {
    try {
      axios.delete(import.meta.env.VITE_BACKEND + `/api/ser/delTran/${tranId}`);
      changeChange();
      props.snackd();
    } catch (err) {
      console.log(err);
    }
  };
  const [info, setInfo] = useState({
    ser_name: "",
    ser_unit: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchTranData/${tranId}`)
      .then((res) => {
        setData({
          ...data,
          ser_tran_price: res.data[0].ser_tran_price,
          ser_quantity: res.data[0].ser_quantity,
          ser_description: res.data[0].ser_description,
          ser_date: res.data[0].ser_date,
        });
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ser/fetchDataid/${serId}`)
      .then((res) => {
        setInfo({
          ...info,
          ser_name: res.data[0].ser_name,
          ser_unit: res.data[0].ser_unit,
        });
      });
  }, [change]);
  const updateTran = async (e) => {
    try {
      flag ? (data.ser_date = filteredDate) : "";
      console.log(data);
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ser/updateTran/${tranId}`,
        data
      );
      changeChange();
      props.snacku();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box sx={{ width: 400 }} role="presentation">
      {openEntryDetails ? (
        <div>
          <Box sx={{ width: 400 }} className="w-full">
            <h1 className="text_left heading">Sale Record Details</h1>
            <div className="customer-profile flex items-start px-4 py-6 gap-4">
              <div className="icon2 p-3 rounded-full">
                <IconUser className="text-blue-500" />
              </div>
              <div className="">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-normal text-gray-700 -mt-1">
                    {info.ser_name}
                  </h2>
                </div>
                <p className="text-gray-500  bg-slate-200 rounded-full text-center">
                  {data.ser_date}
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
                    <IconReceipt />
                  </div>
                  <div className="customer-info-text">
                    <h2>Quantity</h2>
                    <p className=" font-medium">
                      {data.ser_quantity} {info.ser_unit}
                    </p>
                  </div>
                </div>

                <div className="flex card-sec">
                  <div className="customer-info-icon-wrapper ">
                    <IconReceipt />
                  </div>
                  <div className="customer-info-text">
                    <h2>Notes</h2>
                    <p className=" font-medium">{data.ser_description}</p>
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
                  <IconAlertOctagonFilled size={60} className="text-red-600" />
                </div>
                <div>
                  <DialogTitle id="alert-dialog-title">
                    Are You Sure ?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You are about to delete this Entry This action cannot be
                      undone.
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
              Edit sale record of the service
            </h1>

            <div className="product-stock-in-section-wrapper">
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {info.ser_unit}
                          </InputAdornment>
                        ),
                      }}
                      label="Enter quantity of services sold"
                      id="outlined-basic"
                      variant="outlined"
                      className="w-full m-0"
                      size="small"
                      value={data.ser_quantity}
                      onChange={(e) =>
                        setData({ ...data, ser_quantity: e.target.value })
                      }
                      required
                    />
                  </Box>

                  <Box className="box-sec">
                    <TextField
                      label="Sale Price"
                      id="outlined-basic"
                      variant="outlined"
                      className="w-full m-0"
                      size="small"
                      value={data.ser_tran_price}
                      onChange={(e) =>
                        setData({ ...data, ser_tran_price: e.target.value })
                      }
                      required
                    />
                  </Box>

                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="Date"
                          value={dayjs(data.ser_date)}
                          format="LL"
                          className="w-full"
                          maxDate={value}
                          onChange={(newValue) => {
                            setTransactionDate(newValue), setFlag(true);
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>

                  <Box className="box-sec">
                    <TextField
                      fullWidth
                      multiline
                      id="outlined-basic"
                      variant="outlined"
                      label="Description"
                      type="text"
                      placeholder="Enter Details (Party Name, Bill No etc)"
                      InputProps={{
                        rows: 4,
                      }}
                      className="w-full"
                      value={data.ser_description}
                      onChange={(e) =>
                        setData({ ...data, ser_description: e.target.value })
                      }
                    />
                  </Box>
                </Box>
              </div>
            </div>

            <div className="supplier-pay-btn-wrapper bg-white">
              <button
                className="add_btn2 text-red-600"
                type="submit"
                onClick={updateTran}
              >
                Update Record
              </button>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default EditSale;
