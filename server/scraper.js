const express = require ('express');
const dotenv = require ('dotenv');
const morgan = require ('morgan');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());

const routes = require ('./routes.js');
app.use('/', routes);


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`listening on port ${PORT}`));