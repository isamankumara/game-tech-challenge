const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const users = {};
var waitingUser = "";
const groupUsers = [];

io.use((socket, next) => {
    next();
});


const removeUserFromGame = (socket) => {
    if (waitingUser == socket.id) {
        waitingUser = "";
    } else {
        var objectIndex = groupUsers.findIndex((value) => { return (value.userOne == socket.id || value.userTwo == socket.id) })
        //console.log(groupUsers, objectIndex)
        if (objectIndex != -1) {
            var object = groupUsers[objectIndex];
            if (object.userOne == socket.id) {
                waitingUser = object.userTwo;
                groupUsers.splice(objectIndex, 1);

            } else if (object.userTwo == socket.id) {
                waitingUser = object.userOne;
                groupUsers.splice(objectIndex, 1);
            }
            socket.to(waitingUser).emit('send events', { event: 3 })
        }
    }
}

global.users = users;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    global.users[socket.id] = undefined;
    /*
    if (waitingUser != "") {
        groupUsers.push({ userOne: socket.id, userTwo: waitingUser });
        socket.to(waitingUser).emit('chat message', "ok");
        waitingUser = "";
    } else {
        waitingUser = socket.id;
    }*/

    socket.on("disconnect", () => {
        console.log("disconnect", socket.id, waitingUser);
        delete global.users["" + socket.id];

        removeUserFromGame(socket);
        console.log(waitingUser, groupUsers);
    });

    socket.on("send events", (param, callback) => {
        console.log("event", param.event, socket.id)

        if (param.event == 1) {
            if (waitingUser != "") {
                groupUsers.push({ userOne: socket.id, userTwo: waitingUser });
                socket.to(waitingUser).emit('send events', { event: 4 })
                waitingUser = "";
                callback({ event: 5 });
            } else {
                waitingUser = socket.id;
                callback({ event: 3 })
            }
        } else if (param.event == 2) {
            removeUserFromGame(socket);
        } else if (param.event == 6) {
            console.log(param);
            var objectIndex = groupUsers.findIndex((value) => { return (value.userOne == socket.id || value.userTwo == socket.id) })
            if (objectIndex != -1) {
                var object = groupUsers[objectIndex];

                if (object.userOne == socket.id) {

                } if (object.userOne == socket.id) {

                }
                socket.to(object.userOne).emit('pass option', { event: 7, payload: param.payload });
                socket.to(object.userTwo).emit('pass option', { event: 7, payload: param.payload });
            }
        }
    });
});
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});