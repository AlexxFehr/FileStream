import { Nav, Navbar} from "react-bootstrap"

export default function Topbar() {

    //Simple white navbar with title in the the middle in black and a box shadow
    return (
        <Navbar bg="white" variant="light" className="shadow-sm">
            <Navbar.Brand href="#home" className="mx-auto text-dark" id="title">
                Filestream
            </Navbar.Brand>
        </Navbar>
    )
    

        
}