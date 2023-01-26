
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
                required :true ,      
                through: {
                    attributes : []
                }
            },
        }
        )
        res.status(400).json({data : productlist, message : "Found all items"})
        
    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e.toString()})
    }
})


router.post('/createorder/:sellerid', async (req, res, next) => {
    let sellerid = req.params.sellerid;
    try{
    let {userid, productList, catalogid} = req.body;
    let error_fields = [];

    if(!userid)
    error_fields.push("userid");

    if(!catalogid)
    error_fields.push("catalogid");

    if(!productList || productList.length == 0)
    error_fields.push("productList");

    if(error_fields.length != 0)
    return res.status(403).json({message : `${error_fields.join(", ")} is/are missing`})

    
        

    let orderDetails = await db.orders.create({
        userid : userid,
        catalogid : catalogid,    
    })

    let bulkCreateObject = [];

    productList.forEach((product) => {
        bulkCreateObject.push({orderid: orderDetails.orderid, productid : product})
    })

    await db.order_product_mapping.bulkCreate(bulkCreateObject);

    return res.status(200).json({data : {orderid : orderDetails.orderid}, message : "order created successfully"}) 
        
    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e.toString()})
    }
})

module.exports = router;