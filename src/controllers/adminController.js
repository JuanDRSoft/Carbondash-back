const Admin = require('../models/Admin');
const generarJWT = require('../helpers/generarJWT.js');

const obtenerAdmins = async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
};

const nuevoAdmin = async (req, res) => {
  const admin = new Admin(req.body);

  try {
    const adminAlmacenado = await admin.save();
    res.json(adminAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerAdmin = async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);

  if (!admin) {
    const error = new Error('No Encontrado');
    return res.status(404).json({ msg: error.message });
  }
  res.json(admin);
};

const editarAdmin = async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);

  if (!admin) {
    const error = new Error('No Encontrado');
    return res.status(404).json({ msg: error.message });
  }

  admin.name = req.body.name || admin.name;
  admin.password = req.body.password || admin.password;
  admin.email = req.body.email || admin.email;

  try {
    const adminAlmacenado = await admin.save();
    res.json(adminAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarAdmin = async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);

  if (!admin) {
    const error = new Error('No Encontrado');
    return res.status(404).json({ msg: error.message });
  }

  try {
    await admin.deleteOne();
    res.json({ msg: 'Admin Eliminado' });
  } catch (error) {
    console.log(error);
  }
};

const autenticarAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Admin.findOne({ email });
  if (!usuario) {
    const error = new Error('El Usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario) {
    const error = new Error('Tu Cuenta no ha sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar su password
  if (usuario.password == password) {
    res.json({
      _id: usuario._id,
      nombre: usuario.name,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error('El Password es Incorrecto');
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

module.exports = {
  obtenerAdmins,
  nuevoAdmin,
  obtenerAdmin,
  editarAdmin,
  eliminarAdmin,
  autenticarAdmin,
  perfil,
};
