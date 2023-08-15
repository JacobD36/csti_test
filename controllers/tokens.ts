import { Request, Response } from 'express';
import { generateRandomString } from '../helpers/card_utils';
import Card from '../models/card';
 
/**
 * Creación de token para la tarjeta
 * @param { Request } req 
 * @param { Response } res 
 */
export const postCard = async(req: Request, res: Response) => {
    const { email, card_number, cvv, expiration_year, expiration_month } = req.body;

    const tokenID = generateRandomString(16);

    const card = new Card({
        token: tokenID,
        email: email,
        card_number: card_number,
        cvv: cvv,
        expiration_year: expiration_year,
        expiration_month: expiration_month,
    });

    await card.save();

    res.json({
        tokenID
    });
}

/**
 * Recupera la información de una tarjeta a través de su token de acceso
 * @param { Request }req 
 * @param { Response } res 
 */
export const getCard = async(req: Request, res: Response) => {
    const { id } = req.params;
    const card = await Card.findOne({ token: id });
    res.json(card);
}