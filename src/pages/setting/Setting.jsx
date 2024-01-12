import Navbar from "../../components/navbar/Navbar";
import SettingSide from "../../components/setting/settingSide/SettingSide";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
const MySetting = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SettingSide />
        <Outlet />
      </div>
    </div>
  );
};
const Setting = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MySetting />
    </SnackbarProvider>
  );
};

export default Setting;
