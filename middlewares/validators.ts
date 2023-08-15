import { Request, Response} from 'express';
import { getCardType, isValidCardNumber } from '../helpers/card-validators';

/**
 * Valida el formato del token recibido en la cabecera de la petición
 * @param { Request } req 
 * @param { Response } res 
 * @param { any } next 
 */
export const validToken = (req: Request, res: Response, next: any) => {
    const token = req.header('token') || '';
    const validTokenPattern = /^pk_test_[a-zA-Z0-9]{16}$/;

    if (!token || !validTokenPattern.test(token)) {
        return res.status(401).json({ message: 'Token no válido' });
    }

    next();
}

/**
 * Valida el formato del número de la tarjeta y determina su tipo estableciendolo en la cabecera
 * @param { Request } req 
 * @param { Response } res 
 * @param { any } next 
 */
export const creditCardValidator = (req: Request, res: Response, next: any) => {
    const { card_number } = req.body;
    
    if(!isValidCardNumber(card_number)){
        return res.status(400).json({ message: 'Número de tarjeta no válido' });
    }

    const cardType = getCardType(card_number);
    req.body.card_type = cardType;

    next();
}

/**
 * Valida si el número de CVV corresponde al tipo de tarjeta
 * @param { Request }req 
 * @param { Response }res 
 * @param { any } next 
 */
export const cvvValidator = (req: Request, res: Response, next: any) => {
    const { card_type, cvv } = req.body;
    
    if(card_type === 'VISA' || card_type === 'MASTERCARD'){
        if(cvv.length > 3) {
            return res.status(400).json({ message: 'CVV no válido' });
        }
    } else {
        if(cvv.length > 4) {
            return res.status(400).json({ message: 'CVV no válido' });
        }
    }

    next();
}