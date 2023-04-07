import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './assets/components/App'

let peerConnection : RTCPeerConnection;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


//Create SDP offer
const createOffer = async () => {

  //Create peer connection using Google's public STUN server
  peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  //Create SDP offer which is sent to the server
  const offer = await peerConnection.createOffer();
  //Set local description
  await peerConnection.setLocalDescription(offer);


  console.log("Offer: ", offer);
}