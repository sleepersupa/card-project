var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("CardDao",{
    card_name: String,
    type : String,
    filePath :String,
    game : String,
    created: {type: Date, default: Date.now},
    slug: { type: String, slug: "card_name", slug_padding_size: 2,  unique: true }
},"card")