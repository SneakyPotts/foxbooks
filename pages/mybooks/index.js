import MyBooks from '../../components/MyBooks';

const Mybooks = () => {
	return (
		<div>
			<MyBooks />
		</div>
	);
};

export default Mybooks;

export async function getServerSideProps ({ req }) {
	const { cookies } = req
	const token = cookies.token

	// if(!token) {
	// 	return {
	// 		redirect: {
	// 			destination: '/',
	// 			parameter: false
	// 		}
	// 	}
	// }

	return {
		props: {}
	}
}