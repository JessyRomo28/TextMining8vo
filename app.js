const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const natural = require("natural");

dotenv.config()
mongoose.connect(process.env.url)

class TextMiningService{
    static analyzeText(text){
        //contar palabras
        const words = text.split(/\s+/).filter(w=>w.lenght>0);
        //analisis de sentimiento basico
        const positiveWords = ['bueno','excelente','genial','increible','fantastico'];
        const negativeWords = ['malo','terrible','horrible','pesimo','awful'];
        let sentiment = 0;
        words.forEach(word=>{
            if (positiveWords.includes(word.toLowerCase()))sentiment++;
            if (negativeWords.includes(word.toLowerCase()))sentiment--;
        });
        const wordFreq = {};
        words.forEach(word=>{
            const w = word.toLowerCase();
            wordFreq[w]=(wordFreq[w]||0)+1;
        });
        let response = "Neutro"
        if(sentiment>0){
            response="Positivo"
        }
        if(sentiment<0){
            response="Negativo"
        }
        return{
            text,
            wordCount:words.lenght,
            semtiment:response,
            keywords
        };
    }
}

const app = express();
app.use(express.json());

app.post('/api/analyze',TextController.analyze);
app.get('/api/texts',TextController.getAll);
app.get('/api/stats',TextController.getStats);

app.listen(3000,()=>{
    console.log('Servidor en puerto 3000')
});