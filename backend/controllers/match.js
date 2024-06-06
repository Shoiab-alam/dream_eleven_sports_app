const Match = require('../models/Match');

module.exports.getAllData = async(req,res) => {
    try {
        let data = await Match.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERRPR'});
    }
} 

module.exports.getDataById = async(req,res) =>{
    try {
        const id = req.params.id;
        let data = await Match.find();
        data.forEach(item => {
            if(item._id === id){
                res.json(item);
            }
        })
    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERRPR'});
        
    }
}