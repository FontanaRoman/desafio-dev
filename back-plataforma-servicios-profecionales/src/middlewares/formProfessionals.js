const { body } = require('express-validator');

const professionalValidationRules = [
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
    body('imageProfessionals').custom((value, { req }) => {
        // Verificar si el campo image está presente en la solicitud
        if (req.files && req.files.image) {
            const image = req.files.image;

            // Verificar que sea una imagen (puedes ajustar esto según tus necesidades)
            if (!image.mimetype.startsWith('image/')) {
                throw new Error('El archivo debe ser una imagen');
            };

            // Verificar el tamaño del archivo (ejemplo: máximo 5MB)
            const maxSize = 3 * 1024 * 1024; // 3MB en bytes
            if (image.size > maxSize) {
                throw new Error('La imagen no debe superar los 3MB');
            };
        }

        // Si no se proporciona una imagen, no hay errores de validación
        return true;
    }),

    // Validar que se haya enviado una imagen para el campo 'imageDocuments'
    body('imageDocuments').custom((value, { req }) => {
        // Verificar si el campo image está presente en la solicitud
        if (req.files && req.files.image) {
            const image = req.files.image;

            // Verificar que sea una imagen (puedes ajustar esto según tus necesidades)
            if (!image.mimetype.startsWith('image/')) {
                throw new Error('El archivo debe ser una imagen');
            };

            // Verificar el tamaño del archivo (ejemplo: máximo 5MB)
            const maxSize = 3 * 1024 * 1024; // 3MB en bytes
            if (image.size > maxSize) {
                throw new Error('La imagen no debe superar los 3MB');
            };
        }

        // Si no se proporciona una imagen, no hay errores de validación
        return true;
    }),

    // Validar que se haya enviado una imagen para el campo 'imageCertificate'
    body('imageCertificate').custom((value, { req }) => {
        // Verificar si el campo image está presente en la solicitud
        if (req.files && req.files.image) {
            const image = req.files.image;

            // Verificar que sea una imagen (puedes ajustar esto según tus necesidades)
            if (!image.mimetype.startsWith('image/')) {
                throw new Error('El archivo debe ser una imagen');
            };

            // Verificar el tamaño del archivo (ejemplo: máximo 5MB)
            const maxSize = 3 * 1024 * 1024; // 3MB en bytes
            if (image.size > maxSize) {
                throw new Error('La imagen no debe superar los 3MB');
            };
        }

        // Si no se proporciona una imagen, no hay errores de validación
        return true;
    })
  ];

module.exports = professionalValidationRules