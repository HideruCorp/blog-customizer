import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

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
	const sidebarRef = useRef<HTMLElement>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit?.(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset?.();
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isFormOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () =>
				document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isFormOpen, onToggle]);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isFormOpen) {
				onToggle();
			}
		};

		if (isFormOpen) {
			document.addEventListener('keydown', handleEscapeKey);
			return () => document.removeEventListener('keydown', handleEscapeKey);
		}
	}, [isFormOpen, onToggle]);
	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
					/>
					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					<RadioGroup
						name='contentWidth'
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
