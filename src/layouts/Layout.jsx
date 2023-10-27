import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavB from "../components/Navbar";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  // Vérifiez si l'emplacement actuel est le tableau de bord
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="flex gap-[250px] ">
      <Sidebar open={open} setOpen={setOpen} className="h-screen" />
      <div
        className={`w-[100%] ${
          open ? " ml-[40px]" : " -ml-[100px]"
        }  overflow-hidden transition-all duration-700`}
      >
        <NavB />
        <div id="App" className="w-[100%] overflow-x-hidden">
          <Outlet />
          {isDashboard && (
            <div className="chart-container overflow-x-hidden"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
