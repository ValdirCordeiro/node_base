const {Router} = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();

router.get("/usuarios", UsuarioController.buscarTodosUsuarios);
router.get("/usuarios/:id", UsuarioController.buscarUsuarioPorId);
router.post("/usuarios", UsuarioController.criarUsuario);
router.put("/usuarios/:id", UsuarioController.atualizarUsuario);
router.delete("/usuarios/:id", UsuarioController.deletarUsuario);

module.exports = router;