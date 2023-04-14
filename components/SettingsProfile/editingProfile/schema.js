import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Некоректный адрес электронной почты'),
});

export default schema;
