import AudioBooks from './AudioBooks/AudioBooks';
import Compilations from './Compilations/Compilations';
import Reviews from './Reviews/Reviews';

const Introductory = ({ audioBooks }) => {
  return (
    <>
      <Compilations />
      {!!audioBooks?.length && <AudioBooks audioBooks={audioBooks} />}
      <Reviews />
    </>
  );
};
export default Introductory;
