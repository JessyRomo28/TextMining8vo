
// Crea un esquema - modelo
const textSchema = new mongoose.Schema({
    text: String,
    wordCount: Number,
    sentiment: String,
    keywords: [String],
    createdAt: { type: Date, default: Date.now }
});

// Es el modelo/tabla llamada Text
const TextModel = mongoose.model('Text', textSchema);

