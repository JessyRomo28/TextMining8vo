const textSchema = new 
mongoose.Schema({
    text: String,
    wordCount: Number,
    sentiment: String,
    keywords: [String],
    createdAt: { type: Date, default: Date.now} 
});
const TextModel = 
mongoose.model('Text', textSchema);