import { objectify } from '../utils/objectify';

export interface Director {
    id?: string,
    name: string,
    nationality: string,
}

const defaultDirector: Required<Director> = {
    id: '',
    name: '',
    nationality: '',
};

export const getDefaultDirector = () => {
	return objectify( defaultDirector );
};