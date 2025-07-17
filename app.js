const express = require("express");
const natural = require("natural");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/textmining")

const app = express();
app.use(express.json());

app.post('/api/analyze', TextController.analyze);
app.get('/api/texts', TextController.getAll);
app.get('/api/stats', TextController.getStats);

app.listen(3000, () => {
    console.log('🚀 Servidor en puerto 3000');
});
