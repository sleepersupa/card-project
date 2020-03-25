const GameDao =  require("../dao/game-dao");
const _ = require("lodash");

module.exports = (app) =>{
    app.get("/games" , (req,res) =>{
        GameDao.find({} ,(err, games) =>{
            res.json({games});
        })
    })

    app.post("/game" , (req, res) =>{
        GameDao.create(req.body ,(err, game) =>{
            res.json(game);
        })
    })

    app.get("/game/:id" ,(req,res) =>{
        GameDao.findOne({_id : req.params.id} ,(err, game)=>{
            res.json(game);
        })
    })

    app.put("/game" , (req,res) =>{
        GameDao.findOneAndUpdate({_id : req.body._id} , _.omit(req.body, ["_id"]) , {new :true} , (err, updated) =>{
            res.json(updated);
        })
    })

    app.get('/game/by-slug/:slug' , (req,res) =>{
        GameDao.findOne({slug : req.params.slug} ,(err, config) =>{
            res.json(config)
        })
    })
}