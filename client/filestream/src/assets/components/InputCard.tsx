import Button from "react-bootstrap/Button";
import { Alert, Form } from "react-bootstrap";
import React from "react";

let peerConnection: RTCPeerConnection;
let signalingSocket: WebSocket;
const iceServers = [
  {
    urls: [
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302",
    ],
  },
];

export default function InputCard() {
  const queryParameters = new URLSearchParams(window.location.search);

  //Init state
  const [state, setState] = React.useState({
    linkGenereated : false,
    downloading : true,
    downloadProgress : 0,
    id: new URLSearchParams(window.location.search).get("file")
  }); 


  if (!signalingSocket) {
    signalingSocket = new WebSocket("ws://localhost:8080");
    peerConnection = new RTCPeerConnection({ iceServers });

    signalingSocket.onmessage = async (data) => {
      console.log(JSON.parse(data.data));
      switch (JSON.parse(data.data).type) {
        case "offer":
          console.log("Offer received");
          peerConnection.setRemoteDescription(
            new RTCSessionDescription({
              type: "offer",
              sdp: JSON.parse(data.data).offer,
            })
          );

          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer).then(() => {
            signalingSocket.send(
              JSON.stringify({
                type: "answer",
                answer: answer.sdp,
                id: state.id,
              })
            );
          });

          break;
        case "answer":
          console.log("Answer received");
          peerConnection.setRemoteDescription(
            new RTCSessionDescription({
              type: "answer",
              sdp: JSON.parse(data.data).answer,
            })
          );
          break;

        case "candidate":

          peerConnection.addIceCandidate(
            new RTCIceCandidate(JSON.parse(data.data).candidate)
          ).then(() => {
            console.log("Candidate added");
          });
          break;
      }

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          signalingSocket.send(
            JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
              id: state.id,
            })
          );
        }
      };
    };
  }

  async function handleSubmit() {
    //If signaling socket is not defined, create it

    const dataChannel = peerConnection.createDataChannel("dataChannel");

    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannel.onmessage = (event) => {
        console.log(event.data);
      };
    };


    if (queryParameters.has("file")) {
      //Request offer from server

      setState((stateData) => {
        return {
          ...stateData,
          id : new URLSearchParams(window.location.search).get("file")
        }
      });
      signalingSocket.send(
        JSON.stringify({
          type: "requestOffer",
          id: state.id,
        })
      );
    } else {
      //Create offer

      setState((stateData) => {
        return {
          ...stateData,
          id : getUniqueID()
        }
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer).then(() => {
        signalingSocket.send(
          JSON.stringify({
            type: "offer",
            offer: offer.sdp,
            id: state.id,
          })
        );
        setState((stateData) => {
          return {
            ...stateData,
            linkGenereated : true
          }
        });
      });
    }

    dataChannel.onopen = () => {
      dataChannel.send("Hello world");
    };
    
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


      {
       state.linkGenereated ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Link creation successfull!</h4>
          <p>The file is now available at <a href={window.location.href + "?file=" + state.id}>{window.location.href + "?file=" + state.id} </a> </p> 
          <hr/>
          <p className="mb-0">Please note that you have to stay on this page until the file has been fully downloaded!</p>
        </div>
        ) : null 
      }

      {
        queryParameters.has("file") && state.downloading ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Downloading your file...</h4>
          <p> Progressbar </p> 
          <hr/>
          <p className="mb-0">Current Speed : 433.2 kbit/s - ETA: 23 s</p>
        </div>
        ) : null 

      }


      <Button type="submit" id="submitButton" onClick={handleSubmit}>
        {queryParameters.has("file") ? "Download ⬇️" : "Upload ⬆️"}
      </Button>


    </div>
  );
}

function getUniqueID() {
  var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + "-" + s4();
}
