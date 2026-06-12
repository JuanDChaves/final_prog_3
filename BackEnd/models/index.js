const Product = require('./productModel');
const Sale = require('./saleModel');
const SaleItem = require('./saleItemModel');
const Admin = require('./adminModel'); 
const Survey = require('./surveyModel'); 
const Log = require('./logModel');

// A Sale has many SaleItems, a SaleItem belongs to one Sale
Sale.hasMany(SaleItem, { foreignKey: 'id_sale', onDelete: 'CASCADE' });
SaleItem.belongsTo(Sale, { foreignKey: 'id_sale' });

// A Product has many SaleItems, a SaleItem belongs to one Product
Product.hasMany(SaleItem, { foreignKey: 'id_product', onDelete: 'RESTRICT' });
SaleItem.belongsTo(Product, { foreignKey: 'id_product' });

Sale.hasOne(Survey, { foreignKey: 'id_sale', onDelete: 'RESTRICT' });
Survey.belongsTo(Sale, { foreignKey: 'id_sale' });

Admin.hasMany(Log, { foreignKey: 'id_admin', onDelete: 'RESTRICT' });
Log.belongsTo(Admin, { foreignKey: 'id_admin' });


module.exports = { Product, Sale, SaleItem, Admin, Survey, Log };