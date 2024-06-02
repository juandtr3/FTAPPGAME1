const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let gameState = {
    currentPlayer: 'Ruperto',
    score: {'Ruperto': 100000, 'Juan': 100000, 'Mauricio': 100000},
    diamondStates: [
        {available: true, emoji: '💎'},
        {available: true, emoji: '💎'},
        {available: true, emoji: '☀️'},
        {available: true, emoji: '☀️'}
    ],
    goldBarStates: [
        {available: true, emoji: '💰'},
        {available: true, emoji: '💰'},
        {available: true, emoji: '🥇'},
        {available: true, emoji: '🥇'}
    ],
    rubyStates: [
        {available: true, emoji: '🔴'},
        {available: true, emoji: '🔴'},
        {available: true, emoji: '🍀'},
        {available: true, emoji: '🍀'}
    ],
    trophyStates: [
        {available: true, emoji: '💚'},
        {available: true, emoji: '💚'},
        {available: true, emoji: '🏆'},
        {available: true, emoji: '🏆'}
    ],
    takenRowsByPlayer: {Ruperto: [], Juan: [], Mauricio: []},
    takenCount: 0,
    timeLeft: 10,
};

// This line should come after initializing `app`
app.use(express.static('public'));
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('initialState', gameState);

    socket.on('updateState', (updatedState) => {
        gameState = updatedState;
        io.emit('stateChanged', gameState);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
