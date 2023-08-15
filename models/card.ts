import { Schema, model } from 'mongoose';

const CardSchema = new Schema({
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

CardSchema.methods.toJSON = function() {
    const { cvv, __v, createdAt, _id, token, ...card } = this.toObject();
    return card;
}

export default model('Card', CardSchema);