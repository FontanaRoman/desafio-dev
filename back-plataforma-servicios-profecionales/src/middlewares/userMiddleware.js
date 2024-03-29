const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token de acceso inválido' });
    }
    // Adjuntar el payload decodificado del token a la solicitud para uso posterior
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
