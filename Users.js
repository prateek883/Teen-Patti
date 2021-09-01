"use strict";

const debug = require("debug")("test");
let storeData = [];
let user = function(){
    let instance;
    let obj = {
        addUser: function(socket, room, playerID){
            debug("SocketId:" + socket.id);
            debug("roomName:" + room);
            debug("userId:" + playerID);
            storeData.push({
                socket : socket,
                room : room,
                playerID: playerID,
            });
        }, 
        removeUser: function(playerID){
            for(let i = 0; i < storeData.length; i++){
                if(storeData[i].playerID === playerID){
                    debug("removed user :" +value2.id);
                    storeData.splice(i,1);
                }
            }
        },
        showUsers: function(){
            debug("showUsers");
            debug(storeData);
        },
        findUsers: function(socketId){
            for(let i = 0; i < storeData.length; i++){
                if(storeData[i].playerID === socketId){
                    return storeData[i];
                    break;
                }
            }
            return null;
        },
    };

    if(!instance){
        
    }
}