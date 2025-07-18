const textSchema = new mongoose.Schema({
    text:String,
    wordCount:Number,
    sentiment:String,
    keywords:[String],
    createdAt:{typeKey:Date, default:Date.now}
});

const textModel = mongoose.model('Text',textSchema)
