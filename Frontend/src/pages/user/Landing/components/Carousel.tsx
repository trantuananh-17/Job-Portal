const logos = [
  '/images/logo_js.webp',
  '/images/logo_typescript.webp',
  '/images/logo_java.webp',
  '/images/logo_php.webp',
  '/images/logo_c-sharp.webp',
  '/images/logo_python.webp',
  '/images/logo_mysql-database.webp',
  '/images/logo_postgres.webp',
  '/images/logo_nodejs.webp',
  '/images/logo_react.webp',
  '/images/logo_vue.webp',
  '/images/logo_social.webp'
];

const Carousel = () => {
  return (
    <div className='bg-black py-10'>
      <div className='group container flex space-x-16 overflow-hidden'>
        {/* Dãy chính */}
        <div className='animate-carouselLoop flex space-x-12 group-hover:[animation-play-state:paused]'>
          {logos.map((src, i) => (
            <img key={i} src={src} alt={`logo-${i}`} className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20' />
          ))}
        </div>

        {/* Dãy nhân bản để loop liên tục */}
        <div
          aria-hidden='true'
          className='animate-carouselLoop flex space-x-12 group-hover:[animation-play-state:paused]'
        >
          {logos.map((src, i) => (
            <img
              key={`clone-${i}`}
              src={src}
              alt={`logo-${i}`}
              className='h-10 w-10 max-w-none md:h-15 md:w-15 lg:h-20 lg:w-20'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
