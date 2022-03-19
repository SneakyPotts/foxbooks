import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import Image from 'next/image';
import Input from '../shared/common/Input/Input';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import Clip from '../../public/clip.svg';
import Button from '../shared/common/Button/Button';
import styles from './index.module.scss';
import CommonService from '../../http/CommonService';
import { generateFormData, isFileImage } from '../../utils';
import Compressor from 'compressorjs';
import classNames from 'classnames';

const SupportCom = () => {
	const [sources, setSources] = useState([]);
	const [files, setFiles] = useState([]);

	const [modal, setModal] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const HandleSubmit = data => {
		const dataObj = {
			...data,
			attachments: files
		}

		CommonService.sendSupport(generateFormData(dataObj)).then(() => {
			setModal(true);
			setSources([])
			setFiles([])
			reset()
		})
	};

	const onCancel = () => {
		setSources([])
		setFiles([])
		reset()
	};

	const generateBase64img = data => {
		let allPromises = [];

		data.forEach(file => {
			if (isFileImage(file?.name)) {
				const onloadPhoto = new Promise(resolver => {
					new Compressor(file, {
						quality: 1,
						resize: 'cover',
						width: 86,
						height: 86,
						convertSize: 1,
						success(result) {
							let reader = new FileReader()
							reader.readAsDataURL(result)
							reader.onloadend = function () {
								resolver({reader, result})								
							}
						}
					})
				});
				
				allPromises.push(onloadPhoto)
			}
		})

		Promise.all(allPromises).then(values => {
			values?.forEach(({reader, result}) => {
				setSources(prev => [...prev, reader.result])
				setFiles(prev => [...prev, result])
			})
		});
	};

	const onChange = e => {
		const files = Array.from(e.target.files);
		generateBase64img(files);
	};

	return (
		<div className={'container'}>
			<div className={styles.helpTitle}>
				<h1 className='title'>Нужна помощь? </h1>
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
					name="subject"
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
				<div className={styles.inputArea}>
					<Input
						classNames={classNames(styles.textArea, {
							[styles.more]: sources?.length
						})}
						register={register}
						textLabel={'Сообщение'}
						name="message"
						isTextarea
						rows={6}
					/>
					<label className={styles.filesBlock}>
						<input
							type="file"
							className='visually-hidden'
							multiple
							onChange={onChange}
						/>

						<span className={styles.textAreaClip}>
							<Clip />
							<span className={styles.fileText}>Файл</span>

							{sources?.length > 0 && (
								<span className={styles.imgsCount}>{sources?.length}</span>
							)}
						</span>

						<span className={styles.dropImgs}>
							{sources?.map(i => (
								<span key={i} className={styles.dropBlock}>
									<img
										height="86px"
										width="86px"
										src={i}
										className={styles.dropBlockImg}
									/>
								</span>
							))}
						</span>
					</label>
				</div>

				<ButtonGroup
					ClassName={styles.buttons}
					text="Отправить"
					cancelClick={onCancel}
				/>
			</form>

			{modal &&
				<ModalWindow onClose={() => setModal(false)}>
					<div className={styles.modal}>
						<h3 className={styles.modalTitle}>Отправлено</h3>
						<p>Спасибо за то, что помогаете делать наш сайт лучше.</p>
						<br />
						<p>Наши сотрудники ответят на ваш запрос как можно скорее.</p>
					</div>
					<Button text="Закрыть" click={() => setModal(false)}/>
				</ModalWindow>
			}
		</div>
	);
};

export default SupportCom;
