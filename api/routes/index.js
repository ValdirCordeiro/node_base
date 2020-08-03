const usuarios = require("./usuariosRoute");

module.exports = app => {
    app.use(usuarios);        
}