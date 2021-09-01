"use strict";

const debug = require('debug')("test");
const user = require('./User');

function JoinRoom(tempUserQ, players, roomName){
    let pawnsInfoQ = [];
    return new Promise((resolve, reject) => {
        for(let i = 0; i < players.length; i++){
            user().addUser(tempUserQ[i].socket,
                roomName,
                tempUserQ[i].playerId)
        };

        let temp = {
            socket: tempUserQ[i].socket,
            roomName: roomName,
        }
        pawnsInfoQ.push(temp);
        tempUserQ[i].socket.join(roomName,  ()=>{
            debug(
                `user ${tempUserQ[i].socket.id} joined room ${roomName} of pawn type`
            );
        });

        resolve({ userSocketObj: pawnsInfoQ.concat(), roomName: roomName });
    });
}

module.exports = JoinRoom;