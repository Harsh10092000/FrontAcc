import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  IconX,
  IconCheck,
  IconChevronLeft,
  IconCategory,
  IconPlus,
  IconEdit,
  IconTrashFilled,
} from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./editExpenses.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";
const EditExpenses = (props) => {
  const { change, expId, changeChange , accountId} = useContext(UserContext);
  const [expensesListResult, setExpensesListResult] = useState([]);
  const [expensesCategoryResult, setExpensesCategoryResult] = useState([]);
  const [expensesUserAddedItemList, setExpensesUserAddedItemList] = useState(
    []
  );
  const [expensesTranResult, setExpensesTranResult] = useState([]);
  const [expensesRightTranResult, setExpensesRightTranResult] = useState([]);
  const [addNewCategoryError, setAddNewCategoryError] = useState(false);
  const [editCategoryError, setEditCategoryError] = useState(false);
  const [addNewExpensesItemError, setAddNewExpensesItemError] = useState(false);
  const [editExpensesItemError, setEditExpensesItemError] = useState(false);

  const [data, setData] = useState({
    exp_prefix: "",
    exp_prefix_no: 0,
    exp_category: "",
    exp_date: "",
    exp_total: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpensesTran/${expId}`)
      .then((response) => {
        setExpensesTranResult(response.data);
        setData({
          ...data,
          exp_category: response.data[0].exp_category,
          exp_date: response.data[0].exp_date,
          exp_prefix: response.data[0].exp_prefix,
          exp_total: response.data[0].exp_total,
          exp_prefix_no: response.data[0].exp_prefix_no,
        });
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/exp/fetchExpensesRightTran/${expId}`
      )
      .then((response) => {
        setExpensesRightTranResult(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpenseCategory/${accountId}`)
      .then((response) => {
        setExpensesCategoryResult(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpenseList/${accountId}`)
      .then((response) => {
        setExpensesListResult(response.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/exp/fetchExpensesUserAddedItemList/${expId}/${accountId}/${expId}`
      )
      .then((response) => {
        setExpensesUserAddedItemList(response.data);
      });
  }, [change, expId]);

  const [isClicked, setIsClicked] = useState(false);
  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const [searchValue, setSearchValue] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);

  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [categoryName, setCategoryName] = useState("");
  console.log("categoryName : ", categoryName);
  const [addNewCategories, setAddNewCategories] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [editCategories, setEditCategories] = useState(false);
  const [updatedExpenseCategoryName, setUpdatedExpenseCategoryName] =
    useState("");
  const [ecid, setEcid] = useState(0);

  const [addExpenseItems, setAddExpenseItems] = useState(false);
  const [addNewExpenseItems, setNewAddExpenseItems] = useState(false);
  const [expenseList, setExpenseList] = useState("");
  const [price, setPrice] = useState(0);
  const [editExpenseItems, setEditExpenseItems] = useState(false);
  const [updatedExpenseItemName, setupdatedExpenseItemName] = useState("");
  const [updatedExpensePrice, setUpdatedExpensePrice] = useState("");
  const [selectedItems, setSelectedItems] = useState(false);

  const [values2, setValues2] = useState({
    category_name: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, anchor1, msg) => {
    enqueueSnackbar(msg, { variant });
  };
  values2.category_name = newCategoryValue;
  const handleClick2 = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/exp/addExpenseCategory",
        values2
      );
      changeChange();
      handleClickVariant("success", "", "Category has been added");
      setNewCategoryValue("");
    } catch (err) {
      console.log(err);
    }
  };

  const [values3, setValues3] = useState({
    expense_name: null,
    price: null,
  });

  values3.expense_name = expenseList;
  values3.price = price;

  const handleClick3 = async () => {
    console.log(values3);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/exp/addExpenselist",
        values3
      );
      changeChange();
      handleClickVariant("success", "", "Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const [values4, setValues4] = useState({
    expense_name: null,
    price: null,
  });
  values4.expense_name = updatedExpenseItemName;
  values4.price = updatedExpensePrice;
  const updateExpenseItemData = async (eiid) => {
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/exp/updateExpenseItemData/${eiid}`,
        values4
      );
      changeChange();
      handleClickVariant("success", "", "Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const [values5, setValues5] = useState({
    category_name: null,
  });
  values5.category_name = updatedExpenseCategoryName;
  const updateExpenseCategoryData = async (e) => {
    e.preventDefault();
    try {
      console.log(values5);
      await axios.put(
        import.meta.env.VITE_BACKEND +
          `/api/exp/updateExpenseCategoryData/${ecid}`,
        values5
      );
      changeChange();
      handleClickVariant("success", "", "Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpenseItemFromList = async (expenseItemId) => {
    try {
      console.log("expenseItemId :", expenseItemId);
      await axios.delete(
        import.meta.env.VITE_BACKEND +
          `/api/exp/delExpenseItemFromList/${expenseItemId}`
      );
      changeChange();
      handleClickVariant("success", "", "Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      console.log("expenseCategoryId :", expenseCategoryId);
      await axios.delete(
        import.meta.env.VITE_BACKEND +
          `/api/exp/delExpenseCategory/${expenseCategoryId}`
      );
      changeChange();
      handleClickVariant("success", "", "Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  let sum = 0;
  const [itemsFlag, setItemsFlag] = useState(false);
  const handleIncrease = (expenseItemId) => {
    console.log("item.id.... : ", expenseItemId),
      setExpensesUserAddedItemList((expensesUserAddedItemList) =>
        expensesUserAddedItemList.map((item) =>
          expenseItemId === item.id
            ? { ...item, exp_item_qty: parseInt(item.exp_item_qty) + 1 }
            : item
        )
      );
    setItemsFlag(true);
  };
  const handleDecrease = (expenseItemId) => {
    setExpensesUserAddedItemList((expensesUserAddedItemList) =>
      expensesUserAddedItemList.map((item) =>
        expenseItemId === item.id && item.exp_item_qty >= 1
          ? {
              ...item,
              exp_item_qty: parseInt(item.exp_item_qty) - 1,
            }
          : item
      )
    );
    setItemsFlag(true);
  };

  const [list, setList] = useState({
    id: expId,
    expense_name: "",
    price: "",
    qty: "",
    total_price: 0,
  });

  const handleContinue = () => {
    setList({
      id: "",
      expense_name: "",
      price: "",
      qty: "",
      total_price: 0,
    });
    setList((list) =>
      expensesUserAddedItemList.map((item) =>
        item.exp_item_qty > 0
          ? {
              id: expId,
              expense_name: item.exp_item_name,
              price: item.exp_item_price,
              qty: item.exp_item_qty,
              total_price: item.exp_item_qty * item.exp_item_price,
            }
          : list
      )
    );
  };

  console.log("list : ", list, expensesUserAddedItemList);
  const result3 = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].expense_name !== "") {
      result3.push(list[i]);
    }
  }

  for (var i = 0; i < list.length; i++) {
    sum = parseInt(list[i].total_price) + parseInt(sum);
  }

  const [expenseData, setExpenseData] = useState({
    exp_date: data.exp_date,
    exp_category: "",
    exp_total: sum,
    list: "",
  });

  const [dateFlag, setDateFlag] = useState(false);
  const [categoryFlag, setCategoryFlag] = useState(false);

  const handleChange = (e) => {
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  itemsFlag === true
    ? (expenseData.exp_total = sum)
    : (expenseData.exp_total = data.exp_total);
  dateFlag === true
    ? (expenseData.exp_date = filteredDate)
    : (expenseData.exp_date = data.exp_date);
  categoryFlag === true
    ? (expenseData.exp_category = categoryName)
    : (expenseData.exp_category = data.exp_category);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      expenseData.list = result3;

      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/exp/updateCash/${expId}`,
        expenseData
      );
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/exp/updateExpenses/${expId}`,
        expenseData
      );

      if (itemsFlag === true) {
        await axios.delete(
          import.meta.env.VITE_BACKEND +
            `/api/exp/DeleteExpensesUserAddedItemList/${expId}`
        );

        await axios.post(
          import.meta.env.VITE_BACKEND +
            "/api/exp/UpdateExpensesUserAddedItemList",
          expenseData
        );
      }

      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(false);
  useEffect(() => {
    if (expenseData.exp_total !== "" && expenseData.exp_total !== 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [expenseData.exp_total]);

  console.log("submitDisabled : ", submitDisabled, expenseData.exp_total, sum);
  return (
    <div>
      {addExpenseItems === false ? (
        <>
          <div>
            <Box>
              <h1 className="text_left heading">Edit Expense</h1>

              <div className="add-expense-section-wrapper">
                <div className="section-2">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Box className="box-sec ">
                      <Box className="sec-1 w-[50%] pt-2">
                        <TextField
                          disabled
                          id="outlined-basic"
                          variant="outlined"
                          value={data.exp_prefix}
                          name="prefix_name"
                          className=" w-[65%]"
                          required
                        />
                        <TextField
                          disabled
                          id="outlined-basic"
                          variant="outlined"
                          value={data.exp_prefix_no}
                          name="prefix_number"
                          className=" w-[35%]"
                          required
                        />
                      </Box>
                      <Box className="sec-2 w-[50%]">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className="pt-0"
                        >
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <DatePicker
                              label="Date"
                              value={dayjs(data.exp_date)}
                              format="LL"
                              maxDate={todaysDate}
                              onChange={(e) => {
                                setTransactionDate(e), setDateFlag(true);
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </Box>

                    <Box className="box-sec  ">
                      <div
                        className="w-full border border-blue-600 p-2 rounded text-blue-600 cursor-pointer flex hover:bg-blue-600 hover:text-white transition-all ease-in-out"
                        onClick={() => {
                          handleIsClicked();
                        }}
                      >
                        <div>
                          <IconCategory
                            className="w-4 h-4 mt-1"
                            style={{ position: "inherit" }}
                          />
                        </div>
                        <div className="ml-5">
                          {data.exp_category === categoryName ||
                          categoryName === ""
                            ? data.exp_category
                            : categoryName}
                        </div>
                      </div>
                    </Box>

                    <div>
                      {isClicked ? (
                        <div className="transition-all ease-in-out">
                          <div className="mb-2">
                            <TextField
                              variant="outlined"
                              label="Search Categories..."
                              size="small"
                              onChange={(e) => {
                                setSearchValue(e.target.value);
                              }}
                            />
                          </div>
                          {editCategories === false ? (
                            <div className="flex border p-2 mt-2 w-full justify-between">
                              <div
                                onClick={() => setAddNewCategories(true)}
                                className="flex items-center p-1 text-blue-600 rounded-md hover:bg-blue-100 cursor-pointer"
                              >
                                <div>
                                  <IconPlus style={{ position: "inherit" }} />
                                </div>
                                <div>Add New Category</div>
                              </div>
                              <div
                                onClick={() => {
                                  setEditCategories(true),
                                    setIsClicked(true),
                                    setAddNewCategories(false);
                                }}
                                className="px-2 py-1 text-blue-600 rounded-md hover:bg-blue-100 cursor-pointer"
                              >
                                Edit
                              </div>
                            </div>
                          ) : (
                            <div className=" inline-block">
                              <button
                                onClick={() => setEditCategories(false)}
                                className="w-fit icon_check icon_back flex items-center justify-center py-2 px-2 pl-0 text-gray-600 bg-gray-200 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in  "
                              >
                                <div>
                                  <IconChevronLeft className="fill-inherit" />
                                </div>
                                <div>Back</div>
                              </button>
                            </div>
                          )}
                          {addNewCategories ? (
                            <Box className="box-sec border category p-3">
                              <TextField
                                label="Enter Category Name"
                                name="enter-category-name"
                                id="outlined-basic"
                                variant="outlined"
                                className="w-full "
                                value={newCategoryValue}
                                size="small"
                                onChange={(e) =>
                                  setNewCategoryValue(
                                    expensesCategoryResult.find(
                                      (category) =>
                                        category.category_name.toLowerCase() ===
                                        e.target.value.toLowerCase()
                                    )
                                      ? setAddNewCategoryError(true)
                                      : (setAddNewCategoryError(false),
                                        e.target.value)
                                  )
                                }
                                helperText={
                                  addNewCategoryError
                                    ? "Category Already Exists"
                                    : ""
                                }
                              />

                              <div
                                className="pl-3 icon_check"
                                onClick={handleClick2}
                                disabled={addNewCategoryError ? true : false}
                              >
                                <IconCheck
                                  size={60}
                                  className=" text-green-600 fill-inherit cursor-pointer"
                                />
                              </div>
                              <div
                                className="pl-3 icon_check"
                                onClick={() => {
                                  setAddNewCategories(false),
                                    setAddNewCategoryError(false);
                                }}
                              >
                                <IconX
                                  size={60}
                                  className="text-slate-600 fill-inherit cursor-pointer"
                                />
                              </div>
                            </Box>
                          ) : (
                            ""
                          )}

                          {editCategories ? (
                            <Box className="box-sec border category p-3">
                              <TextField
                                label="Enter Category Name"
                                name="enter-category-name"
                                id="outlined-basic"
                                variant="outlined"
                                className="w-full "
                                size="small"
                                value={updatedExpenseCategoryName}
                                onChange={(e) =>
                                  setUpdatedExpenseCategoryName(
                                    expensesCategoryResult.find(
                                      (category) =>
                                        category.category_name ===
                                        e.target.value
                                    )
                                      ? setEditCategoryError(true)
                                      : (setEditCategoryError(false),
                                        e.target.value)
                                  )
                                }
                                helperText={
                                  editCategoryError
                                    ? "Category Already Exists"
                                    : ""
                                }
                                required
                              />

                              <button className="pl-3 icon_check">
                                <IconCheck
                                  size={60}
                                  className="text-green-600 fill-inherit cursor-pointer"
                                  onClick={updateExpenseCategoryData}
                                  disabled={editCategoryError ? true : false}
                                />
                              </button>
                              <div
                                className="pl-3 icon_check"
                                onClick={() => setEditCategories(false)}
                              >
                                <IconX
                                  size={60}
                                  className="text-slate-600 cursor-pointer"
                                />
                              </div>
                            </Box>
                          ) : (
                            ""
                          )}

                          {expensesCategoryResult
                            .filter((code) =>
                              code.category_name.startsWith(searchValue)
                            )
                            .map((filteredItem) => (
                              <div
                                key={filteredItem.id}
                                className="category"
                                onClick={() => {
                                  setCategoryName(filteredItem.category_name),
                                    setCategoryFlag(true);
                                  editCategories
                                    ? setIsClicked(true)
                                    : setIsClicked(false);
                                }}
                              >
                                {editCategories === false ? (
                                  <div className="cursor-pointer hover:bg-slate-100 p-3  w-full border border-t-0 ">
                                    <h2 className="">
                                      {filteredItem.category_name}
                                    </h2>
                                  </div>
                                ) : (
                                  <div className="cursor-pointer hover:bg-slate-100 p-3  w-full border border-t-0 flex justify-between items-center ">
                                    <div>
                                      <h2 className="">
                                        {filteredItem.category_name}
                                      </h2>
                                    </div>
                                    <div className="flex gap-4">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault(),
                                            setUpdatedExpenseCategoryName(
                                              filteredItem.category_name
                                            ),
                                            setUpdatedExpensePrice(
                                              filteredItem.price
                                            ),
                                            setEcid(filteredItem.id);
                                          setIsClicked(true);
                                        }}
                                        className="text-blue-600 py-2 px-3 rounded-[5px] hover:text-white hover:bg-blue-600 transition-all ease-in"
                                        style={{ border: "1px solid #2563eb" }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault(),
                                            deleteExpenseCategory(
                                              filteredItem.id
                                            );
                                        }}
                                        
                                        className="text-red-600 py-2 px-5 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
                                        style={{ border: "1px solid #dc2626" }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <Box className="border rounded-[4px]">
                      <div className="p-3">
                        <div className="flex justify-between">
                          <p className="text-slate-800 font-semibold text-xl pb-3">
                            Expense Item Details
                          </p>
                          {selectedItems ? (
                            <p
                              className="text-blue-600 font-semibold text-lg p-2 cursor-pointer rounded hover:bg-blue-100"
                              style={{ transition: "all 400ms ease-in-out" }}
                              onClick={() => setAddExpenseItems(true)}
                            >
                              Edit List
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        {expensesUserAddedItemList
                          .filter((i) => i.exp_item_qty > 0)
                          .map((item, index) => (
                            <div className="flex justify-between border-b p-3 ">
                              <div>
                                <p className="text-xl text-slate-600">
                                  {item.exp_item_name}
                                </p>
                                <p className="text-slate-500">
                                  {item.exp_item_qty} x {item.exp_item_price}
                                </p>
                              </div>
                              <div>
                                <p className=" font-[500] text-lg">
                                  ₹ {item.exp_item_qty * item.exp_item_price}
                                </p>
                              </div>
                            </div>
                          ))}
                        <p
                          className="text-green-600 border rounded-[10px] text-lg py-2 text-center mt-3 cursor-pointer hover:bg-green-100"
                          onClick={() => setAddExpenseItems(true)}
                          style={{ transition: "all 400ms ease-in-out" }}
                        >
                          Select Expense Items
                        </p>
                      </div>
                      <div className=" bg-slate-100 p-3 text-sm text-center">
                        <p>
                          𝒊 Expense Items will not affect your regular inventory
                          items
                        </p>
                      </div>
                    </Box>
                    <Box className="box-sec">
                      <TextField
                        label="Amount Paid"
                        name="amount_paid"
                        //value={sum > 0 ? sum : "0"}
                        value={
                          data.exp_total === sum ||
                          (sum === 0 && itemsFlag === false)
                            ? data.exp_total
                            : sum
                        }
                        id="outlined-basic"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        required
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
              </div>
            </Box>
          </div>
          <div className="add-customer-btn-wrapper1">
            {submitDisabled ? (
              <button
                disabled={submitDisabled}
                className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              >
                Update Expense
              </button>
            ) : (
              <button
                onClick={handleClick}
                disabled={submitDisabled}
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
              >
                Update Expense
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <Box
              sx={{
                width: 450,
              }}
            >
              <div className="flex justify-between p-3 text-center items-center ">
                <div className="flex justify-between flex-row category  ">
                  <button
                    className="back-btn flex gap-1 justify-center text-gray-600 bg-gray-200 w-full p-2 pl-0 rounded-[5px] hover:text-white hover:bg-gray-600 transition-all ease-in"
                    onClick={() => setAddExpenseItems(false)}
                  >
                    <IconChevronLeft />
                    Back
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-blue-500">
                    Select Expense Items
                  </p>
                </div>
              </div>
              <div className=" bg-blue-100 p-4 text-sm text-center bg-opacity-50">
                <p>
                  𝒊 Expense Items will not affect your regular inventory items
                </p>
              </div>

              <div className="add-expense-section-wrapper">
                <div className="section-2 ">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Box>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Search for an expense item "
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                      />
                    </Box>
                    <Box
                      className="  border rounded-[4px] p-2"
                      style={{ transition: "all 400ms ease-in-out" }}
                    >
                      <p
                        onClick={() => setNewAddExpenseItems(true)}
                        className="p-1 hover:bg-blue-200 text-blue-600 inline text-sm cursor-pointer rounded bg-opacity-30"
                        style={{ transition: "all 400ms ease-in-out" }}
                      >
                        Add Expense Item
                      </p>

                      {addNewExpenseItems ? (
                        <>
                          <Box className="box-sec ">
                            <TextField
                              label="Enter Name of Expense"
                              id="outlined-basic"
                              variant="outlined"
                              className="w-full "
                              size="small"
                              onChange={(e) =>
                                setExpenseList(
                                  expensesListResult.find(
                                    (item) =>
                                      item.expense_name === e.target.value
                                  )
                                    ? setAddNewExpensesItemError(true)
                                    : (setAddNewExpensesItemError(false),
                                      e.target.value)
                                )
                              }
                              helperText={
                                addNewExpensesItemError
                                  ? "Expenses Item Already Exists"
                                  : ""
                              }
                            />
                          </Box>
                          <Box className="box-sec ">
                            <TextField
                              label="Enter Price"
                              id="outlined-basic"
                              variant="outlined"
                              className="w-full "
                              size="small"
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                          </Box>
                          <div className="w-full flex pt-3 pb-1">
                            <div
                              className=" pr-6"
                              onClick={() => {
                                setPrefixValue(temp), setAddPrefix(false);
                              }}
                            >
                              <button
                                onClick={() => {
                                  handleClick3(), setNewAddExpenseItems(false);
                                }}
                                disabled={
                                  addNewExpensesItemError ? true : false
                                }
                                className="text-green-600  w-full py-2 px-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                                style={{ border: "1px solid #16a34a" }}
                              >
                                Save
                              </button>
                            </div>
                            <div
                              className=""
                              onClick={() => {
                                setNewAddExpenseItems(false),
                                  setAddNewExpensesItemError(false);
                              }}
                            >
                              <button
                                className="text-red-600 w-full py-2 px-3 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
                                style={{ border: "1px solid #dc2626" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </Box>

                    <Box>
                      {expensesUserAddedItemList
                        .filter((code) =>
                          Number.isInteger(searchValue)
                            ? code.id === searchValue
                            : code.exp_item_name
                                .toLowerCase()
                                .startsWith(searchValue.toLowerCase())
                        )
                        .map((filteredItem) => (
                          <div key={filteredItem.id} className="category">
                            <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded border-b-2 flex flex-row justify-between">
                              <div>
                                <h2 className="pr-4 py-1">
                                  {filteredItem.exp_item_name}
                                </h2>
                                <div className="flex pb-4  flex-col">
                                  <p className="text-slate-500 text-sm">
                                    PRICE
                                  </p>
                                  <p className="text-slate-800 font-semibold text-lg">
                                    ₹ {filteredItem.exp_item_price}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <span className="border border-blue-600 py-1 px-2 rounded">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault(),
                                        handleDecrease(filteredItem.id);
                                    }}
                                    className="px-3 text-blue-600  hover:bg-blue-200 transition-all ease-in"
                                  >
                                    -
                                  </button>
                                  <span className="px-2">
                                    {filteredItem.exp_item_qty}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleIncrease(filteredItem.id);
                                    }}
                                    className="px-3 text-blue-600 hover:bg-blue-200 transition-all ease-in"
                                  >
                                    +
                                  </button>
                                </span>
                                {/* <div className="flex gap-3">
                                  {filteredItem.exp_item_qty > 0 ? (
                                    <>
                                      <button
                                        data-tooltip-target="tooltip-light"
                                        data-tooltip-style="light"
                                        onClick={(e) => {
                                          e.preventDefault(),
                                            setEditExpenseItems(true),
                                            setupdatedExpenseItemName(
                                              filteredItem.exp_item_name
                                            );
                                          setUpdatedExpensePrice(
                                            filteredItem.exp_item_price
                                          );
                                          setSearchValue(filteredItem.id);
                                        }}
                                        disabled={
                                          filteredItem.exp_item_qty > 0
                                            ? true
                                            : false
                                        }
                                        className=" text-slate-600  py-2 px-4 rounded-[5px]  hover:bg-slate-300 transition-all ease-in"
                                        style={{
                                          border: "1px solid rgb(71 85 105)",
                                        }}
                                      >
                                        <IconEdit
                                          style={{
                                            position: "inherit",
                                            background: "inherit",
                                          }}
                                        />
                                      </button>
                                      <div
                                        id="tooltip-light"
                                        role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
                                      >
                                        Tooltip content
                                        <div
                                          class="tooltip-arrow"
                                          data-popper-arrow
                                        ></div>
                                      </div>
                                    </>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          setEditExpenseItems(true),
                                          setupdatedExpenseItemName(
                                            filteredItem.exp_item_name
                                          );
                                        setUpdatedExpensePrice(
                                          filteredItem.exp_item_price
                                        );
                                        setSearchValue(filteredItem.id);
                                      }}
                                      disabled={
                                        filteredItem.exp_item_qty > 0
                                          ? true
                                          : false
                                      }
                                      className=" text-blue-600  py-2 px-4 rounded-[5px]  hover:bg-blue-200 transition-all ease-in"
                                      style={{ border: "1px solid #2563eb" }}
                                    >
                                      <IconEdit
                                        style={{
                                          position: "inherit",
                                          background: "inherit",
                                        }}
                                      />

                                      <div
                                        id="tooltip-light"
                                        role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
                                      >
                                        Tooltip content
                                        <div
                                          class="tooltip-arrow"
                                          data-popper-arrow
                                        ></div>
                                      </div>
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault(),
                                        deleteExpenseItemFromList(
                                          filteredItem.id
                                        );
                                    }}
                                    className="text-red-600  py-2 px-4 rounded-[5px] hover:bg-red-200 transition-all ease-in"
                                    style={{ border: "1px solid #dc2626" }}
                                  >
                                    <IconTrashFilled
                                      style={{
                                        position: "inherit",
                                        background: "inherit",
                                      }}
                                    />
                                  </button>
                                </div> */}
                              </div>
                            </div>
                            {editExpenseItems ? (
                              <>
                                <Box className="box-sec ">
                                  <TextField
                                    label="Enter Name of Expense"
                                    value={updatedExpenseItemName}
                                    id="outlined-basic"
                                    variant="outlined"
                                    className="w-full "
                                    size="small"
                                    onChange={(e) =>
                                      setupdatedExpenseItemName(
                                        expensesListResult.find(
                                          (item) =>
                                            item.expense_name === e.target.value
                                        )
                                          ? setEditExpensesItemError(true)
                                          : (setEditExpensesItemError(false),
                                            e.target.value)
                                      )
                                    }
                                    helperText={
                                      editExpensesItemError
                                        ? "Expenses Item Already Exists"
                                        : ""
                                    }
                                  />
                                </Box>
                                <Box className="box-sec ">
                                  <TextField
                                    label="Enter Price"
                                    value={updatedExpensePrice}
                                    //name="enter-category-name"
                                    id="outlined-basic"
                                    variant="outlined"
                                    className="w-full "
                                    size="small"
                                    onChange={(e) =>
                                      setUpdatedExpensePrice(e.target.value)
                                    }
                                    required
                                  />
                                </Box>
                                <div className="w-full flex py-3 pt-5">
                                  <div
                                    className=" pr-6"
                                    onClick={() => {
                                      setPrefixValue(temp), setAddPrefix(false);
                                    }}
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          setEditExpenseItems(false);
                                        updateExpenseItemData(filteredItem.id);
                                        setSearchValue("");
                                      }}
                                      disabled={
                                        editExpensesItemError ? true : false
                                      }
                                      className="text-green-600  w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                                      style={{ border: "1px solid #47bc72" }}
                                    >
                                      Update
                                    </button>
                                  </div>
                                  <div
                                    className=""
                                    onClick={() => {
                                      e.preventDefault(),
                                        setEditExpenseItems(false),
                                        setSearchValue("");
                                    }}
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          setSearchValue(""),
                                          setEditExpenseItems(false);
                                        setEditExpensesItemError(false);
                                      }}
                                      className="text-red-600  w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
                                      style={{ border: "1px solid #dc2626" }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                    </Box>
                  </Box>
                </div>
              </div>
            </Box>
            <div
              onClick={handleContinue}
              className="flex justify-between p-3 px-5"
            >
              <div></div>

              <button
                onClick={() => {
                  setSelectedItems(true), setAddExpenseItems(false);
                }}
                className="text-blue-600  py-2 px-4 rounded-[5px] hover:text-white hover:bg-blue-600 transition-all ease-in"
                style={{ border: "1px solid rgb(37, 99, 235)" }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditExpenses;
