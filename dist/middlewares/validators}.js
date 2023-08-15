"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validToken = void 0;
const validToken = (req, res, next) => {
    const token = req.header('token') || '';
    const validTokenPattern = /^pk_test_[a-zA-Z0-9]{16}$/;
    if (!token || !validTokenPattern.test(token)) {
        return res.status(401).json({ message: 'Token no válido' });
    }
    next();
};
exports.validToken = validToken;
//# sourceMappingURL=validators%7D.js.map