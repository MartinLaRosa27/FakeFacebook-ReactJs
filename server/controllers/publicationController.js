const Publication = require("../models/Publication");
const { QueryTypes } = require("sequelize");

// --------------------------------------------------------------------------------------------------------
module.exports.postPublication = async (req, res) => {
  // Se obtienen los datos:
  const { userId, text } = req.body;
  // Se validan los datos:
  if (!userId || !text) {
    return res.status(400).json({ mensaje: "Error en los datos ingresados." });
  }
  if (text.length < 5 || text.length > 144) {
    return res
      .status(400)
      .json({ mensaje: "El texto debe tener entre 5 y 144 caracteres." });
  }
  // Se crea la publicación:
  try {
    await Publication.create({
      userId,
      text,
    });
    return res
      .status(200)
      .json({ mensaje: "Publicación registrada con exito." });
  } catch (e) {
    return res
      .status(400)
      .json({ mensaje: "No se pudo registrar la publicación." });
  }
};

// --------------------------------------------------------------------------------------------------------
module.exports.deletePublication = async (req, res) => {
  // Datos por url:
  const { id } = req.params;
  // Se verifica que exista la publicacion:
  const follow = await Publication.count({
    where: {
      _id: id,
    },
  });
  if (follow == 0) {
    return res.status(404).json({ mensaje: "La publicación no existe." });
  }
  // Elimina seguidor:
  try {
    await Publication.destroy({ where: { _id: id } });
    res.status(200).json({ mensaje: "Publicación eliminada." });
  } catch (e) {
    res.status(404).json({ mensaje: "No se pudo eliminar la publicación." });
  }
};

// --------------------------------------------------------------------------------------------------------
module.exports.getPublication = async (req, res) => {
  // Controlar en que pagina estamos:
  /*
  1 -> 0 a 2
  2 -> 3 a 5
  */
  let itemsPerPage = 3;
  let page;
  req.params.page ? (page = req.params.page) : (page = 1);
  page = parseInt(page);
  const firstValue = page * itemsPerPage - itemsPerPage;
  // Consulta:
  const publicaciones = await Publication.sequelize.query(
    `SELECT p._id, p.text, p.createdAt, u.username
    FROM publications AS p
    INNER JOIN users AS u ON u._id = p.userId
    ORDER BY createdAt DESC
    LIMIT ${firstValue},${itemsPerPage}
    ;`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if(publicaciones.length==0){
    return res.status(404).json({ mesnaje:"No se encontraron publicaciones en esta página.", publicaciones, page, itemsPerPage });
  }
  return res.status(200).json({ mesnaje:"OK", publicaciones, page, itemsPerPage });
};
