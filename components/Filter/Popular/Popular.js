import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.scss';
import {useRouter} from "next/router";

const Popular = ({
	title,
	data,
	queryName,
	filterStateIdx,
	elIdx,
	setFilStateIdx
}) => {
	const router = useRouter();
	const [menu, setMenu] = useState(false);
	const [optionIndex, setOptionIndex] = useState([]);

	useEffect(() => {
		const body = document.querySelector('body');
		body.addEventListener('click', closeMenu);

		return () => {
			body.removeEventListener('click', closeMenu);
		};
	}, []);

	const togleMenu = e => {
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

	const handleOnClick = (index, value) => {
		if (optionIndex.includes(index)) {
			// remove
			setOptionIndex(optionIndex.filter(it => it !== index));
		} else {
			// add
			router.push({query: {...router.query, [queryName]: value}});
			setOptionIndex([...optionIndex, index]);
		}
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
				onClick={togleMenu}
			>
				<span className={css.dropBtnText}>{title}</span>{' '}
				<ArrowAll
					className={classnames(css.down, {
						[css.up]: menu || elIdx === filterStateIdx,
					})}
				/>
			</button>
			{menu || elIdx === filterStateIdx ? (
				<ul className={css.dropContent} onClick={e => e.stopPropagation()}>
					{data?.map((i, index) => (
						<li
							key={i?.id}
							onClick={() => handleOnClick(index, i?.value)}
							className={css.dropLink}
						>
							<span
								className={classnames(css.radio, {
									[css.radioActive]: optionIndex.includes(index),
								})}
							/>
							<span
								className={classnames(css.dropText, {
									[css.active]: optionIndex.includes(index),
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
