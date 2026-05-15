require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const app = express();
const session = require('express-session');

const productsRouter = require('./routes/productRouter.js')
const adminsRouter = require('./routes/adminRouter.js')
const salesRouter = require('./routes/saleRouter.js')
const cartsRouter = require('./routes/cartRouter.js')
const saleItemsRouter = require('./routes/saleItemRouter.js')
const surveysRouter = require('./routes/surveyRouter.js')

require("./models/index.js");

const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora 
}));

app.get('/', (req, res) => res.send('Holainas!'));
app.use('/admins', adminsRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/sales', salesRouter);
app.use('/sale-items', saleItemsRouter);
app.use('/surveys', surveysRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


sequelize.sync({ force: false })
    .then(() => console.log("Tables Synced"))
    .catch(err => console.log("Error", err));