const express = require('express');
const app = express();
const routes = require('./routes')

const port = 8080
app.use(express.json());
app.use(express.urlencoded({extended:true}))

routes(app)

app.listen(port, () => {
    console.log(`corriendo con express en el puerto ${port}`)
});
