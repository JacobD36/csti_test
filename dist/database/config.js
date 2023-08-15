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
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_HOST = process.env.MONGO_HOST || '';
const MONGO_USER = process.env.MONGO_INITDB_ROOT_USERNAME || '';
const MONGO_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD || '';
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/cards?authSource=admin`;
        yield mongoose_1.default.connect(url);
        console.log('Base de datos online');
    }
    catch (error) {
        throw new Error(`Error al iniciar la base de datos: ${error}`);
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map