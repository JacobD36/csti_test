import { Router } from "express";
import { check } from 'express-validator';
import { getCard, postCard } from "../controllers/tokens";
import { creditCardValidator, cvvValidator, validToken } from "../middlewares/validators";
import { validFields } from "../middlewares/valid-fields";
import { cardExists, isExpire, validCardToken, validMonths } from "../helpers/card-validators";

const tokensRouter = Router();

tokensRouter.get('/:id', [
    validToken,
    check('id', 'El token debe tener una longitud de 16 caracteres').isLength({ min: 16, max: 16 }),
    check('id').custom(validCardToken),
    validFields,
    check('id').custom(cardExists),
    validFields
], getCard);
tokensRouter.post('/', [
    validToken,
    check('card_number', 'El número de tarjeta es requerido').not().isEmpty(),
    check('card_number', 'La tarjeta debe tener un mínimo de 13 dígitos y un máximo de 16').isLength({ min: 13, max: 16 }),
    check('card_number', 'El número de tarjeta sólo debe contener números').isNumeric(),
    creditCardValidator,
    check('cvv', 'El CVV es requerido').not().isEmpty(),
    check('cvv', 'El CVV debe tener un mínimo de 3 dígitos y un máximo de 4').isLength({ min: 3, max: 4 }),
    check('cvv', 'El CVV sólo debe contener números').isNumeric(),
    cvvValidator,
    check('expiration_month', 'El mes de expiración es requerido').not().isEmpty(),
    check('expiration_month', 'El mes de expiración debe tener un mínimo de 1 dígito y un máximo de 2').isLength({ min: 1, max: 2 }),
    check('expiration_month', 'El mes de expiración sólo debe contener números').isNumeric(),
    check('expiration_month', 'El mes debe estar entre el 1 y 12').isIn(validMonths),
    check('expiration_year', 'El año de expiración es requerido').not().isEmpty(),
    check('expiration_year', 'El año de expiración debe tener 4 dígitos').isLength({ min: 4, max: 4 }),
    check('expiration_year', 'El año de expiración sólo debe contener números').isNumeric(),
    check('expiration_year').custom(isExpire),
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'El correo debe contener un mínimo de 5 caracteres y un máximo de 100').isLength({ min: 5, max: 100 }),
    check('email', 'El correo no es válido').isEmail(),
    validFields
], postCard);

export default tokensRouter;