import Image from "next/image";


const Welcome = () => {


    return (
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div>
                <p className="font-[cursive] text-[#b08a5a] text-2xl mb-2">
                    Welcome to
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
                    SnackZilla Restaurant
                </h1>
                <p className="text-gray-100 leading-7 text-justify mb-8">
                    SnackZilla is a modern restaurant built for snack lovers who crave bold flavors and fast, satisfying bites. We believe great food should be delicious, fresh, and fun every single time.
                    From juicy burgers and cheesy pizzas to crispy fries and mouth-watering snacks, every item at SnackZilla is prepared using quality ingredients and carefully crafted recipes. Our menu is designed to excite your taste buds and keep you coming back for more.
                    Whether you’re dining in with friends or ordering online for a quick treat, SnackZilla delivers a memorable food experience with friendly service and a vibrant atmosphere.
                </p>
                <button className="bg-[#9b846a] text-white px-8 py-3 font-medium hover:bg-[#846d54] transition">
                    Read More
                </button>
            </div>
            {/* RIGHT IMAGES */}
            <div className="relative flex justify-end mt-16 md:mt-0">
                {/* Top Image */}
                <div className="relative w-[420px] h-[260px]">
                    <Image
                        src="https://i.postimg.cc/F1XNNZ1L/welcome-1.jpg"
                        alt="Restaurant wine glass"
                        fill
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
                {/* Bottom Overlapping Image */}
                <div className="absolute -bottom-20 left-0 w-[420px] h-[260px] shadow-xl">
                    <Image
                        src="https://i.postimg.cc/9QGtmFgP/welcome-2.jpg"
                        alt="Dessert"
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default Welcome;