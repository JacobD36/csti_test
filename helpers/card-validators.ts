import Card from "../models/card";

// Meses válidos para ser recepcionados en la petición
export const validMonths = [1,2,3,4,5,6,7,8,9,10,11,12];

/**
 * Valida que el año de expiración cumpla con las reglas del negocio
 * @param { Number } year 
 * @returns { Boolean }
 */
export const isExpire = (year: number): boolean => {
    const currentYear = new Date().getFullYear();
    if(year >= currentYear + 5){
        throw new Error('El año de expiración no puede ser mayor que el año en curso por más de 5 años');
    }

    if(year < currentYear) {
        throw new Error('El año de expiración no puede ser menor que el año en curso');
    }

    return true;
}

/**
 * Valida el formato del número de tarjeta utilizando el algoritmo de Luhn
 * @param { String } cardNumber 
 * @returns { Boolean }
 */
export const isValidCardNumber = (cardNumber: string):boolean => {
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
}

/**
 * Retorna el tipo de tarjeta
 * @param { String }cardNumber 
 * @returns { String }
 */
export const getCardType = (cardNumber: string): string => {
    if (cardNumber.startsWith('4')) {
        return 'VISA';
    } else if (cardNumber.startsWith('5')) {
        return 'MASTERCARD';
    } else {
        return 'OTRA';
    }
}

/**
 * Verifica que la tarjeta aún no haya sido eliminada de la base de datos por tiempo de expiración
 * @param { String } token 
 */
export const cardExists = async(token: string) => {
    if(token){
        const recordExists = await Card.findOne({ token });
        if(!recordExists) {
            throw new Error('La tarjeta no existe o su tiempo expiró, por favor intente nuevamente');
        }
    }
}

/**
 * Valida el formato del token proporcionado en el cuerpo de la petición
 * @param { String }token 
 */
export const validCardToken = async(token: string) => {
    const validCharacters = /^[A-Za-z0-9]+$/;

    if (!validCharacters.test(token)) {
        throw new Error('El token de la tarjeta no es válido');
    }
}