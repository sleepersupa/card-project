

var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("GameDao",{
    name : {type :String, unique :true},
    max_heroes : {type : Number, default: 1},
    description : String,
    image : String,
    created: {type: Date, default: Date.now},
},"game")