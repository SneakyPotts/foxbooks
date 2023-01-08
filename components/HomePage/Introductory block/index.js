import Compilations from './Compilations/Compilations';
import AudioBooks from './AudioBooks/AudioBooks';
import Reviews from './Reviews/Reviews';

const Introductory = ({test, audioBooks}) => {
  return (
    <>
      <Compilations test={test} />
      {!!audioBooks?.length &&
        <AudioBooks audioBooks={audioBooks} />
      }
      <Reviews />
    </>
  );
};
export default Introductory;
