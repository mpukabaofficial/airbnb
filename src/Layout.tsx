import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col px-8 py-4">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
