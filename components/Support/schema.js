import * as yup from 'yup';

const schema = yup.object().shape({
  subject: yup.string().required('Это обязательное поле'),
  name: yup.string().required('Это обязательное поле'),
  email: yup.string().email('Некоректный адрес электронной почты').required('Это обязательное поле'),
  message: yup.string().required('Это обязательное поле'),
});

export default schema;
