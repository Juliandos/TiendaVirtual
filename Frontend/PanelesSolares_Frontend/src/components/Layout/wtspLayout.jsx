import { Outlet } from "react-router-dom";
import WhatsAppFloat from "../Wtsp/index";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <WhatsAppFloat />
      <Outlet />
    </div>
  );
}