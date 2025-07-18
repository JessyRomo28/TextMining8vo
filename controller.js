class TextController {
    // Analizamos el texto xd
    static async analyze(req, res) {
        try {
            const { text } = req.body;
            if (!text) return res.status(400).json({ error: 'Texto requerido' });
            
            const analysis = TextMiningService.analyzeText(text);  //trae el texto y lo analiza y el sentimiento y palabras clave y el conteo de palabras 
            const savedText = await TextModel.create(analysis); //el await es para que si se llegara a tardar en cargar hace que espere un poco a que el azync funcione  
            
            res.json({ message: 'Análisis completo', data: savedText });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en análisis' });
        }
   } 
}