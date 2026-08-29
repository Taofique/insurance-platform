import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Topbar from "../components/shared/Topbar";

export default function MainLayout() {
  return (
    <div>
      <Topbar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
