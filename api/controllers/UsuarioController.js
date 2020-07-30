const dataBase = require("../models");

class UsuarioController {
    static async buscarTodosUsuarios(req, res) {
        try {
            const todosOsUsuarios = await dataBase.Usuarios.findAll();
            return res.status(200).json(todosOsUsuarios);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscarUsuarioPorId(req, res) {
        const { id } = req.params;
        try {
            const usuario = await dataBase.Usuarios.findOne({ where: { id: Number(id) } });
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarUsuario(req, res) {
        try {
            const novoUsuario = req.body;

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

            return res.status(200).json({mensagem: `o usuario de id ${id} foi deletado`})

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = UsuarioController;