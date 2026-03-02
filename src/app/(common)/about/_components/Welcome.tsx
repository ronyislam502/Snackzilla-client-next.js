"use client"

import Image from "next/image";


const Welcome = () => {


    return (
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8">
                <div className="space-y-2">
                    <p className="font-black text-success uppercase tracking-[0.4em] text-[10px] italic">
                        Genesis
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
                        SnackZilla <br />
                        <span className="text-success">Establishment.</span>
                    </h1>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-sm font-medium italic">
                    SnackZilla is a modern culinary destination built for those who crave bold flavors and meticulously crafted bites. We believe great food should be an immersive experience, fresh and unforgettable every single time.
                    <br /><br />
                    From precision-grilled signatures to crispy artisanal snacks, every element is prepared using superior ingredients and heritage-inspired recipes. Our menu is engineered to excite the palate and redefine casual dining.
                </p>

                <button className="group flex items-center gap-3 bg-success hover:bg-success/90 text-black px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.25em] italic transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)]">
                    Explore Our Heritage
                </button>
            </div>

            {/* RIGHT IMAGES */}
            <div className="relative flex justify-end">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
                
                {/* Top Image */}
                <div className="relative w-full max-w-[420px] aspect-[4/3] z-10">
                    <Image
                        src="https://i.postimg.cc/F1XNNZ1L/welcome-1.jpg"
                        alt="Restaurant wine glass"
                        fill
                        className="object-cover rounded-3xl border border-white/5 shadow-2xl"
                        priority
                    />
                </div>
                {/* Bottom Overlapping Image */}
                <div className="absolute -bottom-12 -left-8 w-[280px] aspect-square shadow-2xl z-20 hidden lg:block">
                    <Image
                        src="https://i.postimg.cc/9QGtmFgP/welcome-2.jpg"
                        alt="Dessert"
                        fill
                        className="object-cover rounded-3xl border border-white/10"
                    />
                </div>
            </div>
        </section>
    );
};

export default Welcome;