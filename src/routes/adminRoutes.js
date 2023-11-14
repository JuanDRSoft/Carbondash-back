var express = require("express");
var router = express.Router();

const adminController = require("../controllers/adminController");
var checkAuth = require("../middleware/checkAuth.js");

router
  .route("/")
  .get(adminController.obtenerAdmins)
  .post(adminController.nuevoAdmin);

router
  .route("/:id")
  .get(adminController.obtenerAdmin)
  .put(adminController.editarAdmin)
  .delete(adminController.eliminarAdmin);

router.route("/login").post(adminController.autenticarAdmin);

router.post("/perfil", checkAuth, adminController.perfil);

module.exports = router;
