"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCardToken = exports.cardExists = exports.getCardType = exports.isValidCardNumber = exports.isExpire = exports.validMonths = void 0;
const card_1 = __importDefault(require("../models/card"));
// Meses válidos para ser recepcionados en la petición
exports.validMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
/**
 * Valida que el año de expiración cumpla con las reglas del negocio
 * @param { Number } year
 * @returns { Boolean }
 */
const isExpire = (year) => {
    const currentYear = new Date().getFullYear();
    if (year >= currentYear + 5) {
        throw new Error('El año de expiración no puede ser mayor que el año en curso por más de 5 años');
    }
    if (year < currentYear) {
        throw new Error('El año de expiración no puede ser menor que el año en curso');
    }
    return true;
};
exports.isExpire = isExpire;
/**
 * Valida el formato del número de tarjeta utilizando el algoritmo de Luhn
 * @param { String } cardNumber
 * @returns { Boolean }
 */
const isValidCardNumber = (cardNumber) => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(cleanedCardNumber)) {
        return false;
    }
    const digits = cleanedCardNumber.split('').map(Number);
    const length = digits.length;
    let sum = 0;
    let shouldDouble = false;
    for (let i = length - 1; i >= 0; i--) {
        let digit = digits[i];
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
};
exports.isValidCardNumber = isValidCardNumber;
/**
 * Retorna el tipo de tarjeta
 * @param { String }cardNumber
 * @returns { String }
 */
const getCardType = (cardNumber) => {
    if (cardNumber.startsWith('4')) {
        return 'VISA';
    }
    else if (cardNumber.startsWith('5')) {
        return 'MASTERCARD';
    }
    else {
        return 'OTRA';
    }
};
exports.getCardType = getCardType;
/**
 * Verifica que la tarjeta aún no haya sido eliminada de la base de datos por tiempo de expiración
 * @param { String } token
 */
const cardExists = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (token) {
        const recordExists = yield card_1.default.findOne({ token });
        if (!recordExists) {
            throw new Error('La tarjeta no existe o su tiempo expiró, por favor intente nuevamente');
        }
    }
});
exports.cardExists = cardExists;
/**
 * Valida el formato del token proporcionado en el cuerpo de la petición
 * @param { String }token
 */
const validCardToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const validCharacters = /^[A-Za-z0-9]+$/;
    if (!validCharacters.test(token)) {
        throw new Error('El token de la tarjeta no es válido');
    }
});
exports.validCardToken = validCardToken;
//# sourceMappingURL=card-validators.js.map