import { RequestHandler, Request, Response } from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../../../models/ApiResponse";
import { pageHeader, row } from "../../../../settings/pdf-format";
import { cors } from "../../lib.cors";
import * as pg from '../../lib.pool';

const PdfMakeType = require("pdfmake");

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
const pdfMake = new PdfMakeType(fonts);

export const getReport: RequestHandler[] = [
    body('from').optional().bail().isString(),
    body('to').optional().bail().isString(),
    async (req: Request, res: Response) => {
        const filterFrom = req.body.from;
        const filterTo = req.body.to;
        try {
            cors(req, res, async () => {
                const documentDefinition = await generatePDF(filterFrom, filterTo);
                const pdfDoc = pdfMake.createPdfKitDocument(documentDefinition, {});
                pdfDoc.end();
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=statement.pdf');
                pdfDoc.pipe(res);
                return;
            })
            return;
        } catch (error: any) {
            console.error(error);
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(
                    {
                        code: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
                        data: {},
                        message: '', error: error.message || 'Failed to fetch !',
                    } as ApiResponse<{}>);
        }
    },
];

const generatePDF = async (filterFrom, filterTo) => {
    const sales = await getSales(filterFrom, filterTo)

    const documentDefinition = {
        footer: (currentPage, pageCount) => {
            return (currentPage !== 1) ? [
                { canvas: [{ type: 'line', x1: 40, y1: 0, x2: 555, y2: 0, lineWidth: 2, lineColor: '#026fc0' }] },
                {
                    columns: [
                        { text: ' ', fontSize: 8 },
                        { text: currentPage.toString() + ' of ' + pageCount, fontSize: 8, alignment: 'right' }
                    ],
                    margin: [40, 5]
                },
            ] : [];
        },
        content: await PDFContent(sales, filterFrom, filterTo),
        pageMargins: [25, 50, 25, 0],
    };

    return documentDefinition;
}

const PDFContent = async (sales, filterFrom, filterTo) => {
    const content: any[] = [];
    content.push.apply(content, await sheet(sales, filterFrom, filterTo));
    return content;
}

const sheet = async (sales, filterFrom, filterTo) => {

    const formattedEndDate = filterTo.substring(6, 10) + "/" + filterTo.substring(4, 6) + "/" + filterTo.substring(0, 4)
    const pdfSheet: any[] = [];
    let total = 0;

    pdfSheet.push(
        pageHeader('Sales Report', `as at ${formattedEndDate}`, filterFrom, filterTo)
    );


    pdfSheet.push({ text: ' ', margin: [0, 1, 1, 1] });


    pdfSheet.push(row());


    if (sales) {
        sales.forEach(item => {
            pdfSheet.push(row(item.name, item.price));
            total += item.price;
        })
    } else {
        pdfSheet.push(row("There is no sales"));
    }
    pdfSheet.push(row("Total", total.toString()));

    return pdfSheet;
}
const getSales = async (filterFrom, filterTo) => {
    const query = `Select name,Sum(price) as price from public."sales" where date>=$1 AND date<=$2 group by name`;
    const values = [filterFrom, filterTo];
    return (await pg.db.query(query, values)).rows;
}