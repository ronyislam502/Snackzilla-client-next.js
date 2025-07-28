import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
