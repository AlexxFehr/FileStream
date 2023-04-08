import {WebSocketServer} from 'ws';

/*
    * User submits file
    * Connects to websocket server and sends offer and filename
    * Websocket server sends link with room id back to user
    * User awaits answer
    * When second user connects to link, they are sent the offer and filename
    * Second user sends answer to websocket server
    * Websocket server sends answer to first user
    * When answer is sent the room is deleted
*/

//Create websocket server
const wsServer = new WebSocketServer({ port: 8080 });


wsServer.on('connection', (ws) => {
    ws.id = wsServer.getUniqueID();
    console.log('Client connected, assigning id:' , ws.id);

    //On message from client
    ws.on('message', (data) => {
        const message = JSON.parse(data);

        if (message.type === 'offer') {
            console.log(message.sdp);
        }

        else if (message.type === 'answer') {
            //Add answer to room
        }

        else if (message.type === "request") {
            //Request offer from first user


            
        }

    });
});

wsServer.getUniqueID = () => {
    var s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + '-' + s4();
}