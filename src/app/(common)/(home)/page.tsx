import Banner from "./_components/Banner";
import Story from "./_components/Story";
import Category from "./_components/Category";
import FeatureFoods from "./_components/FeatureFoods";
import FeatureBlogs from "./_components/FreatureBlogs";
import Gallery from "./_components/Gallery";
import Special from "./_components/Special";

const Home = () => {
  return (
    <div className="px-4">
      <Banner />
      <Story />
      <Category />
      <FeatureFoods />
      <Special />
      <Gallery />
      <FeatureBlogs />
    </div>
  );
};

export default Home;
