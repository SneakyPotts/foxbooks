import React, {useState} from 'react';
import styles from './index.module.scss'
import Pencil from "../shared/icons/pencil";
import Bell from "../shared/icons/Bell";
import Lock from "../shared/icons/Lock";
import EditingProfile from "./editingProfile";
import SettingPassword from "./settingPassword";
import SettingNotification from "./settingNotification";

const settingMenu = [
	{text: 'Редактировать профиль', icon: <Pencil/>},
	{text: 'Настройки уведомлений', icon: <Bell/>},
	{text: 'Настройки пароля', icon: <Lock/>}
]

const SettingsProfile = () => {
	const [currentIndexMenu, setCurrentIndexMenu] = useState(0)

	return (
		<div className={styles.container}>
			<div className={styles.setting}>
				<div className={styles.settingMenu}>
					<h1>Настройки профиля</h1>
					<ul>
						{settingMenu.map((r, index) => {
							return (
								<li onClick={() => setCurrentIndexMenu(index)} key={r.text}>
									{r.icon}
									<span>{r.text}</span>
								</li>
							)
						})}
					</ul>
				</div>
				<div className={styles.settingContent}>
					{currentIndexMenu === 0 ?
						<>
							<h1>Редактировать профиль</h1>
							<EditingProfile/>
						</>
						: currentIndexMenu === 1 ?
							<>
								<h1>Настройки уведомлений</h1>
								<SettingNotification/>
							</>
							:
							<>
								<h1>Настройки пароля</h1>
								<SettingPassword/>
							</>}
				</div>
			</div>
		</div>
	);
};

export default SettingsProfile;