

var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("GameDao",{
    name : {type :String, unique :true},
    max_heroes : {type : Number, default: 1},
    min_heroes : {type : Number, default : 1},
    heroUnique : {type : Boolean , default : false },
    tags : {type :Array , default :[]},
    description : String,
    image : String,
    created: {type: Date, default: Date.now},
    slug : {type : String , default : ""}
    // slug: { type: String, slug: "name", slug_padding_size: 2,  unique: true }
},"game")