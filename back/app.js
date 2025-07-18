//librerías
constanteExpress = require('express');
constanteExpress = require('mongoose');
constanteExpress = require('natural');


class TextMiningService {
    static analyzeText(text) {
               const words = text.split(/\s+/).filter(w => w.length > 0);
        
               const positiveWords = ['bueno', 'excelente', 'genial', 'increíble', 'fantástico'];
        const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'awful'];
    
            let sentiment = 0;
        words.forEach(word => {
            if (positiveWords.includes(word.toLowerCase())) sentiment++;
            if (negativeWords.includes(word.toLowerCase())) sentiment--;
const wordFreq = {};
        words.forEach(word => {
            const w = word.toLowerCase();
            wordFreq[w] = (wordFreq[w] || 0) + 1;
});

            });

let response = "Neutro"
        if(sentiment > 0){
            response = "Positivo"
        }
        if(sentiment<0){
            response = "Negativo"
return {
            text,
            wordCount: words.length,
            sentiment: response,
            keywords
        };
    }
    }
}
