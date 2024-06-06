const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports.getAllData = (req,res) =>{
    if(req.session.LoggedIn){
        return res.json({valid:true})
    }else{
        return res.json({valid:false})
    }
}
module.exports.postSignup = async(req,res) => {
    try {
        const {username,email,password} = req.body;
        const user = await User.findOne({email:email});
        if(user) return res.status(409).json({message:'User Already Registered!'})

            bcrypt.hash(password, saltRounds, async function(err, hash) {
                await User.create({
                    username: username,
                    email: email,
                    password: hash
                })
            });
        res.status(200).json({message: 'User Created Successfully'});
    } catch (error) {
                res.status(500).json({message: 'INTERNAL SERVER ERROR'});
    }
}

module.exports.postLogin = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(409).json({message:'User not found'});

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                req.session.user = user;
                req.session.LoggedIn = true;
                res.status(200).json({message:'User Login Successfully'});
            }else{
                res.status(404).json({message:'Something went wrong'});

            }
        });
    } catch (error) {
                res.status(500).json({message: 'INTERNAL SERVER ERROR'});
    }
}