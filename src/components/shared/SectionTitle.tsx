const SectionTitle = ({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) => {
  return (
    <div className="mx-auto text-center space-y-1 mb-10 group">
      <p className="text-success text-[10px] font-black uppercase tracking-[0.3em] italic group-hover:text-blue-400 transition-colors duration-500">
        {subHeading}
      </p>
      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-white transition-colors">
        {heading}
      </h3>
      <div className="w-12 h-1 bg-success group-hover:bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.4)] mt-2 transition-all duration-500" />
    </div>
  );
};

export default SectionTitle;
