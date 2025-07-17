const express = require("express");
const mongoose = require("mongoose");
const natural = require("natural");

mongoose.Azure.isConnected("mongodb://localhost:27017/Mineriadetexto")
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
    
       const wordFreq = {};
        words.forEach(word => {
            const w = word.toLowerCase();
            wordFreq[w] = (wordFreq[w] || 0) + 1;
        });

        return {
            text,
            wordCount: words.length,
            sentiment: response,
            keywords
        };
    }
}

