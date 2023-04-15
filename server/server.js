import {WebSocketServer} from 'ws';


//Create websocket server
const wsServer = new WebSocketServer({ port: 8080 });
console.log("Websocket server started on port 8080");

var hosts = {};
var clients = {};


wsServer.on('connection', (ws) => {

    console.log("NEW CONNECTION FROM " + ws);

    //On message from client
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        
        //TODO Retype code to use switch statement

        switch (message.type) {
            case "offer":
                //Store offer
                hosts[message.id] = ws;
                ws.offer = message.offer;
                console.log("OFFER RECEIVED from " + message.id);
                break;
            case "answer":
                //Send answer to host

                hosts[message.id].send(JSON.stringify({
                    type: 'answer',
                    answer: message.answer
                }));

                console.log("ANSWER RECEIVED from " + message.id);
                break;
            case "requestOffer":
                clients[message.id] = ws;
                //Send offer to client
                clients[message.id].send(JSON.stringify({
                    type: 'offer',
                    offer: hosts[message.id].offer
                }));
                console.log("REQUEST OFFER RECEIVED from " + message.id);
                break;
            case "candidate":
                //TODO Do not send candidate to client if the candidate is from the client
                if (ws === clients[message.id]) {
                    hosts[message.id].send(JSON.stringify({
                        type: 'candidate',
                        candidate: message.candidate
                    }));
                    console.log("CANDIDATE RECEIVED from " + message.id + " sent to host " + hosts[message.id].id);
                } else {
                    clients[message.id].send(JSON.stringify({
                        type: 'candidate',
                        candidate: message.candidate
                    }));
                    console.log("CANDIDATE RECEIVED from " + message.id + " sent to client " + clients[message.id].id);
                }
                break;
            default:
                break;
        }
    });

    ws.onclose = function() {
        //Check if client or host
        if (ws === hosts[ws.id]) {
            //Delete host
            delete hosts[ws.id];
            console.log("Host " + ws.id + " disconnected");
        }
        if (ws === clients[ws.id]) {
            //Delete client
            delete clients[ws.id];
            console.log("Client " + ws.id + " disconnected");
        }
    }
});

