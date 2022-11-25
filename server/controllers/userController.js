const bcrypt = require("bcrypt");
const User = require("../models/User");
const { QueryTypes } = require("sequelize");
const { createToken } = require("../services/jwt");

// --------------------------------------------------------------------------------------------------------
module.exports.postUser = async (req, res) => {
  // Datos obtenidos:
  let { username, email, password, passwordAux } = req.body;
  // Se validan los datos:
  email = email.toLowerCase();
  if (password != passwordAux) {
    return res
      .status(400)
      .json({ mensaje: "Las contraseñas ingresadas no coinciden." });
  }
  // Se verifica que el mail no se encuntre registrado:
  const emailRegistrado = await User.count({
    where: {
      email,
    },
  });
  if (emailRegistrado > 0) {
    return res
      .status(400)
      .json({ mensaje: "Email ya registrado. Por favor, ingrese otro." });
  }
  // Se verifica que el nombre de usuario no se encuntre registrado:
  const usernameRegistrado = await User.count({
    where: {
      username,
    },
  });
  if (usernameRegistrado > 0) {
    return res.status(400).json({
      mensaje: "Nombre de usuario ya registrado. Por favor, ingrese otro.",
    });
  }
  // Se crea el usuario:
  try {
    const user = await User.create({
      username,
      email,
      password,
      image: null,
    });
    return res
      .status(200)
      .json({ mensaje: "Usuario registrado con exito.", id: user._id });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ mensaje: "No se pudo registrar el usuario." });
  }
};

// --------------------------------------------------------------------------------------------------------
exports.loginUser = async (req, res) => {
  // Obtiene parametros body:
  let { email, password } = req.body;
  email = email.toLowerCase();
  // Si existe el email:
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ mensaje: "Datos incorrectos." });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    // Si la contraseña es incorrecta:
    return res.status(404).json({ mensaje: "Datos incorrectos." });
  }
  // Si la contraseña es correcta:
  // Se consigue el Token:
  const token = createToken(user);
  return res.status(200).json({ token });
};

// --------------------------------------------------------------------------------------------------------
exports.getUserConParametros = async (req, res) => {
  const { id, email } = req.params;
  const user = await User.sequelize.query(
    `SELECT _id, username, image FROM users WHERE _id="${id}" AND email="${email}";`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (user.length === 0) {
    return res.status(404).json({ mensaje: "El usuario no existe." });
  }
  return res.status(200).json({ user });
};
