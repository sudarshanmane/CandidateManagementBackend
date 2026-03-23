"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_SECRET = exports.JWT_SCERET = exports.MONG_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.MONG_URI = process.env.MONGO_URI;
exports.JWT_SCERET = process.env.JWT_SCERET;
exports.REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
