import { objectify } from '../utils/objectify';
import { Movie } from './movie.model';

export interface Actor {
    id?: string,
    name: string,
    age: number,
    birth:string,
    movies:Movie[]
}

const defaultActor: Required<Actor> = {
    id: '',
    name: '',
    age: 0,
    birth: '',
    movies: [],
};

export const getDefaultActor = () => {
	return objectify( defaultActor );
};