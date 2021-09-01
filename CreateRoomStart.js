"use strict";
const JoinRoom = require('./JoinRoom');
const debug = require('debug')('test');
// const startGame = require('./GamePlay/GameLogic');

async function CreateRoom(tempUserQ, roomLimit){
    let players = roomLimit;
    let roomName = shortId.generate();
    let data = await JoinRoom(tempUserQ, roomLimit, roomName);
    let allPlayersId = [];
    let socketDictionary = {};
    let profiles = {};
    for(let i = 0; i < tempUserQ.length; i++){
        allPlayersId.push(tempUserQ[i].playerID);
        socketDictionary[tempUserQ[i].playerID] = tempUserQ[i].socket;
        profiles[tempUserQ[i].playerID] = tempUserQ[i].profile;
    }

    let playerData = {
        userSocketObj: data["userSocketObj"],
        roomName: data["roomName"],
        allPlayersId,
        socketDictionary,
        profiles,
    };
    startGame(playerData);
}


module.exports = CreateRoom;