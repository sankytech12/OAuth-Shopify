const apiVersion = "2023-07";

const apiBaseUri = (shop) => {
  return `https://${shop}/admin/api/${apiVersion}/`;
};

// generate URI for fetching products
const products = (shop) => `${apiBaseUri(shop)}products.json`;

// generate URI for fetching images of a product
const images = (shop, product_id) =>
  `${apiBaseUri(shop)}products/${product_id}/images.json`;

// generate URI for fetching details of a product
const getProduct = (shop, product_id) =>
  `${apiBaseUri(shop)}products/${product_id}.json`;

module.exports = { products, images, getProduct };
