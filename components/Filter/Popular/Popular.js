import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.scss';
import {useRouter} from "next/router";

const Popular = ({
	data,
	queryName,
	filterStateIdx,
	elIdx,
	setFilStateIdx
}) => {
	const router = useRouter();

	const [menu, setMenu] = useState(false);
	const [activeTitle, setActiveTitle] = useState(data?.find(i => i?.value === +router.query[queryName])?.title);
	const [activeEl, setActiveEl] = useState(+router.query[queryName]);

	useEffect(() => {
		const body = document.querySelector('body');
		body.addEventListener('click', closeMenu);

		return () => {
			body.removeEventListener('click', closeMenu);
		};
	}, []);

	const toggleMenu = e => {
		e.stopPropagation();
		if (setFilStateIdx) {
			setFilStateIdx(prev => {
				if (prev === elIdx) {
					return null;
				} else {
					return elIdx;
				}
			});
		} else {
			setMenu(!menu);
		}
	};

	const handleOnClick = (value, title) => {
		router.push({query: {...router.query, [queryName]: value}}, null, {scroll: false});
		setActiveEl(value);
		setActiveTitle(title)
	};

	const closeMenu = () => {
		setMenu(false);
		setFilStateIdx(null);
	};

	return (
		<div className={css.dropdown}>
			<button
				type="button"
				className={`${css.dropBtn} ${
					menu || elIdx === filterStateIdx ? css.open : css.close
				}`}
				onClick={toggleMenu}
			>
				<span className={css.dropBtnText}>{activeTitle}</span>{' '}
				<ArrowAll
					className={classnames(css.down, {
						[css.up]: menu || elIdx === filterStateIdx,
					})}
				/>
			</button>
			{menu || elIdx === filterStateIdx ? (
				<ul className={css.dropContent} onClick={e => e.stopPropagation()}>
					{data?.map(i => (
						<li
							key={i?.id}
							onClick={() => handleOnClick(i?.value, i?.title)}
							className={css.dropLink}
						>
							<span
								className={classnames(css.radio, {
									[css.radioActive]: activeEl === i?.value,
								})}
							/>
							<span
								className={classnames(css.dropText, {
									[css.active]: activeEl === i?.value,
								})}
							>
								{i?.title}
							</span>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
export default Popular;
