const express = require ('express');
const mongoose = require ('mongoose');
const natural = require ('natural');

mongoose.connect("")

const app = express();
app.use(express.json());

app.post('/api/analyze', TextController.analyze);
app.get('/api/texts', TextController.getAll);
app.get('/api/stats', TextController.getStats);

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});