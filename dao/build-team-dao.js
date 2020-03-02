
var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
module.exports= mongoose.model("BuildTeamDao",{
    name: String,
    heroes : Array,
    created: {type: Date, default: Date.now},
    description : String,
    slug: { type: String, slug: "name", slug_padding_size: 2,  unique: true }
},"build_team")