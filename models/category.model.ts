import { objectify } from '../utils/objectify';

export interface Category {
    id?: string,
    description: string,
}

const defaultCategory: Required<Category> = {
    id: '',
    description: '',
};

export const getDefaultCategory = () => {
	return objectify( defaultCategory );
};