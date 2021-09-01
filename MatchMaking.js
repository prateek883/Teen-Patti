"use strict";
const debug = require("debug")("test");
const createRoom = require("./CreateRoomStart");
const clientApi = require("./Gameplay/ClientApi");
const tempTwoUserQ = new Array();
const tempFourUserQ = new Array();

const MatchMaking = function (data) {
  debug("match making started!!!!!!");

  let playersPlaying = data["players"];
  switch (playersPlaying) {
    case 2:
      MatchPlayers(data, tempTwoUserQ, 3);
      break;

    case 3:
      break;

    case 4:
      MatchPlayers(data, tempFourUserQ, 6);
      break;
  }
  PlayersMonitor(data);
};


function MatchPlayers(newPlayerInfo, respectiveTempQ, roomLimit){
    let lessPlayer = respectiveTempQ.length < roomLimit - 1 ;

    if(lessPlayer){
        respectiveTempQ.push(newPlayerInfo);
        return;
    }
    respectiveTempQ.push(newPlayerInfo);

    let matchedUserQ = [];

    for(let i = 0; i < respectiveTempQ.length; i++){
        let disconnectedPlayer = respectiveTempQ[i].socket.connected;
        if(disconnectedPlayer){
            matchedUserQ.push(respectiveTempQ[i]);

            if(matchedUserQ.length=== roomLimit){
                createRoom(matchedUserQ, roomLimit);
                respectiveTempQ.splice(0, roomLimit);
                return;
            }
        }
        debug("Match started Failed");
    }
}

function PlayersMonitor(data) {
    data["socket"].on("disconnect", () => {
        disconnectedPlayer();
    });
    data["socket"].on(clientApi.ON_QUIT, () => {
        disconnectedPlayer();
    });

    function disconnectPlayer() {
        let userDetail = {
            players: data.players,
            socket: data.socket,
        }
        debug("user" + data.socket.id + "left");
        RemoveUserFromTempQafterClientDisconnect(userDetail);
    }
}

function RemoveUserFromTempQafterClientDisconnect(userDetail) {
    switch(user.players){
        case 2: 
        for(let i = 0; i < tempTwoUserQ.length; i++) {
            if(tempTwoUserQ[i].socket.id === user.socket.id){
                tempFourUserQ.splice(1,1);
                debug(user.socket.id+ "left matchmaking");
                break;
            }
        }
        break;

        case 3:
            break;
            
        case 4:
            for(let i = 0; i < tempFourUserQ.length; i++){
                if(tempFourUserQ[i].socket.id == user.socket.id){
                    tempFourUserQ.splice(i,1);
                    debug(user.socket.id+ "left matchmaking");
                    break;
                }
            }
            break; 
    }
}

module.exports = MatchMaking;
