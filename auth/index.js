const jwttoken = require('jsonwebtoken')
const privatekey = require('../config/config.json')['auth_privatekey']

const authenication = (req, res, next) => {
    const authorization_header = req.header.authorization;

    if(!authorization_header){
        return res.status(401).json({message : "Not Authorizied"});
    }

    const token = authorization_header.split(' ')[1];
    jwttoken.verify((authorization_header, privatekey, (error, decodeToken) => {
        if(error){
            return res.status(401)
        }

        const userid = decodeToken.userid;
        if(req.body.userid && req.body.userid !== userid){
            return res.status(401).json({message : "User id does not match"})
        }
        next();
    }))

}

const signToken = (userid) => {
    return jwttoken.sign({userid : userid}, privatekey, {
        expiresIn:'24h'
    })
}

module.exports = {
    authenication, signToken
}

