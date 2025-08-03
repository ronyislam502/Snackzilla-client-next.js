import Banner from "./_components/Banner";
import Category from "./_components/Category";
import FeatureFoods from "./_components/FeatureFoods";

const Home = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Banner />
      <Category />
      <FeatureFoods />
    </div>
  );
};

export default Home;
