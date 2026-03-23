"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const finalSchema = typeof schema === "function" ? schema(req) : schema;
    const result = finalSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: result.error.issues[0].message,
        });
    }
    req.body = result.data;
    next();
};
exports.validate = validate;
