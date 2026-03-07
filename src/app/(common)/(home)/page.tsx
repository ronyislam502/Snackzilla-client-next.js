import Banner from "./_components/Banner";
import Story from "./_components/Story";
import Category from "./_components/Category";
import FeatureFoods from "./_components/FeatureFoods";
import Gallery from "./_components/Gallery";
import Special from "./_components/Special";
import ServiceReviewCarousel from "./_components/ServiceReviewCarousel";
import TopSellingFoods from "./_components/TopSellingFoods";
import FeatureBlogs from "./_components/FeatureBlogs";

const Home = () => {
  return (
    <div className="px-4">
      <Banner />
      <Story />
      <Category />
      <FeatureFoods />
      <Special />
      <TopSellingFoods />
      <Gallery />
      <ServiceReviewCarousel />
      <FeatureBlogs />
    </div>
  );
};

export default Home;
