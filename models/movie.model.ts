import { objectify } from '../utils/objectify';

export interface Movie {
	id: string,
	name: string,
	category: string,
	description: string,
	director: string,
	year: string,
	rate: number,
	price: number,
	uploadDate: string,
	downloadLink: string,
	coverImage: string,
}

const defaultMovie: Movie = {
	id: '',
	name: '',
	category: '',
	description: '',
	director: '',
	year: '',
	rate: 0,
	price: 0,
	uploadDate: '',
	downloadLink: '',
	coverImage: '',
};

export const getDefaultMovie = (): Movie => {
	return objectify( defaultMovie );
};
export interface FileMetaData {
	name: string,
}

export interface BaseMovFileData extends FileMetaData {
	file: Blob,
	apiTempPath?: string
}
export interface MovFile extends BaseMovFileData {
	movie?: Movie;
}