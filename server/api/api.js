import express from 'express';
import User from '../schema/User.js';
import Medicine from '../schema/Medicine.js';

const router=express.Router();


router.post('/signin', async (req,res,next) => {
    const exist = await User.findOne({ username: req.body.username });
    
    if(exist){
        return res.status(401).json('Username already exist');
    } 
    User.create(req.body)
    .then(data => res.json(data))
    .catch(next => console.log(next));
})

router.post('/login', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username, password: req.body.password});
    console.log(req.body.username);
    if(user)
    {
        return res.status(200).json(`${req.body.username} login successfull`);
    }
    else
    {
        return res.status(401).json('Invalid Login');
    }
})

router.post('/medicine/update', async (req,res,next) => {
    const exist = await Medicine.findOne({username: req.body.username, name: req.body.name})
    console.log(exist);
    if(exist){
        await Medicine.updateOne({"_id":exist._id},{$set:{quantity:req.body.quantity}});
        console.log("Data updated Successfully");
    }else{
        Medicine.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
})

router.post('/medicine/delete', async (req,res,next) => {
    Medicine.findOneAndDelete({name: req.body.name, username: req.body.username})
    .then(data => res.json(data))
    .catch(err => console.log(err));
})

router.post('/medicine/add', async (req,res,err) => {
    const exist = await Medicine.findOne({username: req.body.username, name: req.body.name})
    console.log(exist);
    if(exist){
        await Medicine.updateOne({"_id":exist._id},{$set:{quantity:req.body.quantity}});
        console.log("Data updated Successfully");
    }else{
        Medicine.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    } 
})

router.get('/medicine/search', async (req,res,err) => {
    const exist = await Medicine.find(req.query);
    console.log(exist);
    if(exist){
        return res.json(exist);
    }
    else{
        return res.json('medicine not found');
    }
})

router.get('/user/search', async(req,res,err) => {
    const exist = await User.find(req.query)
    if(exist)
    {
        return res.json(exist);
    }
    else 
    {
        return res.json('user not found');
    }
})




export default router;