import Image from "next/image";

const NotFound = () => {
  return (
    <div className="w-[90%] mx-auto">
      <Image
        alt="not found page"
        className="w-full"
        height={500}
        src="https://getpublii.com/docs/media/posts/30/404-error-page.png"
        width={500}
      />
    </div>
  );
};

export default NotFound;
