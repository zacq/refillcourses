import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function AppShell() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
