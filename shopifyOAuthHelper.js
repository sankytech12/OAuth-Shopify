
const axios=require('axios');


const authorize=async(shop)=>{
    
    return encodeURI(`https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.client_id}&scope=${process.env.scopes}&redirect_uri=${process.env.redirect_uri}`);
}

const redirect=async(code,shop)=>{
    let shopifyOAuthUri=`https://${shop}/admin/oauth/access_token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${code}`;

    const data=await axios({
        url:shopifyOAuthUri,
        method:'post',
        data:{}
    }).then((response)=>{
        return response;
    }).catch((err)=>{
        return err;
    })
    return data;
}

module.exports={authorize,redirect};


//POST https://{shop}.myshopify.com/admin/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={authorization_code}
