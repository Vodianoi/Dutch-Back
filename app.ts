import express from 'express';

const app = express();
import {createServer} from 'node:http';
import router from './routes/gameRoutes';
import {Server} from 'socket.io';
import {Player} from './models/player';
import {LocalStorage} from 'node-localstorage';

const server = createServer(app);
const io = new Server(server);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use('/api', router);




function start() {
    const localStorage = new LocalStorage('./scratch');


    io.on('connection', (socket) => {
        const player = new Player(socket.id);

        const ipAddress = socket.handshake.address;

        //store player id in local storage
        // localStorage.setItem(ipAddress, player.id);

        console.log(`${ipAddress} a user connected`);
        socket.on('chat message', (msg) => {
            const player = localStorage.getItem(ipAddress) ?? ipAddress;
            io.emit('chat message', player  + ': ' + msg, socket.id);
        });

        socket.on('disconnect', () => {
            console.log(`${ipAddress} user disconnected`);
        });

        socket.on('player name', (name) => {
            console.log(name);
            player.name = name;
            localStorage.setItem(ipAddress, player.name);
        })
    });


    server.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });


}


export {app, start};


