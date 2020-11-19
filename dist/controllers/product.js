"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
exports.getOneProduct = getOneProduct;

var _products = _interopRequireDefault(require("../models/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createProduct(req, res) {
  const {
    body: {
      radius,
      image,
      name,
      location
    },
    currentUser
  } = req;
  const product = new _products.default({
    radius,
    image,
    name,
    location: location ? {
      type: 'Point',
      coordinates: location
    } : currentUser.location,
    userId: currentUser._id
  });

  try {
    await product.save();
    return res.status(201).json({
      success: true,
      product,
      message: `product successfully created`
    });
  } catch (error) {
    console.log('product', error);
    return res.status(500).json(console.log(`Server error: ${error}`));
  }
}

async function getAllProducts(req, res) {
  const {
    currentUser,
    query
  } = req;
  console.log(query);

  try {
    const products = await _products.default.find(query.location ? {
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: 'Point',
            coordinates: query.location.split(',')
          }
        }
      }
    } : {}); // .where('location')
    // .near({
    //   center: query.location.split(','),
    //   spherical: true,
    //   maxDistance: 5,
    // });

    return res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    return res.status(500).json(console.log(`Server error: ${error}`));
  }
}

async function getOneProduct(req, res) {
  const {
    params: {
      id
    },
    currentUser
  } = req;

  try {
    const product = await _products.default.findById(id).populate('userId').populate({
      path: 'comments',
      populate: [{
        path: 'user'
      }, {
        path: 'comment'
      }]
    });
    if (!product) return res.status(404).json(console.log('product not found'));
    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(console.log(`Server error: ${error}`));
  }
}