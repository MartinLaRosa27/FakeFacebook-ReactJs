// Dependencias:
const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta para codificar token:
const secret = "secreto123";

// Función para generar tokens:
module.exports.createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    image: user.image,
    email: user.email,
    iat: moment().unix(),
    exp: 3700, //3700s
  };
  // Devolver JWT codificado:
  return jwt.encode(payload, secret);
};
