import {WebSocketServer} from 'ws';

/*
    -Client requests offer using id
    -
*/

//Create websocket server
const wsServer = new WebSocketServer({ port: 8080 });

var hosts = {};
var clients = {};


wsServer.on('connection', (ws) => {

    //On message from client
    ws.on('message', (data) => {
        const message = JSON.parse(data);

        console.log(message);
        

        if(message.type === 'offer') {
            //Store offer
            console.log("Host received");
            hosts[message.id] = ws;
            ws.offer = message.offer;

        } else if(message.type === 'answer') {
            //Store answer
            ws.answer = message.answer;

            //Send answer to host
            hosts[message.id].send(JSON.stringify({
                type: 'answer',
                answer: message.answer
            }));

        } else if(message.type === "requestOffer") {
            clients[message.id] = ws;
            console.log("Client received");
            //Send offer to client
            clients[message.id].send(JSON.stringify({
                type: 'offer',
                offer: hosts[message.id].offer
            }));
        } else if (message.type === "candidate") {
            //Send candidate to host
            hosts[message.id].send(JSON.stringify({
                type: 'candidate',
                candidate: message.candidate
            }));
            //Send candidate to client
            clients[message.id].send(JSON.stringify({
                type: 'candidate',
                candidate: message.candidate
            }));
            
        }

    });
});

