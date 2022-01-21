import React, {useState} from 'react';
import styles from './index.module.scss'
import Pencil from "../shared/icons/pencil";
import Bell from "../shared/icons/Bell";
import Lock from "../shared/icons/Lock";
import EditingProfile from "./editingProfile";
import SettingPassword from "./settingPassword";
import SettingNotification from "./settingNotification";
import classNames from "classnames";

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
								<li
									key={r.text}
									className={classNames({[styles.active]: currentIndexMenu === index})}
									onClick={() => setCurrentIndexMenu(index)}
								>
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
							<h2>Редактировать профиль</h2>
							<EditingProfile/>
						</>
						: currentIndexMenu === 1 ?
							<>
								<h2>Настройки уведомлений</h2>
								<SettingNotification/>
							</>
							:
							<>
								<h2>Настройки пароля</h2>
								<SettingPassword/>
							</>}
				</div>
			</div>
		</div>
	);
};

export default SettingsProfile;