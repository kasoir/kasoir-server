import { uuidtimestring } from './uuidtodate';

export const sortBy = ( predicament: string, isDescending = false, caseSensitive = true ) => {
	const multiplier = isDescending ? -1 : 1;
	return ( e1: any, e2: any ) => {
		let a = e1[ predicament ];
		let b = e2[ predicament ];
		if ( !caseSensitive ) {
			if ( typeof ( a ) !== 'string' ) a = '';
			if ( typeof ( b ) !== 'string' ) b = '';
			a = a.toLowerCase();
			b = b.toLowerCase();
		}
		if ( a > b ) {
			return 1 * multiplier;
		} else if ( a < b ) {
			return -1 * multiplier;
		} else {
			return 0;
		}
	};
};

export const sortBy2 = ( predicament1: string, predicament2: string, isDescending = false ) => {
	const multiplier = isDescending ? -1 : 1;
	return ( e1: any, e2: any ) => {
		const padder = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
		const comp1 = ( e1[ predicament1 ] + padder ).substr( 0, 100 ) + '-' + ( e1[ predicament2 ] + padder ).substr( 0, 100 );
		const comp2 = ( e2[ predicament1 ] + padder ).substr( 0, 100 ) + '-' + ( e2[ predicament2 ] + padder ).substr( 0, 100 );

		if ( comp1 > comp2 ) {
			return 1 * multiplier;
		} else if ( comp1 < comp2 ) {
			return -1 * multiplier;
		} else {
			return 0;
		}
	};
};

export const sortByN = ( predicaments: string[], isDescending = false ) => {
	const multiplier = isDescending ? -1 : 1;
	return ( e1: any, e2: any ) => {
		const padder = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
		const comp1 = predicaments.map( p => ( ( e1[ p ] || '' ) + padder ).substr( 0, 100 ) ).join( '-' );
		const comp2 = predicaments.map( p => ( ( e2[ p ] || '' ) + padder ).substr( 0, 100 ) ).join( '-' );

		if ( comp1 > comp2 ) {
			return 1 * multiplier;
		} else if ( comp1 < comp2 ) {
			return -1 * multiplier;
		} else {
			return 0;
		}
	};
};



export const sortByWithID = ( predicament: string, isDescending = false ) => {
	const multiplier = isDescending ? -1 : 1;
	return ( e1: any, e2: any ) => {
		const padder = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
		const comp1 = ( ( e1[ predicament ] || '' ) + padder ).substr( 0, 100 ) + '-' + uuidtimestring( e1.id );
		const comp2 = ( ( e2[ predicament ] || '' ) + padder ).substr( 0, 100 ) + '-' + uuidtimestring( e2.id );
		if ( comp1 > comp2 ) {
			return 1 * multiplier;
		} else if ( comp1 < comp2 ) {
			return -1 * multiplier;
		} else {
			return 0;
		}
	};
};

export const sortByID = ( isDescending = false ) => {
	const multiplier = isDescending ? -1 : 1;
	return ( e1: any, e2: any ) => {
		const comp1 = uuidtimestring( e1.id );
		const comp2 = uuidtimestring( e2.id );
		if ( comp1 > comp2 ) {
			return 1 * multiplier;
		} else if ( comp1 < comp2 ) {
			return -1 * multiplier;
		} else {
			return 0;
		}
	};
};
