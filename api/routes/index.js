const express = require("express");
const usuarios = require("./usuariosRoute");

module.exports = app => {
    app.use(express.json());

    app.use(usuarios);
    
}