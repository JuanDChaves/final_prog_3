const express = require('express');
const sequelize = require('./config/database');
require('./models/user');
const app = express();
const productsRouter = require('./routes/productsRouter.js')
//const salesRouter = require('./routes/sales.js')
const cartsRouter = require('./routes/cartRouter.js')
//const salesItemsRouter = require('./routes/productsRouter.js')


const PORT = 3000;

app.use(express.json());

// Your routes here
app.get('/', (req, res) => res.send('Holainas!'));
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


sequelize.sync({ force: false })
    .then(() => console.log("Tables Synced"))
    .catch(err => console.log("Error", err));