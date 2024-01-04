import { useEffect, useState } from 'react';
import axios from 'axios'

function Test() {
  const [data, setData] = useState({
    name: "",
    pass: "",
  })

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
      useEffect(()=>{
        axios.post(import.meta.env.VITE_BACKEND + "/api/exp/test1",data)
      }, []);
  }

  return (
    <form method="post" >
    <div class="m-10 py-10 bg-slate-300">

      <p class="text-2xl font-bold pl-28 pb-8">Form</p>
    
    {data.name}
    {data.pass}
      <div class="m-4">
        <label class="m-10">
          Name : <input type="text" name="Name" onChange={(e) => setData({...data , name: e.target.value})} placeholder='Your Name' class="border-2 pl-20 mx-20" />
          </label>
      </div>

      <div class="m-4">
        <label class="m-10">
          PassWord : <input type="password" name="Email"  onChange={(e) => setData({...data , pass: e.target.value})}placeholder='Password' class="border-2 pl-20 mx-14"/>
          </label>
      </div>

     

      <button type="Submit" name="Submit" onClick={handleSubmit} class="border-2 border-blue-500 px-5 ml-28 mt-7">Submit</button>

    </div>
  </form>
  )
}

export default Test;