export const getnowDate = () => {
	const dateObject = new Date();
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();
	const year = dateObject.getFullYear();
	const date = ( year * 10000 + month * 100 + day ).toString();
	return date;
};
export const getnow = () => {
	const dateObject = new Date();
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();
	const year = dateObject.getFullYear();
	const hour = dateObject.getHours();
	const minute = dateObject.getMinutes();
	const second = dateObject.getSeconds();
	const date = ( year * 10000 + month * 100 + day ).toString();
	const time = ( '0' + ( hour * 10000 + minute * 100 + second ) ).substr( -6 );
	return date + 'T' + time;
};

export const getnowms = () => {
	const dateObject = new Date();
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();
	const year = dateObject.getFullYear();
	const hour = dateObject.getHours();
	const minute = dateObject.getMinutes();
	const second = dateObject.getSeconds();
	const date = ( year * 10000 + month * 100 + day ).toString();
	const time = ( '0' + ( hour * 10000 + minute * 100 + second ) ).substr( -6 );
	const ms = ( '0000' + dateObject.getUTCMilliseconds() ).substr( -4 );
	return date + 'T' + time + 'M' + ms;
};

export const getnowUTC = () => {
	const dateObject = new Date();
	const month = dateObject.getUTCMonth() + 1;
	const day = dateObject.getUTCDate();
	const year = dateObject.getUTCFullYear();
	const hour = dateObject.getUTCHours();
	const minute = dateObject.getUTCMinutes();
	const second = dateObject.getUTCSeconds();
	const date = ( year * 10000 + month * 100 + day ).toString();
	const time = ( '0' + ( hour * 10000 + minute * 100 + second ) ).substr( -6 );
	return date + 'T' + time;
};

export const getnowmsUTC = () => {
	const dateObject = new Date();
	const month = dateObject.getUTCMonth() + 1;
	const day = dateObject.getUTCDate();
	const year = dateObject.getUTCFullYear();
	const hour = dateObject.getUTCHours();
	const minute = dateObject.getUTCMinutes();
	const second = dateObject.getUTCSeconds();
	const date = ( year * 10000 + month * 100 + day ).toString();
	const time = ( '0' + ( hour * 10000 + minute * 100 + second ) ).substr( -6 );
	const ms = ( '0000' + dateObject.getUTCMilliseconds() ).substr( -4 );
	return date + 'T' + time + 'M' + ms;
};
