const { where } = require('sequelize/lib/sequelize');
const { sequelize } = require('../models');
const db = require('../models');

const router = require('express').Router();

router.get('/allsellers', async (req, res, next) => {
    try {
        const users = await db.users.findAll({
            where: {
                usertype : 'sellers',
            },
            attributes: ['userid', 'username']
        })

        res.status(200).json({data : users, message : 'Found all sellers'})

    }
    catch(e)
    {
        res.status(400).json({message : e.toString()})
    }
})


router.get('/sellercatalog/:sellerid', async (req, res, next) => {
    let sellerid = req.params.sellerid;

    try {
        const productlist = await db.catalog.findAll({
            where: {
                sellerid : sellerid
            },
            include : {
                model : db.product,
                required :true       

            },
        }
        )
        console.log(productlist.toString())

    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e.toString()})
    }
})

module.exports = router;