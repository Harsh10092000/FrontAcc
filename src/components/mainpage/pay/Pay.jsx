import { useContext, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./pay.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const Pay = (props) => {
  const { userId, changeChange } = useContext(UserContext);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 20000;
  const [file, setFile] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [transactionDate, setTransactionDate] = useState(todaysDate);
  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [custAmt, setCustAmt] = useState(0);
  const [amtType, setAmtType] = useState("");
  const [bal, setBal] = useState(null);
  
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/auth/fetchDataUsingId/${userId}`
      )
      .then((response) => {
        setCustAmt(response.data[0].cust_amt);
        setAmtType(response.data[0].amt_type);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchLastTran/${userId}`)
      .then((response) => {
        setBal(response.data[0].balance);
      });
  }, [userId]);

  const [values, setValues] = useState({
    tran_date: "",
    tran_pay: "",
    tran_description: "",
    cnct_id: userId,
    balance: "",
  });
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [error, setError] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (amtType === "pay") {
        if (bal === null) {
          values.balance = custAmt + parseInt(values.tran_pay);
        } else {
          values.balance = bal + parseInt(values.tran_pay);
        }
      } else if (amtType === "receive") {
        if (bal === null) {
          values.balance = custAmt - parseInt(values.tran_pay);
        } else {
          values.balance = bal - parseInt(values.tran_pay);
        }
      }

      const formData = new FormData();
      values.tran_date = filteredDate;
      formData.append("image", file);
      formData.append("tran_pay", values.tran_pay);
      formData.append("tran_description", values.tran_description);
      formData.append("cnct_id", values.cnct_id);
      formData.append("tran_date", values.tran_date);
      formData.append("balance", values.balance);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/auth/sendTran",
        formData
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    
    if (values.tran_pay !== "" && error === null) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [values.tran_pay, error]);

  
  //{console.log( maxFileSize, file , fileExists , file.size)}
  useEffect(() => {
    console.log("fileExists : " ,file,  fileExists)
    if (file !== '' || file !== undefined) {
      console.log("file : " , file)
      if (file.size > maxFileSize) {
        () => setFileSizeExceeded(true);
        return;
      } else {
        () => setFileSizeExceeded(false);
      }
    } else {
      () => setFileExists(false);
    }
  }, [file])
  
  

  const numberValidation = /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g;
  return (
    <form className="block overflow-hidden" method="post">
      <h1 className="text_left heading text-red-500 font-semibold text-lg">
        Add New Entry
      </h1>

      <div className="section-wrapper-2">
        <div className="section-2">
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "95%" },
            }}
            noValidate
            autoComplete="off"
            className="w-full p-6"
          >
            <Box className="box-sec">
              <TextField
                label="Amount"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="tran_pay"
                inputProps={{ maxLength: 10 }}
                value={values.tran_pay}
                onChange={(e) =>
                  setValues({
                    ...values,
                    
                    //tran_pay: e.target.value.replace(/^\.|[^0-9.]/g, "").replace(/(\.\d*\.)/, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1")
                    tran_pay: e.target.value.replace(numberValidation, "$1")
                  })
                }
                required
              />
            </Box>

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
                name="tran_description"
                className="w-full"
                onChange={handleChange}
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
                    onError={(newError) => {setError(newError)}}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>

            
            
          <div className="w-[80%]">
            <div className="mb-4">
              {console.log(file.length)}
              <input
                type="file"
                id="file-1"
                className="hidden sr-only w-full"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  console.log(file.length)
                  //if (file !== "" || file !== undefined)
                  if (file.length !== undefined && file.length !== 0)
                  {
                    setFileExists(true);
                  } else {
                    setFileExists(false);
                  }
                   
                  const get_file_size = event.target.files[0];
                 
                  // if (file !== "") {
                  //   console.log("file : " , file)
                  //   if (get_file_size.size > maxFileSize) {
                  //     setFileSizeExceeded(true);
                  //     return;
                  //   } else {
                  //     setFileSizeExceeded(false);
                  //   }
                  // } else {
                  //   setFileExists(false);
                  // }
                  
                }}
              />

              <label
                htmlFor="file-1"
                id="file-1"
                className="relative flex  items-center justify-center rounded-md text-center border border-dashed border-[#b6b6b6] py-8 px-16"
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


            {fileExists === true ? (
              <div className=" rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    {file.name}
                  </span>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {fileSizeExceeded && (
              <>
                <p className="error">
                  File size exceeded the limit of
                  {maxFileSize / 1000000} MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="add-customer-btn-wrapper1">
        {submitDisabled ? (
          <button
            disabled={submitDisabled}
            className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
          >
            You Pay
          </button>
        ) : (
          <button className="add_btn2 text-red-600" onClick={handleClick}>
            You Pay
          </button>
        )}
      </div>
    </form>
  );
};

export default Pay;


// import React, { useState } from 'react'

// const Pay = () => {
//   const [todos , setTodos] = useState([]);
//   const [input, setInput] = useState("");
//   console.log(todos, input)
//   const addTodo = () => {
//     setTodos([...todos , input])
//   }
//   const delTodo = (id) => {
//     // setTodos(
//     //   todos.filter((code) => (
//     //     //code[id] != id
//     //     //console.log(code.id)
//     //   ))
//     // )
//     const newTodos = [...todos];
//   newTodos.splice(id, 1);
//   setTodos(newTodos);
    
//   }
//   return (
//     <div>
//       <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
//       <button onClick={addTodo} >add</button>
//       <div>
//         {todos.map((item, index) => (
//           <div>
//           <div>{item}</div>
//           <div onClick={() => delTodo(index)} >delete</div>
//           </div>
//         ))}
//       </div>
      
//     </div>
//   )
// }

// export default Pay

