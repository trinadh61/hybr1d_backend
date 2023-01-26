
const db = require('../models');

const router = require('express').Router();

router.get('/orders', async (req, res, next) => {

    try {
        const productlist = await db.orders.findAll({
            include : [{
                model : db.product,
                through : {
                    attributes : []
                }
            },
            {
                model : db.catalog,
                where : {
                    sellerid : 8,
                },
                attributes : []
            }],
        }
        )
        res.status(400).json({data : productlist, message : "Found all items"})
        
    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e.toString()})
    }
})


module.exports = router;