const axios = require("axios");
const crypto = require("crypto");
const hashEquals = require("hash-equals");

// function to generate the Shopify authorization URL
const authorize = async (shop) => {
  return encodeURI(
    `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.client_id}&scope=${process.env.scopes}&redirect_uri=${process.env.redirect_uri}`
  );
};

// function to handle the Shopify OAuth redirect and obtain access token
const redirect = async (query) => {
  let hmac = query.hmac;
  delete query.hmac;
  const params = new URLSearchParams(query);
  const str = params.toString();
  const comp_hmac = crypto
    .createHmac("sha256", process.env.client_secret)
    .update(str)
    .digest("hex");
  console.log(comp_hmac);
  console.log(hmac);
  if (hashEquals(comp_hmac, hmac)) {
    // if the HMACs match, proceed to get the access token from Shopify
    let shopifyOAuthUri = `https://${query.shop}/admin/oauth/access_token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${query.code}`;
    const data = await axios({
      url: shopifyOAuthUri,
      method: "post",
      data: {},
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return data; // return the response containing the access token
  } else {
    console.log("Something went wrong????");
    return null;
  }
};

module.exports = { authorize, redirect };
