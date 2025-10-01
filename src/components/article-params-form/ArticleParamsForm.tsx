import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';

type ArticleParamsFormProps = {
	isFormOpen: boolean;
	onToggle: () => void;
	onSubmit?: (state: ArticleStateType) => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({
	isFormOpen,
	onToggle,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit?.(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset?.();
	};
	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
