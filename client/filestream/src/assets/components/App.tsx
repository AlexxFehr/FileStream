import { useState } from 'react'

import DownloadApp from './DownloadApp'
import UploadApp from './UploadApp'
import "bootstrap/dist/css/bootstrap.min.css"

import "../css/InputCard.css"
import Topbar from './TopBar'
import Footer from './Footer'


export default function App() {


  const [state, setState] = useState({
    upload: new URLSearchParams(window.location.search).has("file") ? false : true
  })



  return (
    <div className="App">
      <Topbar />

      {
        //If upload is true, show upload card, else show download card
        state.upload ? <UploadApp /> : <DownloadApp />
      }

      <Footer />
    </div>
  )
}

