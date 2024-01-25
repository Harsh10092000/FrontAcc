import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import MainPage from "./pages/mainpage/MainPage";
import NotFound from "./pages/notfound/NotFound";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Contact from "./pages/contactUs/Contact";
import Supplier from "./pages/supplier/Supplier";
import Services from "./pages/services/Services";
import Products from "./pages/products/Products";
import Cashbook from "./pages/cashbook/Cashbook";
import Expenses from "./pages/expenses/Expenses";
import Sales from "./pages/sales/sales";
import SalesForm from "./pages/salesForm/SalesForm";
import CustomerReport from "./pages/customerReport/CustomerReport";
import SupplierReport from "./pages/supplierReport/SupplierReport";
import CashReport from "./pages/cashReport/CashReport";
import SalesReport from "./pages/salesReport/SalesReport";
import Purchase from "./pages/purchase/Purchase";
import PurchaseForm from "./pages/purchaseForm/PurchaseForm";
import PurchaseEdit from "./pages/purchaseEdit/PurchaseEdit";
import PurchaseReport from "./pages/purchaseReport/PurchaseReport";
import Staff from "./pages/staff/Staff";
import Setting from "./pages/setting/Setting";
import SettingAccount from "./components/setting/settingAccount/SettingAccount";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import AddAccount from "./pages/account/Account";
import SalesEdit from "./pages/salesEdit/SalesEdit";
import PurchaseReturn from "./pages/purchaseReturn/PurchaseReturn";
import SalesReturn from "./pages/salesReturn/SalesReturn";
import EditAccount from "./pages/editAccount/EditAccount";
import AccountRestricted from "./pages/accountRestricted/AccountRestricted";
import StaffRestricted from "./pages/staffRestricted/StaffRestricted";
import Admin from "./pages/admin/Admin";
import AdminAccount from "./components/admin/adminAccount/AdminAccount";
import AdminSac from "./components/admin/adminSac/AdminSac";
import AdminHsn from "./components/admin/adminHsn/AdminHsn";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import Moderator from "./components/admin/moderator/Moderator";
import Subscription from "./pages/subscription/Subscription";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/home",
      element: <Home />,
    },

    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/supplier",
      element: (
        <ProtectedRoute>
          <Supplier />
        </ProtectedRoute>
      ),
    },
    {
      path: "/services",
      element: (
        <ProtectedRoute>
          <Services />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cashbook",
      element: (
        <ProtectedRoute>
          <Cashbook />
        </ProtectedRoute>
      ),
    },
    {
      path: "/expenses",
      element: (
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
      ),
    },
    {
      path: "/sales",
      element: (
        <ProtectedRoute>
          <Sales />
        </ProtectedRoute>
      ),
    },
    {
      path: "/salesform",
      element: (
        <ProtectedRoute>
          <SalesForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/salesEdit",
      element: (
        <ProtectedRoute>
          <SalesEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "/saleReturn",
      element: (
        <ProtectedRoute>
          <SalesReturn />
        </ProtectedRoute>
      ),
    },
    {
      path: "/custReport",
      element: (
        <ProtectedRoute>
          <CustomerReport />
        </ProtectedRoute>
      ),
    },
    {
      path: "/supReport",
      element: (
        <ProtectedRoute>
          <SupplierReport />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cashReport",
      element: (
        <ProtectedRoute>
          <CashReport />
        </ProtectedRoute>
      ),
    },
    {
      path: "/salesReport",
      element: (
        <ProtectedRoute>
          <SalesReport />
        </ProtectedRoute>
      ),
    },
    {
      path: "/purchase",
      element: (
        <ProtectedRoute>
          <Purchase />
        </ProtectedRoute>
      ),
    },
    {
      path: "/purchaseForm",
      element: (
        <ProtectedRoute>
          <PurchaseForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/purchaseEdit",
      element: (
        <ProtectedRoute>
          <PurchaseEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "/purchaseReturn",
      element: (
        <ProtectedRoute>
          <PurchaseReturn />
        </ProtectedRoute>
      ),
    },
    {
      path: "/purchaseReport",
      element: (
        <ProtectedRoute>
          <PurchaseReport />
        </ProtectedRoute>
      ),
    },
    {
      path: "/staff",
      element: (
        <ProtectedRoute>
          <Staff />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Setting />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "account",
          element: <SettingAccount />,
        },
        {
          path: "subscription",
          element: <Subscription />,
        },
      ],
    },
    {
      path: "/addAccount",
      element: (
        <ProtectedRoute>
          <AddAccount />
        </ProtectedRoute>
      ),
    },
    {
      path: "/editAccount",
      element: (
        <ProtectedRoute>
          <EditAccount />
        </ProtectedRoute>
      ),
    },
    {
      path: "/accountRestricted",
      element: (
        <ProtectedRoute>
          <AccountRestricted />
        </ProtectedRoute>
      ),
    },
    {
      path: "/staffRestricted",
      element: (
        <ProtectedRoute>
          <StaffRestricted />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "account",
          element: <AdminAccount />,
        },
        {
          path: "sac",
          element: <AdminSac />,
        },
        {
          path: "hsn",
          element: <AdminHsn />,
        },
        {
          path: "moderator",
          element: <Moderator />,
        },
        
       
      ],
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
