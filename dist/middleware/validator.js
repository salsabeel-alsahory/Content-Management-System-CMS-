"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.signupValidationRules = exports.loginValidationRules = void 0;
const express_validator_1 = require("express-validator");
const signupValidationRules = () => {
    return [
        // username must be an email
        (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'),
        // password must be at least 5 chars long
        (0, express_validator_1.body)('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
        // other fields should not be empty
        (0, express_validator_1.body)('userName').notEmpty().withMessage('Username is required'),
        (0, express_validator_1.body)('displayName').notEmpty().withMessage('Display name is required'),
        (0, express_validator_1.body)('role').notEmpty().withMessage('Role is required'),
    ];
};
exports.signupValidationRules = signupValidationRules;
const loginValidationRules = () => {
    return [
        (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'),
        (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    ];
};
exports.loginValidationRules = loginValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push(err.msg));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.validate = validate;
