import Image from 'next/image';
// import ArrowNext from '../../public/arrow-next.svg';
import css from './hero.module.css';

const Hero = () => {
  return (
    <div className={css.hero}>
      <Image src="/hero.png" width="1200" height="400" alt="" />
      {/* <ArrowNext className={css.arrowNext} />
      <ArrowNext className={css.arrowBefore} /> */}
    </div>
  );
};
export default Hero;
