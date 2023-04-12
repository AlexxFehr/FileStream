import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './assets/components/App'

let peerConnection : RTCPeerConnection;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)