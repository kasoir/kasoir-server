export const formatDateForEndUser = ( date: string ) => {
	return date ? date.substring( 6, 8 ) + '/' + date.substring( 4, 6 ) + '/' + date.substring( 0, 4 ) : '';
}

export const pageHeader = ( topLeftText: string = ' ', filterFrom: string = '', filterTo: string = '', hidefields: boolean = false ) => {
	const border = [ false, false, false, true ];
	const margin = [ 1, 0, 10, 2 ];
	const fontSize: number = 12;
	const dateText: string = hidefields ? ' ' : `${ formatDateForEndUser( filterFrom ) } to ${ formatDateForEndUser( filterTo ) }`;

	return {
		table: {
			headerRows: 0,
			widths: [ 260, 260 ],
			body: [
				[ { text: topLeftText, fontSize, bold: true, border, alignment: 'left', margin }, { text: dateText, fontSize, bold: true, border, alignment: 'right', margin } ],
			]
		}
	}
}

export const row = (text1: string = '', text2: string = '',
    border = [false, false, false, false], bold: boolean = false, alignment1: string = 'left', alignment2: string = 'right') => {
    const fontSize: number = 8;
    return {
        table: {
            headerRows: 1,
            widths: [ '*','*' ],
            body: [
                [
                    { text: text1, fontSize, border, bold, alignment: alignment1 },
                    { text: text2, fontSize, border, bold, alignment: alignment2 },
                ]
            ]
        }
    }
}