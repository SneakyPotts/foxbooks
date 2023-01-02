import React, {useEffect, useRef} from 'react';
import classnames from "classnames";
import styles from './index.module.scss'

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
	const inputWrapper = useRef()
	const autoHeightHandler = e => {
		e.target.style.minHeight = 'auto';
		e.target.style.minHeight = e.target.scrollHeight + 'px';
	};

	useEffect(() => {
		const input = inputWrapper.current.children[1];

		input.style.minHeight = 'auto';
		input.style.minHeight = input.scrollHeight + 'px';
	}, []);

	return (
		<div
			ref={inputWrapper}
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
