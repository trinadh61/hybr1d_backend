
const db = require('../models');

const router = require('express').Router();

router.get('/orders/:sellerid', async (req, res, next) => {
    const sellerid = req.params.sellerid;

    try {
        const orderlist = await db.orders.findAll({
            include : [{
                model : db.product,
                through : {
                    attributes : []
                }
            },
            {
                model : db.catalog,
                where : {
                    sellerid : sellerid,
                },
                attributes : []
            }],
        }
        )
        res.status(400).json({data : orderlist, message : "Found all items"})
        
    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e.toString()})
    }
})


router.post('/createcatalog', async (req, res, next) => {

    try {
        const {sellerid, catalogid, productList} = req.body;
        let error_fields = [];
        if(!sellerid)
        error_fields.push("sellerid");

        if(!catalogid)
            error_fields.push("catalogid");

        if(!productList || productList.length == 0)
            error_fields.push("productList");

        const productIdList =await db.product.bulkCreate(productList,{returning:true} )
        let catalog_product_mapping_object = [];

        productIdList.forEach((element) =>{
            catalog_product_mapping_object.push({productid:element.productid, catalogid : catalogid})
        } 
        )

        await db.catalog_product_mapping.bulkCreate(catalog_product_mapping_object)

        res.status(400).json({data :productIdList , message : "Found all items"})
        
    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e.toString()})
    }
})


module.exports = router;