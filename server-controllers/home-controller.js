
const GameDao = require("../dao/game-dao");

const getGames = ()=> new Promise((res, rej)=>{
    GameDao.find({} ,(err, games)=>{
        res(games);
    })
})

module.exports =(app) =>{
    app.get("/home" , async (req,res) =>{
        let games =  await getGames();

        res.json({games})
    })
}