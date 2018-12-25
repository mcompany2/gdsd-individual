'use strict';

module.exports = function (Wishlist) {
  var appModels = require('../../server/server').registry.modelBuilder.models;
  var Product = appModels.Product;
  var Customer = appModels.Customer;
  /**
   * remove product from customers wishlist
   * @param {string} customerId
   * @param {string} productId
   * @param {Function(Error, array, array)} callback
   */

  Wishlist.unwishproduct = async function(reqBody, callback) {
    var customerId = reqBody.customerId;
    var productId = reqBody.productId;
    try {
      var wishlist = await Wishlist.destroyAll({
        and: [{ customerId: customerId }, { productId: productId }]
      });
      var product = await Product.findById(productId);
      var customer = await Customer.findById(customerId, { include: "wishlist" });
      callback(null, product, customer);
    } catch (e) {
      console.log(e)
      callback({ error: 'Error while deleting wishlist for product:' + productId + ' and customer:' + customerId });
    }
  };
};
