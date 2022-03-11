import React from 'react';
import styles from './index.module.scss'
import classnames from "classnames";

const Input = ({
	register,
	name,
	complete = 'off',
	textLabel, err,
	classNames,
	typeInput = 'text',
	isTextarea,
	rows
}) => {
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
				/> :
				<input
					id={name}
					type={typeInput}
					{...register(name)}
					autoComplete={complete}
				/>
			}

			<p className={styles.wrapperError}>{err && err}</p>
		</div>
	);
};

export default Input;