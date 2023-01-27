const express = require('express');
const routes = require('./routes')
const handlebars = require('express-handlebars')

const port = 8080
const app = express();

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

routes(app)

app.listen(port, () => {
    console.log(`corriendo con express en el puerto ${port}`)
});
