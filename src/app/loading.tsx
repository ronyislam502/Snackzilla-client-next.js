import Image from "next/image";

const Loading = () => {
  return (
    <div className="hero min-h-screen flex items-center justify-center bg-black">
      <Image
        src="https://i.postimg.cc/T3VTgj4f/hzk6C.gif"
        alt="Loading Animation"
        width={500}
        height={300}
        unoptimized={true}
        priority
        className="w-auto h-auto rounded-xl"
      />
    </div>
  );
};

export default Loading;