import { Outlet } from "react-router";
import { Footer } from "@/components/shared/Footer";
// import { Sidebar } from "@/components/shared/Sidebar";
import { Navbar } from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";

export function RootLayout() {
  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
