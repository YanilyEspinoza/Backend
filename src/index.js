const express = require('express');
const routes = require('./routes');
const path = require('path');
const handlebars = require('express-handlebars')
const { Server } = require('socket.io');
const { Socket } = require('engine.io');

const port1 = 8080
const port2 = 8081

const app = express();
const httpServer = app.listen(port2, ()=> console.log(`corriendo en el puerto ${port2}`));
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

routes(app)

app.listen(port1, () => {
    console.log(`corriendo con express en el puerto ${port1}`)
});

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado')
    const id = socket.id

    socket.on('message', data =>{
        console.log(data + ` from ${id}`);
    })
})