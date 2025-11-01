import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #25213C 0%, #1E2D3F 50%, #25384C 100%)",
      }}
    >
      <Header />
      <NavBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
