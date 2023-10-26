import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState, useEffect } from "react";
import axios from "axios";
import AddInvoiceItems from "../addInvoiceItems/addInvoiceItems";
import Invoive from "../invoice/Invoice";
import Switch from "@mui/material/Switch";

const AddSales = (props) => {
  const [addItemsForm, setAddItemsForm] = useState(false);

  const [customerList, setCustomerList] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const [productList, setProductList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [businessdata, setBusinessdata] = useState([]);
  const [updatedProductList, setUpdatedProductList] = useState([]);

  const [businessGst , setBusinessGst] = useState("")

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/fetchProductData`)
      .then((response) => {
        setProductList(response.data);
      });

    axios.get(`http://localhost:8000/api/ser/fetchData`).then((response) => {
      setServicesList(response.data);
    });

    axios.get(`http://localhost:8000/api/auth/fetch`).then((response) => {
      setCustomerData(response.data);
    });
    axios.get("http://localhost:8000/api/act/fetchData").then((response) => {
      setBusinessdata(response.data);
      setBusinessGst(response.data[0].business_gst)
    });
  }, []);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);
  
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [custAddress, setCustAddress] = useState(false);
  const [custData, setCustData] = useState({
    cust_id: "",
    cust_name: "",
    cust_number: "",
    cust_gst: "",
    cust_flat: "",
    cust_area: "",
    cust_city: "",
    cust_state: "",
    cust_pin: "",
  });

  const [selectedItems, setSelectedItems] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState({
    in_serial_no: 0,
    in_items: "Ghee",
    in_hsn_sac: "4533",
    in_qty: "6",
    in_unit: "KG",
    in_sale_price: "500",
    in_discount_value: "10%",
    in_discount_price: "450",
    in_discount_unit: "%",
    in_gst_prectentage: "10",
    in_gst_amt: "50",
    in_total_amt: "500",
  });

  const handlePriceChange = (productId, e) => {
    console.log("item.id.... : ", productId),
      setProductList((productList) =>
        productList.map((item) =>
          productId === item.product_id
            ? {
                ...item,
                sale_price: e.target.value,
              }
            : item
        )
      );
  };

  const handleDiscountUnit = (productId, e) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              discount_unit: e.target.value,
            }
          : item
      )
    );
  };
  const handleDiscountValue = (productId, e) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              discount_value: e.target.value ,
            }
          : item
      )
    );
  };

  const handleIncrease = (productId) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id && item.qty >= 1
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
    );
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [isGstBusiness, setIsGstBusiness] = useState(true);
  const handleBusinessGst = () => {
    setIsGstBusiness(isGstBusiness ? false : true);
  };

  const handleTaxIncluded = (productId, e) => {
    setProductList((productList) =>
      productList.map((item) =>
        productId === item.product_id
          ? {
              ...item,
              tax: item.tax === "yes" ? "no" : "yes",
            }
          : item
      )
    );
  };

  ///  gst registered false
  const handleContinue2 = () => {
    console.log(productList);
    setInvoiceItems({
      in_serial_no: 0,
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "Amount",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
    });
    setInvoiceItems((invoiceItems) =>
      productList.map((item) =>
        item.qty > 0
          ? {
              in_serial_no:
                invoiceItems.in_serial_no == 0
                  ? 1
                  : invoiceItems.in_serial_no + 1,
              in_items: item.product_name,
              in_hsn_sac: "-",
              in_qty: item.qty,
              in_unit: item.primary_unit,
              in_sale_price: item.sale_price,
              in_discount_value: item.discount_value,

              in_discount_price:
                item.discount_unit === "Percentage"
                  ? (item.sale_price * item.discount_value) / 100
                  : item.sale_price - item.discount_value,

              in_discount_unit: item.discount_unit,
              in_total_amt: "",
            }
          : invoiceItems
      )
    );
    setSelectedItems(true);
  };

  const handleContinue3 = () => {
    console.log(productList);
    setInvoiceItems({
      in_serial_no: 0,
      in_items: "",
      in_hsn_sac: "",
      in_qty: "",
      in_unit: "",
      in_sale_price: "",
      in_discount_value: 0,
      in_discount_price: "",
      in_discount_unit: "Amount",
      in_gst_prectentage: "",
      in_gst_amt: "",
      in_total_amt: "",
    });
    setInvoiceItems((invoiceItems) =>
      productList.map((item) =>
        item.qty > 0
          ? {
              in_serial_no:
                invoiceItems.in_serial_no == 0
                  ? 1
                  : invoiceItems.in_serial_no + 1,
              in_items: item.product_name,
              in_hsn_sac: "-",
              in_qty: item.qty,
              in_unit: item.primary_unit,
              in_sale_price: item.sale_price,
              in_discount_value: item.discount_value,

              // in_discount_price:
              //   item.tax === "no"
              //     ? item.discount_value
              //       ? item.sale_price - item.discount_value
              //       : item.sale_price
              //     : item.discount_value
              //     ? item.sale_price / (item.igst / 100 + 1) -
              //       item.discount_value
              //     : item.sale_price / (item.igst / 100 + 1),

              in_discount_price:
                item.tax === "no"
                  ? item.discount_unit === "Percentage" 
                    ? parseFloat(item.sale_price) - ((item.sale_price * item.discount_value ) / 100)
                    : item.sale_price - item.discount_value
                  : item.discount_unit === "Percentage"
                    ? (item.sale_price / (item.igst / 100 + 1)) *
                      (100 - item.discount_value) / 100
                     
                    : item.sale_price / (item.igst / 100 + 1) -
                      item.discount_value,

              in_discount_unit: item.discount_unit,
              in_gst_prectentage: item.igst ? item.igst : "-",
              in_gst_amt:
                item.tax === "no"
                  ? (item.igst *
                      (item.discount_unit === "Percentage"
                        ? item.sale_price - (item.sale_price * item.discount_value) / 100
                        : item.sale_price)) /
                    100
                  : item.discount_unit === "Percentage"
                  ? ((item.sale_price / (item.igst / 100 + 1) *
                  ((100 - item.discount_value) / 100)) *
                      item.igst) /
                    100           
                  : item.sale_price - item.sale_price / (item.igst / 100 + 1),
              in_total_amt: "",
            }
          : invoiceItems
      )
    );
    setSelectedItems(true);
  };

  const filteredInvoiceItems = [];
  for (let i = 0; i < invoiceItems.length; i++) {
    if (invoiceItems[i].in_qty !== "") {
      filteredInvoiceItems.push(invoiceItems[i]);
    }
  }

  const [printInvoice, setPrintInvoice] = useState(false);
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  // const handleSubmit = () => {};

  const [saleData, setSaleData] = useState({
    cust_cnct_id: "",
    sale_prefix: "Rent",
    sale_prefix_no: "10",
    sale_date: filteredDate,
    sale_name: "",
    sale_amt: "2500",
    invoiceItemsList: filteredInvoiceItems,
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      (saleData.sale_name = custData.cust_name),
        (saleData.cust_cnct_id = custData.cust_id);
      saleData.invoiceItemsList = filteredInvoiceItems;
      //expenseData.expense_date = filteredDate;
      console.log("values : ", saleData);
      await axios.post("http://localhost:8000/api/sale/addSales", saleData);
      //changeChange();
      //props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="text_left heading text-red-500 font-semibold text-lg">
        Create Sale
      </h1>

      <div className="section-wrapper-2">
        <div className="section-2">
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "35%" },
            }}
            noValidate
            autoComplete="off"
            className="w-full p-6"
          >
            <Box className="box-sec">
              <TextField
                label="Party Name"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="party_name"
                onClick={(e) => setCustomerList(true)}
                required
                value={custData.cust_name}
              />
            </Box>

            {customerList ? (
              <div>
                {customerData.map((item, index) => (
                  <div
                    className="flex justify-between"
                    onClick={() => {
                      setCustData({
                        ...custData,
                        cust_id: item.cust_id,
                        cust_name: item.cust_name,
                        cust_number: item.cust_number,
                        cust_gst: item.cust_gstin,
                        cust_flat: item.cust_sflat,
                        cust_area: item.cust_sarea,
                        cust_city: item.cust_scity,
                        cust_state: item.cust_sstate,
                        cust_pin: item.cust_spin,
                      });
                    }}
                  >
                    <div>{item.cust_name}</div>
                    <div>{item.cust_amt}</div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            <Box className="box-sec">
              <TextField
                fullWidth
                multiline
                id="outlined-basic"
                variant="outlined"
                label="Phone Number"
                type="text"
                placeholder="Enter Details"
                name="phone_number"
                onChange={handleChange}
                className="w-full"
                value={custData.cust_number}
              />
            </Box>

            <Box className="box-sec">
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Address"
                type="text"
                placeholder="Enter Details"
                name="sup_tran_description"
                //onChange={handleChange}
                onClick={(e) => {
                  setCustAddress(true);
                }}
                className="w-full"
                value={
                  custData.cust_flat +
                  "," +
                  custData.cust_area +
                  "," +
                  custData.cust_city +
                  "," +
                  custData.cust_state +
                  "," +
                  custData.cust_pin
                }
              />
            </Box>

            {custAddress ? (
              <>
                <Box className="box-sec ">
                  <TextField
                    id="outlined-basic"
                    label="Flat / Bulding No"
                    variant="outlined"
                    className="w-full "
                    size="small"
                    name="cust_flat"
                    //onChange={handleChange}
                    value={custData.cust_flat}
                  />
                </Box>
                <Box className="box-sec">
                  <TextField
                    id="outlined-basic"
                    label="Area / Locality"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    name="cust_area"
                    //onChange={handleChange}
                    value={custData.cust_area}
                  />
                </Box>
                <Box className="box-sec">
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    name="cust_city"
                    //onChange={handleChange}
                    value={custData.cust_city}
                  />
                </Box>
                <Box className="box-sec">
                  <TextField
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    name="cust_state"
                    //onChange={handleChange}
                    value={custData.cust_state}
                  />
                </Box>
                <Box className="box-sec">
                  <TextField
                    id="outlined-basic"
                    label="PIN Code"
                    variant="outlined"
                    className="w-full"
                    size="small"
                    name="cust_pin"
                    //onChange={handleChange}
                    value={custData.cust_pin}
                  />
                </Box>
              </>
            ) : (
              ""
            )}
            <Box className="box-sec">
              <TextField
                fullWidth
                multiline
                id="outlined-basic"
                variant="outlined"
                label="GSTIN"
                type="text"
                placeholder="Enter Details"
                name="sup_tran_description"
                onChange={handleChange}
                className="w-full"
                value={custData.cust_gst}
              />
            </Box>

            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={transactionDate}
                    onChange={(newValue) => setTransactionDate(newValue)}
                    format="LL"
                    className="w-full"
                    maxDate={todaysDate}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box className="box-sec margin-top-zero ">
            <label className="pl-2 ">GST Registered Business?</label>
            <Switch
              {...label}
              defaultChecked
              color="success"
              onChange={handleBusinessGst}
            />
          </Box>
          <div className="border p-3">
            <div>Items on Invoice</div>
            <div className="flex justify-between">
              <div className="p-3">SL. NO.</div>
              <div className="p-3">ITEMS</div>
              <div className="p-3">HSN/SAC</div>
              <div className="p-3">QUANTITY | UNIT</div>
              <div className="p-3">SELLING PRICE | RATE (INCL. DISCOUNT)</div>
              <div className="p-3">DISCOUNT | UNIT</div>
              <div className="p-3">GST (%) | AMOUNT (₹)</div>
              <div className="p-3">AMOUNT (₹)</div>
            </div>

            {selectedItems
              ? filteredInvoiceItems.map((item, index) => (
                  <div className="flex justify-between " key={index}>
                    <div className="p-3">{item.in_serial_no}</div>
                    <div className="p-3">{item.in_items}</div>
                    <div className="p-3">{item.in_hsn_sac}</div>
                    <div className="p-3">
                      {item.in_qty} | {item.in_unit}
                    </div>
                    <div className="p-3">
                      {item.in_sale_price}| {item.in_discount_price}
                    </div>
                    <div className="p-3">
                      {item.in_discount_value ? item.in_discount_value : "-"} |
                      {item.in_discount_unit ? item.in_discount_unit : "-"}
                    </div>
                    <div className="p-3">
                      {item.in_gst_prectentage} |
                      {item.in_gst_amt ? item.in_gst_amt : "-"}
                    </div>
                    {item.in_gst_prectentage !== "-" &&
                    isGstBusiness === true ? (
                      <div className="p-3">
                        {(
                          item.in_qty *
                          (parseFloat(item.in_discount_price) +
                            parseFloat(item.in_gst_amt))
                        ).toFixed(2)}
                      </div>
                    ) : (
                      <div className="p-3">
                        {item.in_qty * item.in_discount_price}
                      </div>
                    )}
                  </div>
                ))
              : ""}
            <div onClick={() => setAddItemsForm(true)}>
              Select Items from Inventory
            </div>
            {addItemsForm ? (
              <div>
                <div>
                  <div>Select Items</div>
                  <div>
                    <div>Products</div>
                    <div>Services</div>
                  </div>
                  <div>Add New Product</div>
                  {productList.map((item, index) => (
                    <div key={index} className="border p-3 ">
                      <div>{item.product_name}</div>
                      <div className="flex justify-between">
                        <div>
                          <div>Selling Price</div>
                          <div>{item.sale_price}</div>
                        </div>
                        <div>
                          <div>Stock</div>
                          <div>{item.balance_stock}</div>
                        </div>
                        {item.qty !== null && item.qty !== 0 ? (
                          <div>
                            <span className="border border-blue-600 py-1 px-2 rounded">
                              <button
                                onClick={(e) => {
                                  e.preventDefault(),
                                    handleDecrease(item.product_id);
                                }}
                                className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                              >
                                -
                              </button>
                              <span className="px-2">{item.qty}</span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleIncrease(item.product_id);
                                }}
                                className="px-3 text-blue-600 hover:bg-blue-200 transition-all ease-in"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault(),
                                handleIncrease(item.product_id);
                            }}
                            className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                          >
                            Add
                          </button>
                        )}
                      </div>

                      {item.tax === "yes" ? (
                        <Box className="box-sec margin-top-zero ">
                          <label className="pl-2 ">Tax Included?</label>
                          <Switch
                            {...label}
                            defaultChecked
                            color="success"
                            onChange={() => handleTaxIncluded(item.product_id)}
                          />
                        </Box>
                      ) : (
                        <Box className="box-sec margin-top-zero ">
                          <label className="pl-2 ">Tax Included?</label>
                          <Switch
                            {...label}
                            color="success"
                            onChange={() => handleTaxIncluded(item.product_id)}
                          />
                        </Box>
                      )}
                      <Box className="box-sec">
                        <TextField
                          label="Selling Price"
                          name="amount_paid"
                          defaultValue={item.sale_price}
                          id="outlined-basic"
                          variant="outlined"
                          className="w-[50%]"
                          size="small"
                          onChange={(e) =>
                            handlePriceChange(item.product_id, e)
                          }
                        />
                        <Box>
                          <select
                            name="amt_type"
                            className="w-[12%]"
                            onChange={(e) =>
                              handleDiscountUnit(item.product_id, e)
                            }
                            defaultValue="Amount"
                          >
                            
                            <option value="Amount">Amount</option>
                            <option value="Percentage">Percentage</option>
                          </select>
                          <TextField
                            name="discount_value"
                            id="outlined-basic"
                            variant="outlined"
                            className="w-[38%]"
                            size="small"
                            onChange={(e) =>
                              handleDiscountValue(item.product_id, e)
                            }
                          />
                        </Box>
                      </Box>
                    </div>
                  ))}

                  {isGstBusiness === false ? (
                    <div onClick={handleContinue2}>Save</div>
                  ) : (
                    <div onClick={handleContinue3}>Save</div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={(e) => {
              handleClick(e), setPrintInvoice(true);
            }}
          >
            Print
          </div>

          {printInvoice ? (
            <Invoive
              custData={custData}
              invoiceItems={filteredInvoiceItems}
              businessadd={businessdata.business_address}
              businessimg={businessdata.business_logo}
              filteredDate={filteredDate}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {/* <div className="add-customer-btn-wrapper1 bg-white mt-10">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            You Pay
          </button>
        ) : (
          <button className="add_btn2 text-red-600" >
            You Pay
          </button>
        )}
      </div> */}
    </form>
  );
};

export default AddSales;
