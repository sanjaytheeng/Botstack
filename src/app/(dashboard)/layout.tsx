import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/models/dashbaord/ui/views/dashbaord-sidebar";
import DashboardNavbar from "@/models/dashbaord/ui/views/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
