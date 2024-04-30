const Product = require("./models/Product");
const products = require("./products.json");

async function populate(){
    try{
        await Product.deleteMany();
        await Product.create(products);
        console.log("success!!!");
        process.exit(0);
    }catch (e) {
        console.log(e);
        process.exit(1);
    }
}
populate()