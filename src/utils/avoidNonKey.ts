export const avoidNonKey = ( defaultObject: any, key: string ) => {
	if ( !Object.keys( defaultObject ).includes( key.trim() ) ) throw new Error( 'Invalid key as search parameter' );
}
