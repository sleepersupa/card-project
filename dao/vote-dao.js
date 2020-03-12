
var mongoose= require("mongoose") ;

module.exports= mongoose.model("VoteDao",{
    ip : String,
    build_id : String,
    status : {type : Number , default:  0},
    // created: {type: Date, default: Date.now},
},"vote")