import { body, validationResult } from 'express-validator';

const signupValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail().withMessage('Invalid email format'),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
    // other fields should not be empty
    body('userName').notEmpty().withMessage('Username is required'),
    body('displayName').notEmpty().withMessage('Display name is required'),
    body('role').notEmpty().withMessage('Role is required'),
  ]
}

const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ]
}

const validate = (req:any, res:any, next:any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors: { [key: string]: string }[] = [];
    errors.array().map(err => extractedErrors.push( err.msg ));
    
    return res.status(422).json({
      errors: extractedErrors,
    });
    
}

export { loginValidationRules, signupValidationRules, validate };

