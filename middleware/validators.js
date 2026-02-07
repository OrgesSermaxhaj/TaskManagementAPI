const {body, validationResult} = require('express-validator');

const validateRegistration = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


const validateRegister =[
    body('fullName').notEmpty().isString().withMessage('fullName is required and must be string'),
    body('email').notEmpty().isEmail().withMessage("Email is required and must email format"),
    body('password').notEmpty().isLength({min: 6}).withMessage('Password is required and must have at least 6 chars'),
    body('age').optional().isInt({min:0}).withMessage('Age must be a positive number'),
    validateRegistration
];

const validateLogin = [
    body('email').notEmpty().isEmail().withMessage("Email is required and must email format"),
    body('password').notEmpty().withMessage('Password is required'),
    validateRegistration
]
const validateTask = [
    body('title').notEmpty().withMessage("Title is required").isLength({min: 3}).withMessage("Title must have atleast 3 characters."),
    body('description').notEmpty().withMessage('Description is required, and must be clear and detailed.').isLength({ min: 10 }).withMessage("Description must be at least 10 characters."),
    body('status').optional().isIn(['todo', 'in_progress', 'done']).withMessage('Status must be one of: todo, in_progress, done.'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be one of: low, medium, high.'),

    validateRegistration
]

module.exports = {
    validateRegister,
    validateLogin,
    validateTask
};