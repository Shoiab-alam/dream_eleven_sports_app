const Team = require('../models/Team');
const Match = require('../models/Match');
const mongoose = require('mongoose');

module.exports.getAllData = async(req,res) => {
    try {
        const id = req.params.id;
        let match = await Match.find();
        match.forEach((item) => {
            if(item.id === id){
                res.json({item:item, user:req.session.user});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.postData = async(req,res)=>{
    try {
        const {players, matchId} = req.body;
        const team = await Team.findOne({matchId:matchId})
        if(team)return res.status(409).json({message:'Team Already Available'});
        await Team.create({
            players: players,
            matchId:matchId,
            user: req.session.user
        })
        res.json({message:'Team Create Successfully'})
    } catch (error) {
        console.log(error);
    }
}

module.exports.getPlayers = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const userId = req.params.userId;

    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID');
        }

        const teams = await Team.find({ user: userId,matchId:matchId}).populate('user');
        
        if (teams.length === 0) {
            return res.status(404).send('No teams found for the specified user and match');
        }
        const userObjectId =new mongoose.Types.ObjectId(userId);
        teams.forEach(team => {
            if(team.user._id.equals(userObjectId) && matchId === matchId){
                return res.json(team.players)
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};