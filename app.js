// Importar librerias
const express = require ("express");
const mongoose = require("mongoose");
const natural = require("natural");

dontenv.config();

mongoose.connect(process.env.urlbd)

.then(()=>{
    console.log("Funciona la conexion a la base de datos")
})

.catch((error)=>{
    console.log("Esta mal la chingadera", error)
})
