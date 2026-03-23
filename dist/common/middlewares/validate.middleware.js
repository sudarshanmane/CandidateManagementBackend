"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.issues.map((err) => err.message);
        return res.status(400).json({
            sucess: false,
            message: errors[0],
        });
    }
    req.body = result.data;
    next();
};
exports.validate = validate;
