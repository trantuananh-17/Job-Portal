import Banner from './components/Banner';
import BetterFuture from './components/BetterFuture';
import Career from './components/Career';
import Carousel from './components/Carousel';
import RecentJob from './components/RecentJob';

const Landing = () => {
  return (
    <div>
      <Banner />
      <Carousel />
      <RecentJob />
      <BetterFuture />
      <Career />
    </div>
  );
};

export default Landing;
