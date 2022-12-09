import './UploadImage.css';

import {IconContext} from "react-icons";
import { MdFileUpload } from "react-icons/md";

import {useState} from "react"

import storage from "./firebaseConfig.js"
import {ref, updateMetadata} from "firebase/storage"

import {
    uploadBytesResumable,
    getDownloadURL  
} from "firebase/storage";
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
  top: 30%;
  left: 35%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 40px;
  opacity: 0.8;

`;



function UploadImage() {

    //MODAL RELATED
    const [show, setShow] = useState(false);
    const renderBackdrop = (props) => <Backdrop {...props} />;


    //FILE UPLOAD RELATED
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);


      // Handles input change event and updates state
      function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    function handleUpload() {

        if (!file) {
            alert("Please choose a file first!")
        }

        let citylocation = document.getElementById('city-location').value;
        console.log("got location as =", citylocation);

        let citylocationalt = document.getElementById('city-location-alt').value;
        console.log("got location alt-text as =", citylocationalt);

        // Create file metadata to update
        const newMetadata = {
            customMetadata: {
                'location': citylocation,
                'alt': citylocationalt,
              }            
        };


        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file, newMetadata);
       

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("URL = ",url);
                });
            }
        ); 

           
    }

    return (
      <>
      <div className="upload-image-modal">
        <button className='add-your-sky' onClick={() => setShow(true)}>
            <IconContext.Provider value={{ style: {fontSize: '60px', color: "rgb(255,255,255)"}}}>
            <div id='upload-icon'>
                <MdFileUpload />
            </div>
            </IconContext.Provider>
            <p className="website-text">Add your sky</p>
            <div className="add-sky-modal">
                <RandomlyPositionedModal
                    show={show}
                    onHide={() => setShow(false)}
                    renderBackdrop={renderBackdrop}
                    aria-labelledby="modal-label"
                >
                <div>
                    <input type="file" className='modal-text' onChange={handleChange} accept="" />
                    <br></br><br></br>
                    <label htmlFor="city-location" className='modal-text' >Where was this photo/video taken?</label>
                    <input type="text" id="city-location" name="city-location" className='modal-text' required></input>
                    <br></br><br></br>
                    <label htmlFor="city-location-alt" className='modal-text' >Describe this sky the best you can! Tell us a joke, what were you thinking that day, anything!</label>
                    <input type="text" id="city-location-alt" name="city-location-alt" className='modal-text' required></input>
                    <br></br><br></br>
                    <button className='modal-button-text upload-to-firebase' onClick={handleUpload}>Upload my sky</button>
                    <p className='modal-text'>(Press escape key to close the popup)</p>
                </div>
                </RandomlyPositionedModal>
            </div>
        </button>


      </div>
      </>
    );
  }
  
  export default UploadImage;