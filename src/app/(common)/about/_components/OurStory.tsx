"use client"

import Image from "next/image";

const OurStory = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-16 items-center border-b border-white/5">
            <div className="space-y-6">
                <div className="space-y-2">
                    <p className="font-black text-success uppercase tracking-[0.4em] text-[10px] italic">
                        Chronicle
                    </p>
                    <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Our <span className="text-success">Narrative.</span>
                    </h1>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-sm font-medium italic text-justify">
                    Founded with a passion for flavor and innovation, SnackZilla Restaurant began its journey as a boutique eatery aiming to redefine casual dining. Since its inception, we have been committed to serving high-quality dishes that combine Heritage recipes with modern culinary precision.
                    <br /><br />
                    From humble beginnings, SnackZilla quickly became a beloved destination for food enthusiasts. Our journey is a testament to our commitment to excellence, innovation, and the joy of sharing great food. Today, SnackZilla stands as a symbol of quality and creativity—a place where every meal tells a story.
                </p>
            </div>
            <div className="relative flex justify-end">
                <div className="absolute inset-0 bg-success/5 blur-3xl rounded-full" />
                <Image
                    src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1771444741/story_ilvd9g.png"
                    alt="Our Narrative Illustration"
                    width={450}
                    height={450}
                    className="object-cover rounded-3xl border border-white/5 relative z-10 shadow-2xl"
                />
            </div>
        </div>
    );
};

export default OurStory;