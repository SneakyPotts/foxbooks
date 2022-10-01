import SelectionsPage from '../../components/Selections';
import SelectionService from "../../http/SelectionService";
import {setSelections} from "../../store/selectionSlice";
import {useDispatch} from "react-redux";

const Selections = (props) => {
	const dispatch = useDispatch()

	dispatch(setSelections(props?.selections))

	return <SelectionsPage />;
};

export default Selections;

export async function getServerSideProps ({ req, query }) {
	const { cookies } = req
	const token = cookies.token

	const selections = await SelectionService.getSelections({token, ...query})

	return {
		props: {
			SEO: {
				title: `Лучшие подборки книг на FoxBooks 🦊| Электронные книги бесплатно`,
				description: `Тематические списки и лучшие подборки книг всех жанров от редакции FoxBooks: от лучших антиутопий до научной фантастики и романов! Читайте онлайн на смартфонах и компьютерах!`,
				keywords: [`лучшие подборки книг`, `электронные книги бесплатно`]
			},
			selections: selections?.data?.data
		}
	}
}
