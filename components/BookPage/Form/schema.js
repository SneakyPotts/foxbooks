import * as yup from 'yup';

const schema = yup.object().shape({
  content: yup.string().required('Это обязательное поле'),
});

export default schema;
