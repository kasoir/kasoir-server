import { objectify } from '../utils/objectify';

export interface Sales {
    id?: string,
    name: string,
    date: string,
    price: number
}

const defaultSales: Required<Sales> = {
    id: '',
    name: '',
    date: '',
    price: 0,
};

export const getDefaultSales = () => {
	return objectify( defaultSales );
};