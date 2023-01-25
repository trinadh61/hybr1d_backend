const router = require('express').Router();
const db = require('../models');


router.post('/signup', async (req, res, next) => {
    let {username, password, usertype} = req.body;
    let error_fields = [];

    if(!username)
    error_fields.push("username");

    if(!password)
    error_fields.push("password");

    if(!usertype)
    error_fields.push("usertype");

    try{
    if(error_fields.length != 0)
    return res.status(403).json({message : `${error_fields.join(", ")} is/are missing`})

    let user = await db.user.create({username:username, password : password, usertype : usertype})
    let data = {};
    data["userid"] = user.userid;
    let catalog;
    if(user.usertype === 'sellers'){
        catalog = await db.catalog.create({sellerid : user.userid});
        data["catalogid"] = catalog.catalogid;
    }

    return res.status(200).json({message : "user created successfully", data : data})

    }
    
    catch(e){
        if(e.name === 'SequelizeUniqueConstraintError')
        {
            return res.status(403).json({message :`${Object.keys(e.fields).join(", ")} needs to unique`})
        }
        return res.status(403).json({message : e.toString()})
    }


})

module.exports = router;