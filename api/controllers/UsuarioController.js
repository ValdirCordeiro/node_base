const dataBase = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");

class UsuarioController {
    static async buscarTodosUsuarios(req, res) {
        try {
            const todosOsUsuarios = await dataBase.Usuarios.findAll();
            return res.status(200).json(todosOsUsuarios);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscarUsuarioPorIdRequisicao(req, res) {
        const { id } = req.params;
        try {
            const usuario = await dataBase.Usuarios.findOne({ where: { id: Number(id) } });
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscarUsuarioPorId(id) {
        return await dataBase.Usuarios.findOne({ where: { id: Number(id) } });
    }

    static async criarUsuario(req, res) {
        try {
            let { nome, login, senha, email, ativo, permissao } = req.body;

            senha = await criarSenhaHash(senha);

            const novoUsuario = { nome, login, senha, email, ativo, permissao }

            const novoUsuarioCriado = await dataBase.Usuarios.create(novoUsuario);

            return res.status(200).json(novoUsuarioCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const usuarioInfo = req.body;

            await dataBase.Usuarios.update(usuarioInfo, { where: { id: Number(id) } });
            const usuarioAtualizado = await dataBase.Usuarios.findOne({ where: { id: Number(id) } });

            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarUsuario(req, res) {
        try {
            const { id } = req.params;

            await dataBase.Usuarios.destroy({ where: { id: Number(id) } });

            return res.status(200).json({ mensagem: `o usuario de id ${id} foi deletado` })

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscarUsuariosPorNome(req, res) {
        const { nome } = req.params;
        try {
            console.log("Entrou na pesquisa com nome: " + nome);
            var query = `%${nome}%`;
            const usuario = await dataBase.Usuarios
                .findAll({ where: { nome: { [Sequelize.Op.like]: query } } });
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async buscarUsuarioPorLogin(login) {
        try {
            const usuario = await dataBase.Usuarios.findOne({ where: { login: login } });
            return usuario;
        } catch (error) {
            console.log("Erro ao buscar usuario por login: " + error.menssage)
            throw error;
        }
    }

    static async login(req, res) {
        const token = await criaTokenJWT(req.user);
        res.set("Authorization", token);

        let usuario = req.user;

        usuario = {
            id: usuario.id,
            login: usuario.login,
            nome: usuario.nome,
            ativo: usuario.ativo,
            email: usuario.email,
            permissao: usuario.permissao,
            token: token
        };

        res.status(200).send(usuario);
    }
}

async function criarSenhaHash(senha) {
    const custoHash = 12;
    return bcrypt.hash(senha, custoHash);
}

async function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id,
    };
    console.log("JWT: " + process.env.CHAVE_JWT);

    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '12h' });
    return token;
}

module.exports = UsuarioController;