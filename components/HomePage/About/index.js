import DropDownReadOnline from "./Blocks/dropDownReadOnline"
import DropDownBooksOnline from "./Blocks/dropDownBooksOnline"
import DropDownDevicesOnline from "./Blocks/dropDownDevicesOnline"
import css from './about.module.css'

const About = () => {
    return <div className={css.container}>
        <DropDownReadOnline />
        <DropDownBooksOnline />
        <DropDownDevicesOnline />
    </div>
}
export default About