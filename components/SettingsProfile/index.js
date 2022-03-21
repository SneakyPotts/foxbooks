import React, {useState} from 'react';
import styles from './index.module.scss'
import Pencil from "../shared/icons/pencil";
import Bell from "../shared/icons/Bell";
import Lock from "../shared/icons/Lock";
import EditingProfile from "./editingProfile";
import SettingPassword from "./settingPassword";
import SettingNotification from "./settingNotification";
import classNames from "classnames";
import {useSelector} from "react-redux";
import Arrow from './../../public/chevron-right.svg'

const settingMenu = [
	{text: 'Редактировать профиль', icon: <Pencil/>},
	{text: 'Настройки уведомлений', icon: <Bell/>},
	{text: 'Настройки пароля', icon: <Lock/>}
]

const SettingsProfile = () => {
	const { innerWidthWindow } = useSelector(state => state.common)
	const [currentIndexMenu, setCurrentIndexMenu] = useState(0)
	const [menuIsVisible, setMenuIsVisible] = useState(true);

	const handleMenuItemClick = index => {
		setCurrentIndexMenu(index)
		if(innerWidthWindow <= 480) {
			setMenuIsVisible(false)
		}
	}

	return (
		<div className={classNames('container', styles.container)}>
			<div className={styles.setting}>
				<div className={styles.settingMenu}>
					<h1 className={'title'}>Настройки профиля</h1>
					<div className={styles.settingDropdown}>
						<div
							className={classNames(styles.menuItem, styles.settingDropdownBtn, {
								[styles.active]: menuIsVisible
							})}
							onClick={() => setMenuIsVisible(prev => !prev)}
						>
							{settingMenu[currentIndexMenu].icon}
							<span>{settingMenu[currentIndexMenu].text}</span>
							<span className={classNames(styles.settingDropdownIcon, {
									[styles.active]: menuIsVisible
								})}
							>
								<Arrow />
							</span>
						</div>
						{(innerWidthWindow > 480 || menuIsVisible) &&
							<ul>
								{settingMenu.map((r, index) => {
									return (
										<li
											key={r.text}
											className={classNames(styles.menuItem, {[styles.active]: currentIndexMenu === index})}
											onClick={() => handleMenuItemClick(index)}
										>
											{r.icon}
											<span>{r.text}</span>
										</li>
									)
								})}
							</ul>
						}
					</div>
				</div>
				<div className={styles.settingContent}>
					{currentIndexMenu === 0 ?
						<>
							<h2 className={'title'}>Редактировать профиль</h2>
							<EditingProfile/>
						</>
						: currentIndexMenu === 1 ?
							<>
								<h2 className={'title'}>Настройки уведомлений</h2>
								<SettingNotification/>
							</>
							:
							<>
								<h2 className={'title'}>Настройки пароля</h2>
								<SettingPassword/>
							</>}
				</div>
			</div>
		</div>
	);
};

export default SettingsProfile;