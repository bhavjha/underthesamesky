import './Elements.css';
import { MdLocationOn, MdOutlineContentCopy, MdOutlineStickyNote2, MdOutlineModeEditOutline } from "react-icons/md";
import {IconContext} from "react-icons";

import UploadImage from './UploadImage.js';
import Note from './Note.js';
import {useState} from "react"

import storage from "./firebaseConfig.js"
import {getStorage, ref, getMetadata, updateMetadata} from "firebase/storage"

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

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const RandomlyPositionedModal = styled(Modal)`
  position: fixed;
  width: 600px;
  z-index: 1040;
  top: ${() => 30 }%;
  left: ${() => 35}%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 40px;
  opacity: 0.8;

`;


let skyURL ="";
// let skyNotes={};
let currentNote= "";

function handleNoteUpload() {

    //TODO 
    //COULD REWRITE METADATA NOW - BUT SHOWS ERROR IN UPDATE 

    // console.log("adding note?");
    // let skynote = document.getElementById('sky-note').value;
    // skyNotes[skyURL] = skynote;

    // const storage = getStorage();
 
    // const url = new URL(skyURL);
    // console.log(url.href,"---",
    //     url.protocol,"---",
    //     url.username,"---",
    //     url.password,"---",
    //     url.host,"---",
    //     url.hostname,"---",
    //     url.port,"---",
    //     url.pathname,"---SEEEEE ->", url.pathname.split("2F")[1],"--------",
    //     url.search,"---",
    //     url.hash,);

    // let skyRefLocation = 'files/'+url.pathname.split("2F")[1]; 
    // const skyRef = ref(storage, skyRefLocation);
    // // const skyRef = ref(storage, 'images/forest.jpg');

    // var myCustomMetadata = {
    //     customMetadata : {
    //      'skyNotes': skyNotes
    //      }
    //    }

    //           // Update metadata properties
    //         updateMetadata(skyRef, myCustomMetadata)
    //         .then((myCustomMetadata) => {
    //           // Updated metadata for 'images/IMG_1.jpg' is returned in the Promise
    //           console.log("metadata updated =", myCustomMetadata);
    //         }).catch((error) => {
    //           // Uh-oh, an error occurred!
    //           console.log("metadata error in updating add-note");
    //         });


}


function changeSky() {

// function randomIntFromInterval(min, max) { // min and max included 
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

    let rand = Math.floor(Math.random()*9 + 1);
    skyURL = `https://firebasestorage.googleapis.com/v0/b/underthesamesky-1c1bd.appspot.com/o/files%2FIMG_${rand}.jpeg?alt=media&token=c14b5f1d-63bd-48e9-be95-15a94de0477a`
    console.log("new sky number = ", rand);

    document.getElementById('App').style.backgroundImage=`url(${skyURL})`; // specify the image path here

    //add notes to metadata and view that - maybe call this crowdsourced decsription of the sky? accessibility idea


    //Alternate method to access metadata
    // let storage = Storage.storage()
    // let yourFirestoreURL = "https://firebasestorage.googleapis.com/v0/b/art-track.appspot.com/o/images%2Fu1nffdGQ7QPLIMp7N11vSOYorUM2%2FCapture.JPG?alt=media&token=86081f67-9065-4a13-aa0b-14fab7d44bf3"
    // let storageRef = storage.reference(forURL: yourFirestoreURL)
    // print(storageRef.name)

    // Create a reference to the file whose metadata we want to retrieve
    const storage = getStorage();
    const skyRef = ref(storage, `files/IMG_${rand}.jpeg`);
    
    // Get metadata properties
    getMetadata(skyRef)
      .then((metadata) => {
        // Metadata now contains the metadata for 'images/sky.jpg'
        //console.log("metadata of this sky is -", metadata.customMetadata.location);
        document.getElementById('sky-location').innerText = metadata.customMetadata.location;
        //document.getElementById('citylocationalt').alt=metadata.customMetadata.alt;

        //TODO - ADD METADATA DESCRIPTION TO NOTES - EACH PERSON PUTS THEIR STORY AND SKY. NO CROWD SOURCE
        //document.getElementById('view-note-text').innerText = metadata.customMetadata.alt;
        currentNote = metadata.customMetadata.alt;
        //console.log("current note text after getting metadata in element.js = ", currentNote);


      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("ERROR! metadata of this sky is not there?");
        document.getElementById('sky-location').innerText = "Find it yourself :P";
        currentNote = "They did not talk about this sky :/";
      });

    
}

function displayNotes() {
//display all notes - add modal 
}


function Elements() {

     //MODAL RELATED
     const [show, setShow] = useState(false);
     const renderBackdrop = (props) => <Backdrop {...props} />;
 
     const [data, setData] = useState('');
     const elementToNote = () => {
       setData(currentNote);
       //console.log("set data to current note to send to child =", currentNote);
     }

    return (
      <>
      <header>
      <div className='topnav'>
        <div className='title-location'>
          <div>
          <h2 className="website-title">Under The Same Sky</h2>
          <hr/> 
          </div> 
          <div className='location'>
            <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(255,255,255)"}}}>
            <div id='location-icon'>
                <MdLocationOn />
            </div>
            </IconContext.Provider>
            <p className="website-text" id="sky-location">Los Angeles, California</p>
          </div>
        </div>
        <div className='title-add-sky'>
            <UploadImage /> 
        </div>
      </div> 
      </header>

      <div className='midnav'>

        <div className="side-nav add-sky-note" onClick={() => elementToNote()}> 
        {/* onClick={displayNotes} */}
            <Note elementToNote={data}/>
        </div>


        <div className="tooltip side-nav add-sky-note" onClick={() => {navigator.clipboard.writeText(skyURL); alert("Link to sky copied to clipboard")}}>
            <span className="icon-tooltiptext">Copy link</span>
            <IconContext.Provider value={{ style: {fontSize: '50px', color: "rgb(255,255,255)"}}}>
            <div id='copy-link-icon'>
                <MdOutlineContentCopy />
            </div>
            </IconContext.Provider>
        </div>
{/* 

            <div className="tooltip side-nav add-sky-note" onClick={() => setShow(true)}>
                <span className="icon-tooltiptext">Add your note to this sky!</span>
                <IconContext.Provider value={{ style: {fontSize: '50px', color: "rgb(255,255,255)"}}}>
                <div id='add-sky-note-icon'>
                    <MdOutlineModeEditOutline />
                </div>
                </IconContext.Provider>
            </div>
            <div className="add-sky-note-modal">
                <RandomlyPositionedModal
                        show={show}
                        onHide={() => setShow(false)}
                        renderBackdrop={renderBackdrop}
                        aria-labelledby="modal-label"
                    >
                    <div>

                        <label htmlFor="sky-note" className='modal-text' >Describe this sky, tell us what you think</label>
                        <input type="text" id="sky-note" name="sky-note" className='modal-text' required></input>
                        <br></br><br></br>
                        <button className='modal-button-text upload-note-button' onClick={handleNoteUpload}>Done</button>
                        <p className='modal-text'>Press escape key to close the popup</p>
                    </div>
                    </RandomlyPositionedModal>
            </div> */}


      </div>
      <div className='bottomnav'>

        <button className='website-text' id="changeSky" onClick={changeSky}>See the next sky</button>

      </div>
      <footer>
        <p className='website-text-footer'>Made by Bhavya</p> 
      </footer>
      </>
    );
  }
  
  export default Elements;