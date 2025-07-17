class TextController{
    //analizamos el texto
    static async analyze(req,res){
        try{
            const{text}=req.body;
            if (!text) return res.status(400).json({error:'Texto requerido'});
            
            const analysis = TextMiningService.analyzeText(text);
            const savedText = await textModel.create(analysis);

            res.json({message:'analisis completo',data:savedText});
        }catch (error){
            console.log(error)
            res.status(500).json({error:'Error en alasilis'});
        }
    }
}