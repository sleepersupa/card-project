
const BuildTeamDao = require('../dao/build-team-dao');
const VoteDao = require('../dao/vote-dao');

let ips = ['11111','22222','33333']

let getVotes =(items ,ip)=> new Promise(async (res, rej)=>{
    let counts= {};
    for(let item of items){
        let finds = await VoteDao.find({build_id : item._id});
        let up = finds.filter(f => f.status === 1).length ;
        let down = finds.filter(f => f.status === 2).length ;
        let voted = finds.find( f => f.ip === ip);
        let status = voted ? voted.status : 0;
        counts[item._id] = { value : up - down , status  } ;
    }
    res({builds : items.reverse() , votes : counts});
})
module.exports =(app) => {
    app.post("/build-team" ,(req,res) =>{
        BuildTeamDao.create(req.body ,(error, item) =>{
            res.json(item);
        })
    })

    app.get("/:game/builds" ,async (req, res) =>{
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        BuildTeamDao.find({game : req.params.game} , async (err, items) =>{
            getVotes(items , ip).then(data =>{
                res.json(data);
            })
        })
    })

    app.get(`/:game/build/:slug` , (req, res) =>{
        BuildTeamDao.findOne({slug : req.params.slug} ,(err, item)=>{
            res.json(item);
        })
    })

    app.get('/:game/hero/:slug/builds' ,(req, res)=>{
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        BuildTeamDao.find({"heroes.slug": req.params.slug } , (err, builds)=>{
            getVotes(builds , ip).then(data =>{
                res.json(data)
            })
        })
    })
}