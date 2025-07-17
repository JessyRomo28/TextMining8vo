import {Schema, model} from "mongoose"

// Crear esquema con sus variables
const textSchema = new mongoose.Schema({
    text:String,
    wordCount:Number,
    sentiment: String,
    keywords:[String],
    createdAt:{ type: Date, default: Date.now}
})

// Crear el modelo en la tabla Text 
const TextModel = mongoose.model('Text', textSchema)

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
    const wordFreq = {};
            words.forEach(word => {
                const w = word.toLowerCase();
                wordFreq[w] = (wordFreq[w] || 0) + 1;
            });
    let response = "Neutro"
            if(sentiment > 0){
                response = "Positivo"
            }
            if(sentiment < 0){
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
    const app = express();
    app.use(express.json());

    app.post('/api/analyze', TextController.analyze);
    app.get('/api/texts', TextController.getAll);
    app.get('/api/stats', TextController.getStats);

    app.listen(3000, () => {
        console.log('🚀 Servidor en puerto 3000');
    });
