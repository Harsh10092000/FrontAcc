import React from "react";
import AdminSidebar from "../../components/admin/adminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const Admin = () => {
  return (
    <SnackbarProvider maxSnack={2}>
      <div className="flex">
        <AdminSidebar />
        <Outlet />
      </div>
     </SnackbarProvider>
  );
};

export default Admin;
