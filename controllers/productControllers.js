const Product = require("../models/Product");

async function getAllProducts(req, res, next) {
    const {featured, company, name, sort,fields} = req.query;
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === "true"?true:false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }

    let result =  Product.find(queryObject);

    if(sort){
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }

    if(fields){
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({data: products, nbHits: products.length});
}


module.exports = {getAllProducts};