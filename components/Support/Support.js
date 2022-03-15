import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import Image from 'next/image';
import Input from '../shared/common/Input/Input';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import Clip from '../../public/clip.svg';
import Button from '../shared/common/Button/Button';
import styles from './index.module.scss';

const SupportCom = () => {
	const inputFile = useRef();
	const [file64, setFile64] = useState([]);

	const [modal, setModal] = useState(false);

	const {
		register,
		handleSubmit,
		unregister,
		formState: { errors },
		reset,
	} = useForm();

	const HandleSubmit = data => {
		setModal(true);
		console.log(data);
	};

	const HandleClick = () => {
		inputFile.current.click();
	};

	const generateBase64img = data => {
		let promisesAll = [];
		for (let i = 0; i < data.length; i++) {
			let item = data[i];
			const onloadPhoto = new Promise(resolver => {
				const reader = new FileReader();
				reader.readAsDataURL(item);
				reader.onload = function (e) {
					resolver({ image: e.target.result });
				};
			});
			promisesAll[i] = onloadPhoto;
		}

		Promise.all(promisesAll).then(values => {
			setFile64([...file64, ...values]);
		});
	};

	const onChange = e => {
		const files = Array.from(e.target.files);
		generateBase64img(files);
	};

	return (
		<div className={'container'}>
			<div className={styles.helpTitle}>
				<h1>Нужна помощь? </h1>
				<p>
          Если у вас появились вопросы или проблемы связанные с использованием
          сайта, напишите нашей службе поддержки, заполнив форму ниже. Ответ
          технических специалистов может занимать до 24-х часов.
				</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit(HandleSubmit)}>
				<Input
					classNames={styles.inputWidth}
					register={register}
					textLabel={'Тема обращения'}
					name="topic"
				/>
				<Input
					classNames={styles.inputWidth}
					register={register}
					textLabel={'Ваше имя'}
					name="name"
				/>
				<Input
					classNames={styles.inputWidth}
					register={register}
					typeInput="email"
					textLabel={'Электронная почта'}
					name="email"
				/>
				<p className={styles.inputLabel}>Сообщение</p>
				<div className={styles.inputArea}>
					<textarea
						{...register('textarea')}
						className={styles.textArea}
					/>
					<div onClick={HandleClick} className={styles.filesBlock}>
						<div className={styles.textAreaClip}>
							<Clip />
							<p>Файл</p>
							{file64.length > 0 && (
								<div className={styles.imgsCount}>{file64.length}</div>
							)}
						</div>

						<div className={styles.dropImgs}>
							{file64?.map(r => {
								return (
									<div key={r.image} className={styles.dropBlock}>
										<img
											height="86px"
											width="86px"
											src={r.image}
											className={styles.dropBlockImg}
										/>
									</div>
								);
							})}
						</div>
						<input
							multiple
							onChange={onChange}
							ref={inputFile}
							type="file"
							hidden
						/>
					</div>
				</div>

				<ButtonGroup
					ClassName={styles.buttons}
					text="Отправить"
					cancelClick={() => reset()}
				/>
			</form>

			{modal &&
				<ModalWindow onClose={() => setModal(false)}>
					<div className={styles.modal}>
						<h1 className={styles.modalTitle}>Отправлено</h1>
						<p>Спасибо за то, что помогаете делать наш сайт лучше.</p>
						<br></br>
						<p>Наши сотрудники ответят на ваш запрос как можно скорее.</p>
					</div>
					<Button text="Закрыть" click={() => setModal(false)}/>
				</ModalWindow>
			}
		</div>
	);
};

export default SupportCom;
