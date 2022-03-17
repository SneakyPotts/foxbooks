import React from 'react';
import styles from './index.module.scss'
import classnames from "classnames";

const Input = ({
	register,
	name,
	complete = 'off',
	textLabel,
	err,
	classNames,
	typeInput = 'text',
	isTextarea,
	rows,
	placeholder,
	...props
}) => {
	const autoHeightHandler = e => {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	return (
		<div
			className={classnames(styles.wrapper, classNames, {[styles.wrapperErr]: err})}
		>
			{textLabel && <label htmlFor={name}>{textLabel}</label>}

			{isTextarea ?
				<textarea
					id={name}
					{...register(name)}
					rows={rows}
					onChange={autoHeightHandler}
					placeholder={placeholder}
					{...props}
				/> :
				<input
					id={name}
					type={typeInput}
					{...register(name)}
					autoComplete={complete}
					placeholder={placeholder}
					{...props}
				/>
			}

			<p className={styles.wrapperError}>{err && err}</p>
		</div>
	);
};

export default Input;