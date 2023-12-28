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
  IconTrash,
  IconTrashFilled,
} from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./exadd.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";
const AddExpense = (props) => {
  const prefixSuggestions = [
    {
      option: "None",
    },
    {
      option: "Office",
    },
    {
      option: "Travel",
    },
  ];

  const { changeChange, change, accountId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [expensesPrefixData, setExpensesPrefixData] = useState([]);
  const [defaultPrefixNo, setDefaultPrefixNo] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpenseCategory/${accountId}`)
      .then((response) => {
        setResult(response.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpenseList/${accountId}`)
      .then((response) => {
        setResult2(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpensesPrefixData/${accountId}`)
      .then((response) => {
        setExpensesPrefixData(response.data);
        setDefaultPrefixNo(response.data[0].prefix_no);
      });
  }, [change]);

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

  const [categoryName, setCategoryName] = useState("Choose Category");
  const [addNewCategories, setAddNewCategories] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [editCategories, setEditCategories] = useState(false);
  const [updatedExpenseCategoryName, setUpdatedExpenseCategoryName] =
    useState("");
  const [ecid, setEcid] = useState(0);

  const [addPrefix, setAddPrefix] = useState(false);
  const [prefixValue, setPrefixValue] = useState("");
  const [temp, setTemp] = useState("");

  const [addExpenseItems, setAddExpenseItems] = useState(false);
  const [addNewExpenseItems, setNewAddExpenseItems] = useState(false);
  const [expenseList, setExpenseList] = useState("");
  const [price, setPrice] = useState(0);
  const [editExpenseItems, setEditExpenseItems] = useState(false);
  const [updatedExpenseItemName, setupdatedExpenseItemName] = useState("");
  const [updatedExpensePrice, setUpdatedExpensePrice] = useState("");
  const [selectedItems, setSelectedItems] = useState(false);

  const [prefixSelected, setprefixSelected] = useState(true);
  const prefixSelectorHandler = () => {
    setprefixSelected(!prefixSelected);
  };

  const [addNewCategoryError, setAddNewCategoryError] = useState(false);
  const [editCategoryError, setEditCategoryError] = useState(false);
  const [addNewExpensesItemError, setAddNewExpensesItemError] = useState(false);
  const [editExpensesItemError, setEditExpensesItemError] = useState(false);

  const [values2, setValues2] = useState({
    category_name: null,
    acc_id: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, anchor1, msg) => {
    enqueueSnackbar(msg, { variant });
  };
  values2.category_name = newCategoryValue;
  values2.acc_id = accountId;
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
    acc_id: "",
  });

  values3.expense_name = expenseList;
  values3.price = price;
  values3.acc_id = accountId;

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
  const updateExpenseCategoryData = async () => {
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

      //props.snackd();
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
      //props.snackd();
    } catch (err) {
      console.log(err);
    }
  };

  let sum = 0;

  const handleIncrease = (expenseItemId) => {
    console.log("item.id.... : ", expenseItemId),
      setResult2((result2) =>
        result2.map((item) =>
          expenseItemId === item.id
            ? { ...item, qty: item.qty + 1, total_price: item.qty * price }
            : item
        )
      );
  };

  const handleDecrease = (expenseItemId) => {
    console.log("item.id.... : ", expenseItemId),
      setResult2((result2) =>
        result2.map((item) =>
          expenseItemId === item.id && item.qty >= 1
            ? {
                ...item,
                qty: item.qty - 1,
                total_price: item.qty * item.price,
              }
            : item
        )
      );
  };

  let [list, setList] = useState({
    id: "",
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
      result2.map((item) =>
        item.qty > 0
          ? {
              id: item.id,
              expense_name: item.expense_name,
              price: item.price,
              qty: item.qty,
              total_price: item.qty * item.price,
            }
          : list
      )
    );
  };

  const result3 = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].id !== "") {
      result3.push(list[i]);
    }
  }

  for (var i = 0; i < list.length; i++) {
    sum = parseInt(list[i].total_price) + parseInt(sum);
  }

  const [expenseData, setExpenseData] = useState({
    prefix_name: "",
    expense_date: "",
    category_name: "",
    amount_paid: sum,
    list: result3,
    exp_acc_id : "",
  });

  expenseData.exp_acc_id = accountId;

  const handleChange = (e) => {
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [prefixNo, setPrefixNo] = useState(1);
  useEffect(() => {
    expensesPrefixData
      .filter((code) => code.exp_prefix === prefixValue)
      .map(
        (item) => setPrefixNo(item.prefix_no + 1)
        //setPrefixValue("Expenses")
      );
  }, [addPrefix]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      (expenseData.list = result3), (expenseData.amount_paid = sum);
      expenseData.expense_date = filteredDate;
      prefixValue === ""
        ? ((expenseData.prefix_name = "Expenses"),
          (expenseData.prefix_no = defaultPrefixNo + 1))
        : ((expenseData.prefix_name = temp),
          (expenseData.prefix_no = prefixNo));
      //expenseData.prefix_name = temp;
      expenseData.category_name = categoryName;
      //expenseData.prefix_no = prefixNo;
      console.log("values : ", expenseData, list);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/exp/addExpenses",
        expenseData
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (sum !== "" && sum !== 0 && categoryName !== "Choose Category") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [sum, categoryName]);

  return (
    <div>
      {addExpenseItems === false ? (
        <>
          <div>
            <Box>
              <h1 className="text_left heading">Create an Expense</h1>

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
                          id="outlined-basic"
                          variant="outlined"
                          value={prefixValue === "" ? "Expenses" : prefixValue}
                          name="prefix_name"
                          className=" w-[65%]"
                          required
                          onClick={() => setAddPrefix(true)}
                        />
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={
                            prefixValue === "" || prefixValue === undefined
                              ? defaultPrefixNo + 1
                              : prefixNo
                          }
                          name="prefix_number"
                          onChange={handleChange}
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
                              value={todaysDate}
                              format="LL"
                              maxDate={todaysDate}
                              onChange={(e) => setTransactionDate(e)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </Box>
                    <Box>
                      {addPrefix ? (
                        <Box className="border category p-3 ">
                          <div className="w-full ">
                            <TextField
                              label="Enter Prefix"
                              name="enter_prefix_name"
                              id="outlined-basic"
                              variant="outlined"
                              className="w-full "
                              size="small"
                              onChange={(e) => {
                                setTemp(e.target.value), setPrefixNo(1);
                              }}
                              required
                            />
                          </div>

                          <div>
                            <p className="py-3">Select from added prefixes </p>
                            <div className="flex gap-3">
                              {expensesPrefixData.map((item) => (
                                <p
                                  className={`border cursor-pointer rounded-[10px] py-2 px-3 ${
                                    temp === item.exp_prefix
                                      ? "selected_prefix"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setTemp(item.exp_prefix);
                                    setPrefixValue(prefixSelectorHandler);
                                  }}
                                >
                                  {item.exp_prefix}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="w-full flex py-3 pt-5">
                            <div
                              className=" pr-6"
                              onClick={() => {
                                setPrefixValue(temp), setAddPrefix(false);
                              }}
                            >
                              <button
                                className="text-green-600 w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                                style={{ border: "1px solid #16a34a" }}
                              >
                                Save
                              </button>
                            </div>
                            <div
                              className=""
                              onClick={() => setAddPrefix(false)}
                            >
                              <button
                                className="text-red-600 w-full py-2 px-4 rounded-[5px] hover:text-white hover:bg-red-600 transition-all ease-in"
                                style={{ border: "1px solid #dc2626" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Box>
                      ) : (
                        ""
                      )}
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
                        <div className="ml-5">{categoryName}</div>
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
                                    result.find(
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

                              <button
                                className="pl-3 icon_check"
                                onClick={handleClick2}
                                disabled={addNewCategoryError ? true : false}
                              >
                                <IconCheck
                                  size={60}
                                  className=" text-green-600 fill-inherit cursor-pointer"
                                />
                              </button>
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
                                    result.find(
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
                              />

                              <button
                                className="pl-3 icon_check"
                                disabled={editCategoryError ? true : false}
                              >
                                <IconCheck
                                  size={60}
                                  className="text-green-600 fill-inherit cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault(),
                                      updateExpenseCategoryData();
                                  }}
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

                          {result
                            .filter((code) =>
                              code.category_name.startsWith(searchValue)
                            )
                            .map((filteredItem) => (
                              <div
                                key={filteredItem.id}
                                className="category"
                                onClick={() => {
                                  setCategoryName(filteredItem.category_name);
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
                                            setEcid(filteredItem.id);
                                          setIsClicked(true);
                                          console.log(
                                            "IsClicked : ",
                                            isClicked,
                                            filteredItem.category_name
                                          );
                                        }}
                                        className="text-blue-600 py-2 px-3 rounded-[5px] hover:text-white hover:bg-blue-600 transition-all ease-in"
                                        style={{ border: "1px solid #2563eb" }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault(),
                                            //setupdatedExpenseItemName(filteredItem.category_name),

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
                        {selectedItems
                          ? list
                              .filter((i) => i.total_price > 0)
                              .map((item, index) => (
                                <div className="flex justify-between border-b p-3 ">
                                  <div>
                                    <p className="text-xl text-slate-600">
                                      {item.expense_name}
                                    </p>
                                    <p className="text-slate-500">
                                      {item.qty} x {item.price}
                                    </p>
                                  </div>
                                  <div>
                                    <p className=" font-[500] text-lg">
                                      ₹ {item.total_price}
                                    </p>
                                  </div>
                                </div>
                              ))
                          : ""}
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
                        value={sum > 0 ? sum : "0"}
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
                Add Expense
              </button>
            ) : (
              <button
                onClick={handleClick}
                disabled={submitDisabled}
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
              >
                Add Expense
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
                              //onChange={(e) => setExpenseList(e.target.value)}
                              onChange={(e) =>
                                setExpenseList(
                                  result2.find(
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
                                onClick={(e) => {
                                  e.preventDefault(),
                                    handleClick3(),
                                    setNewAddExpenseItems(false);
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
                      {result2
                        .filter(
                          (code) =>
                            code.expense_name.startsWith(searchValue) ||
                            code.id === searchValue
                        )
                        .map((filteredItem) => (
                          <div key={filteredItem.id} className="category">
                            <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded border-b-2 flex flex-row justify-between">
                              <div>
                                <h2 className="pr-4 py-1">
                                  {filteredItem.expense_name}
                                </h2>
                                <div className="flex pb-4  flex-col">
                                  <p className="text-slate-500 text-sm">
                                    PRICE
                                  </p>
                                  <p className="text-slate-800 font-semibold text-lg">
                                    ₹ {filteredItem.price}
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
                                    {filteredItem.qty}
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
                                <div className="flex gap-3">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault(),
                                        setEditExpenseItems(true),
                                        setupdatedExpenseItemName(
                                          filteredItem.expense_name
                                        );
                                      setUpdatedExpensePrice(
                                        filteredItem.price
                                      );
                                      setSearchValue(filteredItem.id);
                                    }}
                                    className="text-blue-600  py-2 px-4 rounded-[5px]  hover:bg-blue-200 transition-all ease-in"
                                    style={{ border: "1px solid #2563eb" }}
                                  >
                                    <IconEdit
                                      style={{
                                        position: "inherit",
                                        background: "inherit",
                                      }}
                                    />
                                  </button>
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
                                </div>
                              </div>
                            </div>
                            {editExpenseItems ? (
                              <>
                                <Box className="box-sec ">
                                  <TextField
                                    label="Enter Name of Expense"
                                    //name="enter-category-name"
                                    value={updatedExpenseItemName}
                                    id="outlined-basic"
                                    variant="outlined"
                                    className="w-full "
                                    size="small"
                                    onChange={(e) =>
                                      setupdatedExpenseItemName(
                                        result2.find(
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

export default AddExpense;
