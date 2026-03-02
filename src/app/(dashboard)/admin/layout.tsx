"user client";

import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2  overflow-hidden">
        <div className="col-span-1 h-full overflow-hidden">
          <Sidebar />
        </div>
        <div className="col-span-4 h-full overflow-y-auto custom-scrollbar bg-black/20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
