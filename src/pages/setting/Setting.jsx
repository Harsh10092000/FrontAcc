import Navbar from "../../components/navbar/Navbar";
import SettingSide from "../../components/setting/settingSide/SettingSide";
import { Outlet } from "react-router-dom";
const Setting = () => {
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

export default Setting;
