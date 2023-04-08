import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

let peerConnection: RTCPeerConnection;

export default function InputCard() {

  const queryParameters = new URLSearchParams(window.location.search);

  if(queryParameters.has("file")) {
    //TODO Get offer from server using file id from query parameters, and post answer to server
  }
  

  async function handleSubmit() {
    //Check if query parameters contain file
    if (queryParameters.has("file")) {
      //TODO Download file
    } else {
      //TODO Check if file is selected
      //TODO Create offer and send to server
      createOffer();
    }
  }

  return (
    <div className="input-card">

      {
        //Check if query parameters contain file
        queryParameters.has("file") ? (
          <h2>📄 : File.txt</h2>
        )
         : (
          <Form.Control type="file" id="fileInput" />
        )

      }
     <Button type="submit" id="submitButton" onSubmit={handleSubmit}>
        {
          queryParameters.has("file") ? "Download ⬇️" : "Upload ⬆️"
        }
      </Button>
    </div>
  );
}

const createPeerConnection = () => {

    //Create peer connection using Google's public STUN server
    peerConnection = new RTCPeerConnection({
        iceServers:[{
            urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
        }]
    });

};

//Create SDP offer
const createOffer = async () => {

    createPeerConnection();

    const dataChannel = peerConnection.createDataChannel("dataChannel");

    peerConnection.onicecandidate = async (event) => {
    
        console.log(peerConnection.localDescription);

        //TODO Send SDP offer to server and create room with link and filename, then send link to user
    };

    //Create SDP offer which is sent to the server
    const offer = await peerConnection.createOffer();
    //Set local description
    await peerConnection.setLocalDescription(offer);

};

//Create SDP answer
const createAnswer = async (offer: RTCSessionDescription) => {

    createPeerConnection();
    
    const dataChannel = peerConnection.createDataChannel("dataChannel");
    
    peerConnection.onicecandidate = async (event) => {
        console.log(JSON.stringify(peerConnection.localDescription));
        //TODO Send SDP answer to server and to inital client
    };

    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
}

const addAnswer = async (answer: RTCSessionDescriptionInit) => {
  //Set remote description
  await peerConnection.setRemoteDescription(answer);

  console.log("Answer added");
};
