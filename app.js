// Constantes de las librerías
constanteExpress = require('express');
constanteExpress = require('mongoose');
constanteExpress = require('natural');


// Generacion de Clase "TEXT MINING SERVICE"
class TextMiningService {
    static analyzeText(text) {
        // Contar palabras
        const words = text.split(/\s+/).filter(w => w.length > 0);
        
        // Análisis de sentimiento básico
        const positiveWords = ['bueno', 'excelente', 'genial', 'increíble', 'fantástico'];
        const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'awful'];
    
        // Pasar las palabras a minúsculas
        let sentiment = 0;
        words.forEach(word => {
            if (positiveWords.includes(word.toLowerCase())) sentiment++;
            if (negativeWords.includes(word.toLowerCase())) sentiment--;
        });
// Hacerle frecuencia a la palabra - cuantas veces esta apareciendo en el texto y que salga el numero de veces que aparece
const wordFreq = {};
        words.forEach(word => {
            const w = word.toLowerCase();
            wordFreq[w] = (wordFreq[w] || 0) + 1;
        });

// Separa los resultados (Neutral, Positivo, Negativo)

let response = "Neutro"
        if(sentiment > 0){
            response = "Positivo"
        }
        if(sentiment<0){
            response = "Negativo"
        }

// Regresa nuestro resultado, cuenta las palabras y el sentimiento
return {
            text,
            wordCount: words.length,
            sentiment: response,
            keywords
        };
    }
}
// .create .delete .find "CONTROLADOR"
//"Banco de palabras" son los datos que se usan para el análisis de sentimiento 70 TRAIN 30 RESULTS

