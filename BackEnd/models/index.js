const Product = require('./productModel');
const Sale = require('./saleModel');
const SaleItem = require('./saleItemModel');
const Cart = require('./cartModel');
const Admin = require('./adminModel'); 
const Survey = require('./surveyModel'); 

// A Sale has many SaleItems, a SaleItem belongs to one Sale
Sale.hasMany(SaleItem, { foreignKey: 'id_sale', onDelete: 'CASCADE' });
SaleItem.belongsTo(Sale, { foreignKey: 'id_sale' });

// A Product has many SaleItems, a SaleItem belongs to one Product
Product.hasMany(SaleItem, { foreignKey: 'id_product', onDelete: 'RESTRICT' });
SaleItem.belongsTo(Product, { foreignKey: 'id_product' });

// A Product can be in many Carts, a Cart belongs to one Product
Product.hasMany(Cart, { foreignKey: 'id_product' });
Cart.belongsTo(Product, { foreignKey: 'id_product' });

module.exports = { Product, Sale, SaleItem, Cart, Admin, Survey };