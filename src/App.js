// import logo from './underthesamesky-default-bg.jpg';
import './App.css';
import Elements from './Elements.js';


function App() {
  return (
    <div className="App" id="App"
    style={{  
      backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/underthesamesky-1c1bd.appspot.com/o/files%2FIMG_1.jpeg?alt=media&token=c14b5f1d-63bd-48e9-be95-15a94de0477a      )`,
      // backgroundImage: `url(${logo})`,
    }}>

      <Elements />
    </div>
  );
}

export default App;
