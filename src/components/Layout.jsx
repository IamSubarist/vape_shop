import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#25213C]">
      <Header />
      <NavBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
