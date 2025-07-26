import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-[90%] mx-auto">
      <Image
        alt="Animated GIF"
        height={300}
        src="https://i.postimg.cc/T3VTgj4f/hzk6C.gif"
        unoptimized={true}
        width={500}
      />
    </div>
  );
};

export default Loading;
