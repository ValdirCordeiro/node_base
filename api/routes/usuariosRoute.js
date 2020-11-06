const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const middlewareAutenticacao = require("../autenticacao/middleware-autenticacao")

const router = Router();

router.post("/login", middlewareAutenticacao.local, UsuarioController.login);

router.get("/usuarios", middlewareAutenticacao.bearer, UsuarioController.buscarTodosUsuarios);

router.get("/usuarios/:nome", middlewareAutenticacao.bearer, UsuarioController.buscarUsuariosPorNome);

router.get("/usuarios/:id", middlewareAutenticacao.bearer, UsuarioController.buscarUsuarioPorIdRequisicao);

router.post("/usuarios", middlewareAutenticacao.bearer, UsuarioController.criarUsuario);

router.put("/usuarios/:id", middlewareAutenticacao.bearer, UsuarioController.atualizarUsuario);

router.delete("/usuarios/:id", middlewareAutenticacao.bearer, UsuarioController.deletarUsuario);

module.exports = router;