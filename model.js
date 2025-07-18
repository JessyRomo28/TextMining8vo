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
            if (positiveWords.includes(word.toLowerCase())) sentiment++; //ESTANDARIZA EL TEXTO TODO MAYÚSCULA O MINÚSCULA 
            if (negativeWords.includes(word.toLowerCase())) sentiment--;
        }); 

        const wordFreq = {}; //Cuenta la frecuencia en que aparece una palabra 
        words.forEach(word => {
            const w = word.toLowerCase();
            wordFreq[w] = (wordFreq[w] || 0) + 1;
        });

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
