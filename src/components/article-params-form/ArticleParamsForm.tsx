import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isFormOpen: boolean;
	onToggle: () => void;
};

export const ArticleParamsForm = ({
	isFormOpen,
	onToggle,
}: ArticleParamsFormProps) => {
	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
