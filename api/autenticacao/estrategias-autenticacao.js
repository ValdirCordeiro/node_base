const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const usuarioController = require("../controllers/UsuarioController");

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new Error("Usuário não existe");
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);

    if (!senhaValida) {
        throw new Error("Email ou Senha inválidos");
    }
}

passport.use(
    new LocalStrategy({
        usernameField: "login",
        passwordField: "senha",
        session: false
    }, async (login, senha, done) => {
        try {
            console.log("Login" + login);
            console.log("senha" + senha);
            const usuario = await usuarioController.buscarUsuarioPorLogin(login);

            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senha);

            done(null, usuario);
        } catch (error) {
            done(error);
        }
    })
);

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await usuarioController.buscarUsuarioPorId(payload.id);

                done(null, usuario);
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport;