import * as yup from "yup";

const schema = yup.object().shape({
	email: yup.string().email('Неправильно введена электронная почта'),
});

export default schema