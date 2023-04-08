import ws from 'ws';

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