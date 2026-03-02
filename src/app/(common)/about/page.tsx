import Excellence from "./_components/Excellence";
import AddressMap from "./_components/AddressMap";
import OurStory from "./_components/OurStory";
import Team from "./_components/Team";
import Welcome from "./_components/Welcome";
import Philosophy from "./_components/Philosophy";

const About = () => {
  return (
    <div className="px-4">
      <Welcome />
      <Philosophy />
      <Excellence />
      <OurStory />
      <Team />
      <AddressMap />
    </div>
  );
};

export default About;
