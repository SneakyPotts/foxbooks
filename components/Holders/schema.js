import * as yup from 'yup';

const schema = yup.object().shape({
  subject: yup.string().required('Это обязательное поле'),
  link_source: yup.string().required('Это обязательное поле'),
  link_content: yup.string().required('Это обязательное поле'),
  name: yup.string().required('Это обязательное поле'),
  email: yup.string().email('Некоректный адрес электронной почты').required('Это обязательное поле'),
  agreement: yup.boolean().oneOf([true], 'Это обязательное поле'),
  copyright_holder: yup.boolean().oneOf([true], 'Это обязательное поле'),
  interaction: yup.boolean().oneOf([true], 'Это обязательное поле'),
});

export default schema;
