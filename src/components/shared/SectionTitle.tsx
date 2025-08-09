const SectionTitle = ({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-2">
      <p className="text-yellow-500 font-bold mb-2">{subHeading}</p>
      <h3 className="text-2xl font-bold uppercase border-y-4 py-4">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
