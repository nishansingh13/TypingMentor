import mongoose from "mongoose";
const ResultSchema = new mongoose.Schema({
    wpm : {type : Number , required : true},
    netWpm : {type : Number , required : true},
    accuracy : {type : Number , required : true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    wordCount : {type : Number , required : true},
    typeOfTest : {type : String , required : true},
});
export default mongoose.models.Result || mongoose.model("Result", ResultSchema);