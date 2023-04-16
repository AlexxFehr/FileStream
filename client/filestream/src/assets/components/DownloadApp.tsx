import React from "react";
import { Form, Button } from "react-bootstrap";

export default function DownloadApp() {

    const [state, setState] = React.useState({
        downloading : false,
        downloadProgress : 0,
        downloadSpeed: 0,
        eta: 0,
        id: new URLSearchParams(window.location.search).get("file"),
        filename: "Unknown File"
    });

    async function handleSubmit() {}

    return (
        <div className="main-app">
            <h2>📄 : {state.filename}</h2>

            {
                state.downloading ? (
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Downloading your file...</h4>
                        <p> Progressbar </p> 
                        <hr/>
                        <p className="mb-0">Current Speed : {state.downloadSpeed} kbit/s - ETA: {state.eta}s</p>
                    </div>
                ) : null 
            }
            <Button type="submit" id="submitButton" onClick={handleSubmit}>Download ⬇️</Button>
         </div>
    )
}
