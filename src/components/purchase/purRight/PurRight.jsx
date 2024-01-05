import {
  IconEdit,
  IconEye,
  IconTrash,
  IconUser,
  IconAlertOctagonFilled,
  IconWallet
} from "@tabler/icons-react";
import "./purright.scss";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserIdContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PurRightTran from "../purRightTran/PurRightTran";
import { useSnackbar } from "notistack";

const PurRight = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar()
  const handleClickVariant = (variant, msg) => {
    enqueueSnackbar(msg, { variant });
  };

  const { change, purchaseId, changeChange, changePurchaseId, accountId, bills } =
    useContext(UserContext);
  const [purchaseRightTranData, setPurchaseRightTranData] = useState([]);
  const [supData, setSupData] = useState({});
  const [productList, setProductList] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [data, setData] = useState({
    purchase_prefix: "",
    purchase_prefix_no: "",
    purchase_name: "",
    purchase_date: "",
    purchase_time: "",
    sup_cnct_id: 0,
  });
  
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/purchase/fetchData/${accountId}`
      )
      .then((response) => {
        setPurchaseData(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchDataById/${purchaseId}`
      )
      .then((response) => {
        setData({
          ...data,
          purchase_id: response.data[0].purchase_id,
          purchase_prefix: response.data[0].purchase_prefix,
          purchase_prefix_no: response.data[0].purchase_prefix_no,
          purchase_name: response.data[0].purchase_name,
          purchase_date: response.data[0].purchase_date,
          purchase_time: response.data[0].purchase_time,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt: response.data[0].purchase_amt,
          purchase_amt_due: response.data[0].purchase_amt_due,
          purchase_amt_type: response.data[0].purchase_amt_type,
          purchase_pay_out_id: response.data[0].purchase_pay_out_id,
          purchase_pay_out_prefix: response.data[0].purchase_pay_out_prefix,
          purchase_pay_out_prefix_no:
            response.data[0].purchase_pay_out_prefix_no,
          purchase_amt_paid: response.data[0].purchase_amt_paid,
          purchase_re_id: response.data[0].purchase_re_id,
          purchase_re_prefix: response.data[0].purchase_re_prefix,
          purchase_re_prefix_no: response.data[0].purchase_re_prefix_no,
        });
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchaseTran/${purchaseId}`
      )
      .then((response) => {
        setPurchaseRightTranData(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchProductData/${accountId}`
      )
      .then((response) => {
        setProductList(response.data);
      });
  }, [change, purchaseId]);

  
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/sup/fetchSup/${data.sup_cnct_id}`
      )
      .then((response) => {
        setSupData({
          ...supData,
          sup_name: response.data[0].sup_name,
          sup_number: response.data[0].sup_number,
          purchase_name: response.data[0].purchase_name,
          purchase_date: response.data[0].purchase_date,
        });
      });
  }, [data]);

  const updatePurchaseData = () => {
    purchaseRightTranData.map((item, i) => {
      productList
        .filter(
          (item2) =>
            parseInt(item2.product_id) === parseInt(item.purchase_item_cnct_id)
        )
        .map((filtereditem) => {
          item.purchase_item_qty =
            parseInt(filtereditem.balance_stock) -
            parseInt(item.purchase_item_qty);
        });
    });
  };

  const deletePurchase = async () => {
    updatePurchaseData();

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/purchase/delPurchase/${purchaseId}`
      );
      changeChange();
      changePurchaseId(0);
     
      handleClickVariant('success',"Deleted Successfully")
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const delPayOut = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/purchase/delPayOut/${purchaseId}`
      );
      changeChange();
      
      handleClickVariant('success',"Deleted Successfully")
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const delPurchaseReturn = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/purchase/delPurchaseReturn/${purchaseId}`
      );
      changeChange();
      handleClickVariant('success',"Deleted Successfully")
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };


  

  const time1 = new Date(data.purchase_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";

  const total_amt = purchaseRightTranData
    .map(
      (item) =>
        parseFloat(item.purchase_item_qty) *
        (parseFloat(item.purchase_item_disc_price) +
          parseFloat(
            item.purchase_item_gst_amt ? item.purchase_item_gst_amt : 0
          ))
    )
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  const totalAmtPaid = purchaseData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.purchase_pay_out_id) ===
        parseInt(data.purchase_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.purchase_amt_paid;
    }, 0);

  return (
    <div className="w-full">
      <div className="saleCard">
        <div className="grid grid-cols-2 p-4 border-b border-slate-100 cnt">
          <div className="flex  gap-4">
            <div className="details flex flex-col gap-2 ">
              <div className="date font-semibold flex items-center gap-2 text-slate-900 text-xl">
                {data.purchase_pay_out_id === null &&
                data.purchase_re_id === null
                  ? data.purchase_prefix + "#" + data.purchase_prefix_no
                  : data.purchase_pay_out_id !== null
                  ? data.purchase_pay_out_prefix +
                    "#" +
                    data.purchase_pay_out_prefix_no
                  : data.purchase_re_prefix + "#" + data.purchase_re_prefix_no}
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {fhours + ":" + fminutes + " " + AMPM} , {data.purchase_date}
              </div>
            </div>
          </div>

          <div className="editndel flex justify-end gap-4 self-center ">
            {data.purchase_pay_out_id === null &&
            data.purchase_re_id === null ? (
              <button
                className="flex items-center gap-2 rounded text-emerald-600 p-1 hover:bg-emerald-600 hover:text-white"
                style={{
                  border: "1px solid rgb(5, 150, 105)",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={props.pdf}
              >
                <IconEye className="w-5 h-5" />
                View Pdf
              </button>
            ) : (
              ""
            )}

            {totalAmtPaid < data.purchase_amt ? (
              <button
                className="flex items-center gap-2 p-2 rounded text-amber-400 hover:text-white hover:bg-amber-500"
                style={{
                  border: "1px solid rgb(245, 158, 11)",
                  transition: "all 300ms ease-in-out",
                }}
                onClick={props.addPayment}
              >
                <IconWallet />
                Payment Out
              </button>
            ) : (
              " "
            )}

          
            {data.purchase_pay_out_id === null &&
            totalAmtPaid === 0 &&
            data.purchase_re_id === null ? (
              <Link to="/purchaseEdit">
                <button
                  className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
                  style={{
                    border: "1px solid #2b59da",
                    transition: "all 300ms ease-in-out",
                  }}
                  disabled={bills === 2 ? false : true}
                >
                  <IconEdit className="w-5 h-5" /> Edit
                </button>
              </Link>
            ) : totalAmtPaid === 0 && data.purchase_re_id === null ? (
              <button
                className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
                style={{
                  border: "1px solid #2b59da",
                  transition: "all 300ms ease-in-out",
                }}
                onClick={props.edit}
                disabled={bills === 2 ? false : true}
              >
                <IconEdit className="w-5 h-5" /> Edit
              </button>
            ) : (
              ""
            )}


            {data.purchase_pay_out_id === null &&
            totalAmtPaid === parseFloat(data.purchase_amt) &&
            data.purchase_re_id === null ? (
              <Link to="/purchaseReturn">
                <button
                  className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
                  style={{
                    border: "1px solid #2b59da",
                    transition: "all 300ms ease-in-out",
                  }}
                >
                  <IconEdit className="w-5 h-5" /> Purchase Return
                </button>
              </Link>
            ) : (
              ""
            )}
            <button
              className="flex items-center gap-2 del p-2 rounded text-red-600 hover:text-white hover:bg-red-600"
              style={{
                border: "1px solid #dc2626",
                transition: "all 300ms ease-in-out",
              }}
              onClick={handleClickOpen}
              disabled={bills === 2 ? false : true}
            >
              <IconTrash className="w-5 h-5" /> Delete
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
                      autoFocus
                      // onClick={
                      //   data.purchase_pay_out_id === null
                      //     ? deletePurchase
                      //     : delPayIn
                      // }
                      
                      onClick={data.purchase_pay_out_id === null ? deletePurchase : data.purchase_re_id !== null ? delPurchaseReturn : delPayOut}
                    >
                      Delete Entry
                    </button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
          </div>
        </div>

        <div
          className="flex justify-between space-x-6 items-center p-6"
          key={purchaseId}
        >
          <div className="flex items-center gap-4">
            <div className="icon2 bg-cyan-50">
              <IconUser className="text-cyan-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl">{supData.sup_name}</span>

              <span className="text-slate-500 text-xs">
                {supData.sup_number}
              </span>
            </div>
          </div>

          {data.purchase_pay_out_id === null ? (
            <div>
              {totalAmtPaid === 0 ? (
                <div className="flex items-center  flex-col">
                  <div className="text-slate-700">
                    ₹ {parseFloat(data.purchase_amt).toFixed(2)}
                  </div>
                  <div>Unpaid</div>
                </div>
              ) : (
                <div className="flex items-center  flex-col">
                  <div className="text-slate-700">
                    ₹ {parseFloat(data.purchase_amt).toFixed(2)}
                  </div>
                  <div>
                    {totalAmtPaid > 0 &&
                    totalAmtPaid < parseInt(data.purchase_amt)
                      ? "Partially Paid"
                      : "Fully Paid"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center  flex-col">
              <div className="text-slate-700">
                ₹ {parseFloat(data.purchase_amt_paid).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 m-5 bg-slate-100 text-lg font-semibold text-slate-800">
        <div>{data.purchase_pay_out_id === null ? "Items" : "Enteries"}</div>
      </div>

      {data.purchase_pay_out_id === null && data.purchase_re_id === null ? (
        <div className="information1">
          {purchaseRightTranData.map((item, index) => (
            <div key={index}>
              <PurRightTran
                purchase_pay_out_id={data.purchase_pay_out_id}
                data={item}
                total_amt={total_amt}
              />
            </div>
          ))}
        </div>
      ) : data.purchase_pay_out_id !== null ? (
        <div className="information1">
          <div>
            <PurRightTran
              purchase_pay_out_id={data.purchase_pay_out_id}
              purchase_amt_paid={data.purchase_amt_paid}
              purchase_prefix={data.purchase_prefix}
              purchase_prefix_no={data.purchase_prefix_no}
              total_amt={total_amt}
            />
          </div>
        </div>
      ) : (
        <div className="information1">
          <div>
            <PurRightTran
              purchase_re_id={data.purchase_re_id}
              purchase_amt_paid={data.purchase_amt_paid}
              purchase_re_prefix={data.purchase_re_prefix}
              purchase_re_prefix_no={data.purchase_re_prefix_no}
              purchase_prefix={data.purchase_prefix}
              purchase_prefix_no={data.purchase_prefix_no}
              total_amt={total_amt}
            />
          </div>
        </div>
      )}

      {/* <div className="information">
        {saleRightTranData.map((item, index) => (
          <div key={index}>
            <SaleRightTran data={item} total_amt={total_amt} />
          </div>
        ))}
      </div> */}
      <div className="flex justify-between px-7 py-5 border-t border-slate-300 text-lg border-l">
        <div className="font-semibold">Net Amount</div>
        <div className="text-slate-800 justify-self-end font-semibold">
          ₹{" "}
          {data.purchase_pay_out_id === null
            ? total_amt.toFixed(2)
            : parseFloat(data.purchase_amt_paid).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default PurRight;
