
class TextMiningService {
    static analyzeText(text){//contar palabras
     const words = text.split(/\s+/).filter(w => w.length > 0);
     //analisis de sentimiento basico
     const positiveWords = ['bueno','excelente','genial','increible','fantastico'];
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

    }