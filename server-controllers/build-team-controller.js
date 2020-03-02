
const BuildTeamDao = require('../dao/build-team-dao');


module.exports =(app) => {
    app.post("/build-team" ,(req,res) =>{
        BuildTeamDao.create(req.body ,(error, item) =>{
            res.json(item);
        })
    })
}