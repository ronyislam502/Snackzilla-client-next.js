const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <main>{children}</main>
    </div>
  );
};

export default layout;
