
const BuildTeamDao = require('../dao/build-team-dao');


module.exports =(app) => {
    app.post("/build-team" ,(req,res) =>{
        BuildTeamDao.create(req.body ,(error, item) =>{
            res.json(item);
        })
    })

    app.get("/builds" , (req, res) =>{
        BuildTeamDao.find({} , (err, items) =>{
            res.json(items);
        })
    })

    app.get(`/build/:slug` , (req, res) =>{
        BuildTeamDao.findOne({slug : req.params.slug} ,(err, item)=>{
            res.json(item);
        })
    })
}