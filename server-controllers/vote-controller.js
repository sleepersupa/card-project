


const VoteDao =  require("../dao/vote-dao");
const PVEDao = require("../dao/pve-dao");
const PVPDao = require("../dao/pvp-dao");

let ips = ['11111','22222','33333'];

const voteHero =(req , db ) => new Promise((res,rej)=>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let target = { ip : ip , hero_id : req.params.id  };
    db.findOneAndUpdate(target , {...target , status: req.params.status  },  {upsert : true, new : true }, (err, updated)=>{
        db.find({ hero_id : req.params.id } ,(err,rs)=>{
            let up =  rs.filter( r => r.status === 1).length;
            let down =  rs.filter( r => r.status === 2).length;
            let value = up - down ;
            res({...updated._doc , value })
        })
    })
})

module.exports= (app)=>{
    app.get("/vote/:id/:status" , (req,res)=>{
        let come_ip = "22222"; //ips[Math.floor(Math.random()*3)];
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(ip);
        let target = { ip : ip , build_id : req.params.id  };
        VoteDao.findOneAndUpdate(target, {...target, status : req.params.status} , {upsert : true, new : true } ,(err, updated)=>{
            VoteDao.find({build_id: req.params.id} ,(err, rs) =>{
                let up =  rs.filter( r => r.status === 1).length;
                let down =  rs.filter( r => r.status === 2).length;
                let value = up - down ;
                return res.json({...updated._doc , value });
            })
        })
    })

    app.get("/pve/:id/:status", async (req,res)=>{
        let ret =  await voteHero(req, PVEDao);
        return res.json(ret);
    })

    app.get("/pvp/:id/:status", async (req,res)=>{
        let ret =  await voteHero(req, PVPDao);
        return res.json(ret);
    })
}