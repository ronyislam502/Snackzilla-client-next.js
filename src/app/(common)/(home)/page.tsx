import Banner from "./_components/Banner";
import Category from "./_components/Category";
import FeatureFoods from "./_components/FeatureFoods";
import FeatureBlogs from "./_components/FreatureBlogs";
import Special from "./_components/Special";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <FeatureFoods />
      <Special />
      <FeatureBlogs />
    </div>
  );
};

export default Home;
