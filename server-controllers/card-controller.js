const CardDao = require('../dao/card-dao');
const GameDao = require('../dao/game-dao');
const PVEDao  = require("../dao/pve-dao");
const PVPDao  = require("../dao/pvp-dao");
const BuildTeamDao = require("../dao/build-team-dao");

module.exports = (app) => {
    app.post('/manage-cards', async (req, res) => {
        try {
            let card = await CardDao.create(req.body);
            return res.send({error: false, message: 'Done !', card: card})
        } catch (e) {
            return res.send({error: true, message: 'Failed !'})
        }
    })


    app.get('/cards', async (req, res) => {
        try {
            let cards = await CardDao.find({});

            return res.send({error: false, cards: cards.reverse()})
        } catch (e) {
            return res.send({error: true, message: 'Failed !'})
        }
    })

    app.get('/:game/cards', async (req, res) => {
        try {
            GameDao.findOne({slug: req.params.game}, async (err, game) => {
                console.log(game);
                let cards = await CardDao.find({game: game._id});
                return res.send({error: false, cards: cards.reverse()})
            })

        } catch (e) {
            return res.send({error: true, message: 'Failed !'})
        }
    })

    app.get('/card/:id', async (req, res) => {
        try {
            let card = await CardDao.findOne({_id: req.params.id})
            return res.send({error: false, card: card})
        } catch (e) {
            return res.send({error: true, message: 'Failed !'})
        }
    })


    app.post('/modify-card', async (req, res) => {
        try {
            await CardDao.findOneAndUpdate({_id: req.body._id}, req.body);
            return res.send({error: false, message: 'Done !'})
        } catch (e) {
            console.log(e);
            return res.send({error: true, message: 'Failed !'})
        }
    })

    app.delete('/card/:id', async (req, res) => {
        try {
            let card = await CardDao.findOne({_id: req.params.id})
            return res.send({error: false, card: card})
        } catch (e) {
            return res.send({error: true, message: 'Failed !'})
        }
    })

    app.get("/:game/card/:slug", async (req, res) => {
        try {

            let card = await CardDao.findOne({slug: req.params.slug});
            return res.send({error: false, card: card})

        } catch (e) {
            return res.send({error: true, message: 'Failed !'})
        }
    })

    app.get("/:game/card/overview/:slug" , async (req, res)=>{
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var hero = await CardDao.findOne({slug : req.params.slug});
        let getVotes = (dbType) => new Promise(async (res,rej) =>{
            let finds = await dbType.find({hero_id : hero._id});
            let up = finds.filter(f => f.status === 1).length ;
            let down = finds.filter(f => f.status === 2).length ;
            let voted = finds.find( f => f.ip === ip);
            let status = voted ? voted.status : 0;
            res({value : up-down, status})
        })
        // let getOverview = () => new Promise((res,rej) =>{
        //     BuildTeamDao.find({ game : req.params.game , "heroes.slug" : req.params.slug } , {"heroes.description" : 0 }, async (err, items) =>{
        //         res(items);
        //     })
        // })

        // let builds = await getOverview();
        let pve_votes = await getVotes(PVEDao);
        let pvp_votes = await getVotes(PVPDao);
        return res.json({pve_votes, pvp_votes})
    })

}