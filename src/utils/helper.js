import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function isDev() {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		return true;
	} else {
		return false;
	}
}

export function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function useQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}
