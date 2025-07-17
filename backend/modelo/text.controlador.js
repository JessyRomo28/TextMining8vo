// Controlador de texto - Analizar el texto (Validar)

class TextController {
    // Analizamos el texto xd
    static async analyze(req, res) {
        try {
            const { text } = req.body;
            if (!text) return res.status(400).json({ error: 'Texto requerido' });
            
            const analysis = TextMiningService.analyzeText(text);
            // Await es para esperar un poco para recibir una respuesta
            const savedText = await TextModel.create(analysis);
            
            res.json({ message: 'Análisis completo', data: savedText });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en análisis' });
        }
    }
}