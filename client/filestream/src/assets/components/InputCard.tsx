import React, { ChangeEvent, SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";

let peerConnection: RTCPeerConnection;

export default function InputCard() {
  const [formData, setFormData] = React.useState({
    sdp: "",
  });

  async function handleSubmit() {
    let answer = JSON.parse(formData.sdp);

    addAnswer(answer);
  }

  function handleFormChange(event: any) {
    setFormData((pFormData) => {
      return {
        ...pFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div className="input-card">
      <div className="input-group">
        <input
          type="text"
          placeholder="Link"
          className="form-control"
          name="sdp"
          onChange={handleFormChange}
        />
      </div>
      <div className="submit-button">
        <Button onClick={handleSubmit}>Upload</Button>
      </div>
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
    
        console.log(JSON.stringify(peerConnection.localDescription));

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
