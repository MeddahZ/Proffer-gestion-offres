const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const auth = async ( req ,res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Admin.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) {
            throw error()
        }
        req.token = token
        req.admin = user
        next()
    } catch (e) {
        res.status(401).send({error: 'please authenticate so we can confirm that you are not an alien.'})
    }

    
}

module.exports = auth