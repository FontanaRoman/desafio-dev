const { body } = require('express-validator');

const professionalValidationRules = () => {
  return [
    // Validar y sanitizar el campo 'name'
    body('name')
      .trim()
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ max: 255 }).withMessage('El nombre no puede tener más de 255 caracteres'),

    // Validar y sanitizar el campo 'email'
    body('email')
      .trim()
      .notEmpty().withMessage('El correo electrónico es requerido')
      .isEmail().withMessage('El correo electrónico no es válido'),

    // Validar y sanitizar el campo 'password'
    body('password')
      .trim()
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 6, max: 12 }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    // Validar que se haya enviado una imagen para el campo 'imageProfessionals'
    body('imageProfessionals')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('La foto del profesional es requerida');
        }
        return true;
      }),

    // Validar que se haya enviado una imagen para el campo 'imageDocuments'
    body('imageDocuments')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('El documento de identificación es requerido');
        }
        return true;
      }),

    // Validar que se haya enviado una imagen para el campo 'imageCertificate'
    body('imageCertificate')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Los certificados son requeridos');
        }
        return true;
      })
  ];
};

const confirmRegistrationUser = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ max: 255 }).withMessage('El nombre no puede tener más de 255 caracteres'),

    // Validar y sanitizar el campo 'email'
    body('email')
      .trim()
      .notEmpty().withMessage('El correo electrónico es requerido')
      .isEmail().withMessage('El correo electrónico no es válido'),

    // Validar y sanitizar el campo 'password'
    body('password')
      .trim()
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 6, max: 12 }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
  ];
};

const loginValidationRules = () => {
  return [
    // Validar y sanitizar el campo 'email'
    body('email')
      .trim()
      .notEmpty().withMessage('El correo electrónico es requerido')
      .isEmail().withMessage('El correo electrónico no es válido'),

    // Validar y sanitizar el campo 'password'
    body('password')
      .trim()
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ];
};

module.exports = {
  professionalValidationRules,
  confirmRegistrationUser,
  loginValidationRules,
};
