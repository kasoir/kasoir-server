import { objectify } from '../utils/objectify';

export interface Jwt {
    uid: string,
    name: string,
	email: string,
	type?: string,
	isAdmin?: boolean, // default false
	isVerified: boolean,  // is email verified
	tokenLife?: number,
	refreshToken?: string,
	refreshTokenLife?: number,
	token?: string;
	actorType?: string
}
const defaultJwt: Jwt = {
    uid: '',
    name: '',
	email: '',
	type: '',
	isAdmin: false, // default false
	isVerified: false,  // is email verified
	tokenLife: 0,
	refreshToken: '',
	refreshTokenLife: 0,
	token: '',
	actorType: ''
}
export const getDefaultJwt = () => {
	return objectify( defaultJwt );
};