

const CardDao = require('../dao/card-dao');


module.exports =(app) =>{
    app.post('/manage-cards' ,  async  (req,res) =>{
        try{
            let card = await CardDao.create(req.body);
            return res.send({error : false , message : 'Done !' , card : card })
        }catch(e){
            return res.send({error : true , message : 'Failed !'})
        }
    })


    app.get('/cards', async (req, res) =>{
        try{
            let cards =  await CardDao.find({}) ;

            return res.send({error :false , cards : cards.reverse() })
        }catch(e){
            return res.send({error : true , message : 'Failed !'})
        }
    })

    app.get('/card/:id' , async (req,res)=>{
        try{
            let card =  await CardDao.findOne({_id : req.params.id })
            return res.send({error : false , card : card})
        }  catch (e) {
            return res.send({error : true , message : 'Failed !'})
        }
    })


    app.post('/modify-card' , async  (req, res)=>{
        try{
            await CardDao.findOneAndUpdate({_id :req.body._id}, req.body);
            return res.send({error : false , message : 'Done !'})
        }catch(e){
            console.log(e);
            return res.send({error : true , message : 'Failed !'})
        }
    })
}