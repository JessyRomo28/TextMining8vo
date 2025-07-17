const express = require('express');
const mongoose = require('mongoose');
const natural = require('natural');

mongoose.connect('mongodb://localhost:27017/textmining');
const textSchema = new mongoose.Schema({
    text: String,
    wordCount: Number,
    sentiment: String,
    keywords: [String],
    createdAt: { type: Date, default: Date.now }
});

const TextModel = mongoose.model('Text', textSchema);

class TextMiningService {
    static analyzeText(text) {
        // Contar palabras
        const words = text.split(/\s+/).filter(w => w.length > 0);
        
        // Análisis de sentimiento básico
        const positiveWords = ['bueno', 'excelente', 'genial', 'increíble', 'fantástico'];
        const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'awful'];
        
        let sentiment = 0;
        words.forEach(word => {
            if (positiveWords.includes(word.toLowerCase())) sentiment++;
            if (negativeWords.includes(word.toLowerCase())) sentiment--;
        });
        
        // Palabras clave (más frecuentes)
        const wordFreq = {};
        words.forEach(word => {
            const w = word.toLowerCase();
            wordFreq[w] = (wordFreq[w] || 0) + 1;
        });
        
        const keywords = Object.entries(wordFreq)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([word]) => word);

        let response = "Neutro"
        if(sentiment > 0){
            response = "Positivo"
        }
        if(sentiment<0){
            response = "Negativo"
        }
        
        return {
            text,
            wordCount: words.length,
            sentiment: response,
            keywords
        };
    }
}

class TextController {
    // Analizamos el texto xd
    static async analyze(req, res) {
        try {
            const { text } = req.body;
            if (!text) return res.status(400).json({ error: 'Texto requerido' });
            
            const analysis = TextMiningService.analyzeText(text);
            const savedText = await TextModel.create(analysis);
            
            res.json({ message: 'Análisis completo', data: savedText });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en análisis' });
        }
    }
    
    // Obtener todos los análisis
    static async getAll(req, res) {
        try {
            const texts = await TextModel.find().sort({ createdAt: -1 });
            res.json({ data: texts });
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo datos' });
        }
    }
    
    // Estadísticas básicas
    static async getStats(req, res) {
        try {
            const total = await TextModel.countDocuments();
            const avgWords = await TextModel.aggregate([
                { $group: { _id: null, avg: { $avg: '$wordCount' } } }
            ]);
            
            res.json({ 
                total, 
                avgWordCount: avgWords[0]?.avg || 0 
            });
        } catch (error) {
            res.status(500).json({ error: 'Error en estadísticas' });
        }
    }
}

const app = express();
app.use(express.json());

app.post('/api/analyze', TextController.analyze);
app.get('/api/texts', TextController.getAll);
app.get('/api/stats', TextController.getStats);

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});

/*
POST http://localhost:3000/api/analyze
{
    "text": "Este es un texto genial para analizar. Es increíble cómo funciona el minado de texto."
}

GET http://localhost:3000/api/texts
GET http://localhost:3000/api/stats
*/