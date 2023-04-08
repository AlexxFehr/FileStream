import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

let peerConnection: RTCPeerConnection;
let signalingSocket: WebSocket;

export default function InputCard() {
  const queryParameters = new URLSearchParams(window.location.search);

  if (queryParameters.has("file")) {
    //TODO Get offer from server using file id from query parameters, and post answer to server
  }

  async function handleSubmit() {

    //If signaling socket is not defined, create it
    if (!signalingSocket) {
      signalingSocket = new WebSocket("ws://localhost:8080");
    }


    //Check if query parameters contain file
    if (queryParameters.has("file")) {
      //TODO Send request to get offer
      //TODO Create answer and send to server
    } else {

      //On connection with signaling server
      signalingSocket.onopen = async () => {
        signalingSocket.onmessage = async (data) => {
          //Parse message
          const message = JSON.parse(data.data);

          if(message.type === "request") {
            createPeerConnection();

            peerConnection.onicecandidate = async (event) => {
              if (event.candidate) {
                //Send offer to server
                signalingSocket.send(JSON.stringify({
                  type: "offer",
                  sdp: peerConnection.localDescription,
                }));
              }
            }

            //Create offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
          }

          if(data.type === "answer") {
            //TODO Set remote description to answer
          }

        };
      };
    }
  }

  return (
    <div className="input-card">
      {
        //Check if query parameters contain file
        queryParameters.has("file") ? (
          <h2>📄 : File.txt</h2>
        ) : (
          <Form.Control type="file" id="fileInput" />
        )
      }
      <Button type="submit" id="submitButton" onClick={handleSubmit}>
        {queryParameters.has("file") ? "Download ⬇️" : "Upload ⬆️"}
      </Button>
    </div>
  );
}

const createPeerConnection = () => {
  //Create peer connection using Google's public STUN server
  peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  });

  const dataChannel = peerConnection.createDataChannel("dataChannel");
};
