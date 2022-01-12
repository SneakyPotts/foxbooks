import React from 'react';
import styles from './index.module.scss'
import Checkbox from "../../shared/common/checkbox/checkbox";
import {useForm} from "react-hook-form";
import HeartSetting from "../../shared/icons/heartSetting";
import CommentSetting from "../../shared/icons/commentSetting";
import SgbCommentSetting from "../../shared/icons/sgbCommentSetting";
import ButtonGroup from "../buttonGroup";

const SettingNotification = () => {
	const {register, handleSubmit, unregister,  formState: {errors}, reset} = useForm();
	const data = [
		{svg:<HeartSetting/> , bg:'#E92A20',title: 'Отметка нравится', subTitle: 'Уведомления о реакциях к вашим комментариям.', name: 'like'},
		{svg:<CommentSetting/> , bg:'#2D9CDB', title: 'Комментарии', subTitle: 'Оповестим, что на ваш комментарий ответили.', name: 'comment'},
		{svg:<SgbCommentSetting/> , bg:'#27AE60', title: 'Также прокомментировали', subTitle: 'Кто-то еще написал в той же ветке обсуждений.', name: 'subcomment'}
	]


	const HandleSubmit = data => {
		reset()
		console.log(data)
	}

	return (
		<div className={styles.container}>
			<div className={styles.notification}>
				<form onSubmit={handleSubmit(HandleSubmit)} className={styles.formContainer}>
					{data.map(({svg, title, subTitle, name, bg})=>{
						return (
							<div className={styles.settingWrap}>
								<div className={styles.setting}>
									<div style={{background: `${bg}`}} className={styles.settingIcon}>
										{svg}
									</div>
									<div className={styles.settingDescription}>
										<h3>{title}</h3>
										<p>{subTitle}</p>
									</div>
								</div>
								<div className={styles.checkbox}>
									<Checkbox
										register={register}
										name={name}
									/>
								</div>
							</div>
						)
					})}
					<ButtonGroup ClassName={styles.groupButton}/>
				</form>
			</div>
		</div>
	);
};

export default SettingNotification;