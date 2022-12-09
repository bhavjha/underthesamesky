import './Elements.css';
import {  MdOutlineStickyNote2, MdClose } from "react-icons/md";
import {IconContext} from "react-icons";

import {useState} from "react"

import Modal from 'react-overlays/Modal'

import styled from 'styled-components'


const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

const RandomlyPositionedModal = styled(Modal)`
  position: fixed;
  width: 600px;
  z-index: 1040;
  top: ${() => 30 }%;
  left: ${() => 35}%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 40px;
  opacity: 0.8;
`;

function Note({elementToNote}) {
    //MODAL RELATED
    const [show, setShow] = useState(false);
    const renderBackdrop = (props) => <Backdrop {...props} />;

    //console.log("element to note in Note:", {elementToNote});

    return(
        <div className="tooltip add-sky-note-modal" onClick={() => setShow(true)}>
            <div className="">
                <RandomlyPositionedModal
                        show={show}
                        onHide={() => setShow(false)}
                        renderBackdrop={renderBackdrop}
                        aria-labelledby="modal-label"
                    >
                    <div>
                        {/* <IconContext.Provider value={{ style: {fontSize: '50px', color: "#5d5d5dc0"}}}>
                        <div onClick={() => setShow(false)}>
                            <MdClose />
                        </div>
                        </IconContext.Provider> */}
                        <p className='view-note-text modal-text' id='view-note-text'>{elementToNote}</p>
                        <br></br>
                        <p className='modal-text'>(Press escape key to close the popup)</p>
                    </div>
                    </RandomlyPositionedModal>
            </div>
        <br></br>
            <div>
                <span className="icon-tooltiptext">View notes</span>
                <IconContext.Provider value={{ style: {fontSize: '60px', color: "rgb(255,255,255)"}}}>
                <div id='sky-note-icon' alt-text='view note about this sky picture'>
                    <MdOutlineStickyNote2 />
                </div>
                </IconContext.Provider>
            </div>
            
        </div>
    )
}

export default Note;