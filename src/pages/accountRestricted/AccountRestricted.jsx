 import React from 'react'
 import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
 

 const AccountRestricted = () => {
  const [currUser, setCurrUser] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    if (items) {
      setCurrUser(items);
    }
  }, []);

  console.log(currUser.length)

   return (
     <div>
       <div>Account Restricted</div>
       <Link to="/Login">
       <div>Login</div>
       </Link>
       
        <Link to="/addAccount">
        <div>Create New Acc</div>
        </Link>
       
       <Link to="/contact"></Link>
       <div>Contact Us</div>
     </div>
   )
 }
 
 export default AccountRestricted
 