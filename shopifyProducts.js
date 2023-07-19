const axios = require("axios");
const { products, images, getProduct } = require("./shopifyConstants");

const addProducts = async (payload) => {
  const data = await axios({
    url: products(process.env.shop),
    method: "post",
    data: payload,
    headers: {
      "X-Shopify-Access-Token": process.env.shopify_token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const addProductImages = async (payload) => {
  const data = await axios({
    url: images(process.env.shop, payload.product_id),
    method: "post",
    data: {
      image: {
        attachment: payload.attachment,
      },
    },
    headers: {
      "X-Shopify-Access-Token": process.env.shopify_token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.data) {
        return err.data;
      }
      return "Something went wrong";
    });
  return data;
};

module.exports = { addProducts, addProductImages };
