"user client";

import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/sidebar/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
