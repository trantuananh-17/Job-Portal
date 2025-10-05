import CSHARP from '@assets/images/logo_c-sharp.png';
import JAVA from '@assets/images/logo_java.png';
import JS from '@assets/images/logo_js.png';
import MYSQL from '@assets/images/logo_mysql-database.png';
import NODE from '@assets/images/logo_nodejs.png';
import POSTGRES from '@assets/images/logo_postgres.png';
import PHP from '@assets/images/logo_php.png';
import REACT from '@assets/images/logo_react.png';
import VUE from '@assets/images/logo_vue.png';
import TS from '@assets/images/logo_typescript.png';
import DOCKER from '@assets/images/logo_social.png';
import PYTHON from '@assets/images/logo_python.png';
const Carousel = () => {
  return (
    <div className='bg-black py-10'>
      <div className='group container flex space-x-16 overflow-hidden'>
        <div className='animate-carouselLoop flex space-x-12 group-hover:[animation-play-state:paused]'>
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={JS} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={TS} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={JAVA} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={PHP} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={CSHARP} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={PYTHON} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={MYSQL} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={POSTGRES} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={NODE} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={REACT} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={VUE} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={DOCKER} alt='' />
        </div>
        <div className='animate-carouselLoop aria-hidden:true flex space-x-12 group-hover:[animation-play-state:paused]'>
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={JS} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={TS} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={JAVA} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={PHP} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={CSHARP} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={PYTHON} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={MYSQL} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={POSTGRES} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={NODE} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={REACT} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={VUE} alt='' />
          <img loading='lazy' className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' src={DOCKER} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
