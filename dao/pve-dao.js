
var mongoose= require("mongoose") ;

module.exports= mongoose.model("PVEDao",{
    ip : String,
    game : String,
    hero_id : String,
    status : {type : Number , default:  0},
    // created: {type: Date, default: Date.now},
},"pve")