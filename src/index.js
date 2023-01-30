const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config()

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

routes(app)

app.listen(port, () => {
    console.log(`corriendo con express en el puerto ${port}`)
});
