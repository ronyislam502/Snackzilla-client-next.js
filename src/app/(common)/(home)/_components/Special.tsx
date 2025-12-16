"use client"


const Special = () => {

const items = [
  {
    image: "https://i.postimg.cc/wj59TsC5/biriani2.jpg",
    title: "Hydrabadi Birani",
    subtitle:
      "Hyderabad biryani is a key dish in Hyderabadi cuisine. Originating in the kitchens of the Nizam of Hyderabad in India, Hyderabadi biryani is a style of biryani from Hyderabad what is made with basmati rice and goat meat . It combines elements of Hyderabadi and Mughlai cuisines in the 1630s.The taste of Hyderabadi biryani in our restaurant will remind you of Mughal elite food.",
    motionType: "zoomIn",
  },
  {
    image: "https://i.postimg.cc/sfBQfww6/kabab2.jpg",
    title: "Kebab",
    subtitle: "Many of Kebab variants are popular around the world. Kebab is a cooked meat dish what is origins in Middle Eastern cuisines. The taste and aroma of KOYLA kebab will bring you to our restaurant again and again. Our healthy kebabs will take your taste to the food of the elite Mughals and whose taste and aroma you will never forget.",
    motionType: "zoomOut",
  },
  {
    image: "https://i.postimg.cc/fL1b0QBS/drinks2.jpg",
    title: "SnackZilla Lassi",
    subtitle:
      "Lassi is a signature dish in KOYLA restaurant. Lassi is derived from the Sanskrit word Lasika meaning serous or saliva like and It is a regional name for buttermilk, the traditional dahi (yogurt)-based drink in the Indian subcontinent. Lassi is a combination of yogurt, spices, water. Salty lassi is indistinguishable to doogh, while sweet and mango lassis are like milkshakes.",
    motionType: "panLeft",
  },
    ];
    
  const motionVariants: Record<
    string,
    { hidden: any; visible: any } 
  > = {
    zoomIn: {
      hidden: { scale: 1 },
      visible: { scale: 1.15, transition: { duration: 6, ease: "easeInOut" } },
    },
    zoomOut: {
      hidden: { scale: 1.15 },
      visible: { scale: 1, transition: { duration: 6, ease: "easeInOut" } },
    },
    panLeft: {
      hidden: { x: 40, scale: 1.05 },
      visible: { x: -40, transition: { duration: 6, ease: "easeInOut" } },
    },
    panRight: {
      hidden: { x: -40, scale: 1.05 },
      visible: { x: 40, transition: { duration: 6, ease: "easeInOut" } },
    },
  };


    return (
        <div>
           <h2>Special</h2> 
        </div>
    );
};

export default Special;