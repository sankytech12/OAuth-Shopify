const apiVersion='2023-07';

const apiBaseUri=(shop)=>{
    return `https://${shop}/admin/api/${apiVersion}/`;
}

//product api
const products=(shop)=> `${apiBaseUri(shop)}products.json`;

const images=(shop,product_id)=> `${apiBaseUri(shop)}products/${product_id}/images.json`;

const getProduct=(shop,product_id)=> `${apiBaseUri(shop)}products/${product_id}.json`

//get
///admin/api/2023-07/products/{product_id}.json

module.exports={products,images,getProduct};