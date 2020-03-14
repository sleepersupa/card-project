


const VoteDao =  require("../dao/vote-dao");

let ips = ['11111','22222','33333']

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
}