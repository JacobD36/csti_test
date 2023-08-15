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
exports.getCard = exports.postCard = void 0;
const card_utils_1 = require("../helpers/card_utils");
const card_1 = __importDefault(require("../models/card"));
/**
 * Creación de token para la tarjeta
 * @param { Request } req
 * @param { Response } res
 */
const postCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, card_number, cvv, expiration_year, expiration_month } = req.body;
    const tokenID = (0, card_utils_1.generateRandomString)(16);
    const card = new card_1.default({
        token: tokenID,
        email: email,
        card_number: card_number,
        cvv: cvv,
        expiration_year: expiration_year,
        expiration_month: expiration_month,
    });
    yield card.save();
    res.json({
        tokenID
    });
});
exports.postCard = postCard;
/**
 * Recupera la información de una tarjeta a través de su token de acceso
 * @param { Request }req
 * @param { Response } res
 */
const getCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const card = yield card_1.default.findOne({ token: id });
    res.json(card);
});
exports.getCard = getCard;
//# sourceMappingURL=tokens.js.map