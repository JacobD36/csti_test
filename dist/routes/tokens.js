"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tokens_1 = require("../controllers/tokens");
const validators_1 = require("../middlewares/validators");
const valid_fields_1 = require("../middlewares/valid-fields");
const card_validators_1 = require("../helpers/card-validators");
const tokensRouter = (0, express_1.Router)();
tokensRouter.get('/:id', [
    validators_1.validToken,
    (0, express_validator_1.check)('id', 'El token debe tener una longitud de 16 caracteres').isLength({ min: 16, max: 16 }),
    (0, express_validator_1.check)('id').custom(card_validators_1.validCardToken),
    valid_fields_1.validFields,
    (0, express_validator_1.check)('id').custom(card_validators_1.cardExists),
    valid_fields_1.validFields
], tokens_1.getCard);
tokensRouter.post('/', [
    validators_1.validToken,
    (0, express_validator_1.check)('card_number', 'El número de tarjeta es requerido').not().isEmpty(),
    (0, express_validator_1.check)('card_number', 'La tarjeta debe tener un mínimo de 13 dígitos y un máximo de 16').isLength({ min: 13, max: 16 }),
    (0, express_validator_1.check)('card_number', 'El número de tarjeta sólo debe contener números').isNumeric(),
    validators_1.creditCardValidator,
    (0, express_validator_1.check)('cvv', 'El CVV es requerido').not().isEmpty(),
    (0, express_validator_1.check)('cvv', 'El CVV debe tener un mínimo de 3 dígitos y un máximo de 4').isLength({ min: 3, max: 4 }),
    (0, express_validator_1.check)('cvv', 'El CVV sólo debe contener números').isNumeric(),
    validators_1.cvvValidator,
    (0, express_validator_1.check)('expiration_month', 'El mes de expiración es requerido').not().isEmpty(),
    (0, express_validator_1.check)('expiration_month', 'El mes de expiración debe tener un mínimo de 1 dígito y un máximo de 2').isLength({ min: 1, max: 2 }),
    (0, express_validator_1.check)('expiration_month', 'El mes de expiración sólo debe contener números').isNumeric(),
    (0, express_validator_1.check)('expiration_month', 'El mes debe estar entre el 1 y 12').isIn(card_validators_1.validMonths),
    (0, express_validator_1.check)('expiration_year', 'El año de expiración es requerido').not().isEmpty(),
    (0, express_validator_1.check)('expiration_year', 'El año de expiración debe tener 4 dígitos').isLength({ min: 4, max: 4 }),
    (0, express_validator_1.check)('expiration_year', 'El año de expiración sólo debe contener números').isNumeric(),
    (0, express_validator_1.check)('expiration_year').custom(card_validators_1.isExpire),
    (0, express_validator_1.check)('email', 'El correo es requerido').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo debe contener un mínimo de 5 caracteres y un máximo de 100').isLength({ min: 5, max: 100 }),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    valid_fields_1.validFields
], tokens_1.postCard);
exports.default = tokensRouter;
//# sourceMappingURL=tokens.js.map