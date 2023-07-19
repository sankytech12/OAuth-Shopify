const express=require('express');
const bodyParser = require('body-parser');
const {authorize,redirect}=require('./shopifyOAuthHelper')
const {addProducts, addProductImages}=require('./shopifyProducts');
const multiParty=require('connect-multiparty');
const fs=require('fs');
const axios=require('axios');
const {getProduct}=require('./shopifyConstants')

require('dotenv').config();

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(4000,()=>{
    console.log(`Started on port: 4000`)
})

//authorizing shopify user
app.get('/api/shopify/authorize',async(req,res)=>{
    return res.redirect(await authorize(req.query.shop));
})

//handiling the redirect after authorizing
app.get('/api/shopify/redirect',async(req,res)=>{
    console.log("loading..");
    let shopify_auth=await redirect(req.query);
    if(shopify_auth===null){
        return res.json({
            message: "Data is not accessible..."
        })
    }
    process.env.shopify_token=await shopify_auth.data.access_token;
    process.env.shop=req.query.shop;
  
    return res.json({
        message: 'Authorization Done!!'
    });
})

//add products to shopify store
app.post('/api/shopify/products',multiParty(), async(req,res)=>{
    return res.json(await addProducts(req.body));
})

//adding image to specific product_id
app.post('/api/shopify/products/:product_id/images',multiParty(),async(req,res)=>{
    let payload={
        product_id:req.params.product_id,
        attachment:fs.readFileSync(req.files.image.path,{
            encoding:'base64'
        })
    }
    let addProductImage=await addProductImages(payload);
    return res.json(addProductImage);
})


//retriving details of a specific product from the store
app.get('/api/shopify/products/:product_id',async(req,res)=>{
    const data= await axios({
        method:'get',
        url:getProduct(process.env.shop,req.params.product_id),
        headers:{
            'X-Shopify-Access-Token':process.env.shopify_token
        }
    }).then((response)=>{
        return response;
    }).catch((err)=>{
        return err;
    })
     return res.json({
        product_details:data.data
    });
    
})

