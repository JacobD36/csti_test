"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CardSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: [true, 'Token es requerido']
    },
    email: {
        type: String,
        required: [true, 'Email es requerido']
    },
    card_number: {
        type: Number,
        required: [true, 'Número de tarjeta es requerido']
    },
    cvv: {
        type: Number,
        required: [true, 'CVV es requerido']
    },
    expiration_month: {
        type: String,
        required: [true, 'Mes de expiración es requerido']
    },
    expiration_year: {
        type: String,
        required: [true, 'Año de expiración es requerido']
    },
    createdAt: {
        type: Date,
        expires: '15m',
        default: Date.now
    }
});
CardSchema.methods.toJSON = function () {
    const _a = this.toObject(), { cvv, __v, createdAt, _id, token } = _a, card = __rest(_a, ["cvv", "__v", "createdAt", "_id", "token"]);
    return card;
};
exports.default = (0, mongoose_1.model)('Card', CardSchema);
//# sourceMappingURL=card.js.map