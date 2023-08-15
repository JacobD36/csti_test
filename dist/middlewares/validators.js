"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvvValidator = exports.creditCardValidator = exports.validToken = void 0;
const card_validators_1 = require("../helpers/card-validators");
/**
 * Valida el formato del token recibido en la cabecera de la petición
 * @param { Request } req
 * @param { Response } res
 * @param { any } next
 */
const validToken = (req, res, next) => {
    const token = req.header('token') || '';
    const validTokenPattern = /^pk_test_[a-zA-Z0-9]{16}$/;
    if (!token || !validTokenPattern.test(token)) {
        return res.status(401).json({ message: 'Token no válido' });
    }
    next();
};
exports.validToken = validToken;
/**
 * Valida el formato del número de la tarjeta y determina su tipo estableciendolo en la cabecera
 * @param { Request } req
 * @param { Response } res
 * @param { any } next
 */
const creditCardValidator = (req, res, next) => {
    const { card_number } = req.body;
    if (!(0, card_validators_1.isValidCardNumber)(card_number)) {
        return res.status(400).json({ message: 'Número de tarjeta no válido' });
    }
    const cardType = (0, card_validators_1.getCardType)(card_number);
    req.body.card_type = cardType;
    next();
};
exports.creditCardValidator = creditCardValidator;
/**
 * Valida si el número de CVV corresponde al tipo de tarjeta
 * @param { Request }req
 * @param { Response }res
 * @param { any } next
 */
const cvvValidator = (req, res, next) => {
    const { card_type, cvv } = req.body;
    if (card_type === 'VISA' || card_type === 'MASTERCARD') {
        if (cvv.length > 3) {
            return res.status(400).json({ message: 'CVV no válido' });
        }
    }
    else {
        if (cvv.length > 4) {
            return res.status(400).json({ message: 'CVV no válido' });
        }
    }
    next();
};
exports.cvvValidator = cvvValidator;
//# sourceMappingURL=validators.js.map