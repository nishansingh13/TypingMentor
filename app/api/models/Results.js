import mongoose from "mongoose";
import User from "./User";
const ResultSchema = new mongoose.Schema({
    wpm : {type : Number , required : true},
    netWpm : {type : Number , required : true},
    accuracy : {type : Number , required : true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    wordCount : {type : Number },
    timeCount : {type : Number },
    typeOfTest : {type : String , required : true},
    uid :{type : String , required : true},
    username : {type : String , required : true}
});
export default mongoose.models.Result || mongoose.model("Result", ResultSchema);