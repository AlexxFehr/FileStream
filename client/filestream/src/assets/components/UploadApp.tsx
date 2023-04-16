import React from "react";
import { Form, Button } from "react-bootstrap";

export default function UploadApp() {

    const [state, setState] = React.useState({
        linkGenereated : false,
        id: new URLSearchParams(window.location.search).get("file")
    });

    async function handleSubmit() {
    }

    return (
        <div className="main-app">
            <Form.Control type="file" id="fileInput" />

            {
                state.linkGenereated ? (
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Link creation successful!</h4>
                        <p>The file is now available at <a href={window.location.href + "?file=" + state.id}>{window.location.href + "?file=" + state.id} </a> </p> 
                        <hr/>
                        <p className="mb-0">Please note that you have to stay on this page until the file has been fully downloaded!</p>
                    </div>
                ) : null 
            }
            <Button type="submit" id="submitButton" onClick={handleSubmit}>Upload ⬆️</Button>
        </div>
    )
}
