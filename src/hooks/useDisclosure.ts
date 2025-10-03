import { useEffect, useRef, useState } from 'react';

type UseDisclosureCallbacks = {
	/** Коллбэк при изменении состояния */
	onChange?: (isOpen: boolean) => void;
};

/**
 * Хук для управления раскрытием UI-элементов (sidebar, modal, dropdown).
 * Автоматически закрывает элемент при:
 * - Клике вне элемента
 * - Нажатии клавиши Escape
 *
 * @param initialState - Начальное состояние (true - открыт, false - закрыт)
 * @param callbacks - Опциональный колбэк onChange
 * @returns Объект с ref, состоянием и методом toggle
 */
export const useDisclosure = (
	initialState = false,
	callbacks: UseDisclosureCallbacks = {}
) => {
	const [isOpen, setIsOpen] = useState(initialState);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	const toggle = (forceState?: boolean) => {
		const newState = forceState !== undefined ? forceState : !isOpen;
		setIsOpen(newState);
		callbacks.onChange?.(newState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				toggle(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () =>
				document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				toggle(false);
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscapeKey);
			return () => document.removeEventListener('keydown', handleEscapeKey);
		}
	}, [isOpen]);

	return {
		ref,
		isOpen,
		toggle,
	};
};
