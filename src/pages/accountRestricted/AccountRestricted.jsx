 import React from 'react'
 import { Link } from 'react-router-dom'

 const AccountRestricted = () => {
   return (
     <div>
       <div>Account Restricted</div>
       <Link to="/addAccount">
       <div>Create New Account</div>
       </Link>
       <Link to="/contact"></Link>
       <div>Contact Us</div>
     </div>
   )
 }
 
 export default AccountRestricted
 