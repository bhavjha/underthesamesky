import logo from './underthesamesky-default-bg.jpg';
import './App.css';
import Elements from './Elements.js';


function App() {
  return (
    <div className="App" id="App"
    style={{  
      backgroundImage: `url(${logo})`,
    }}>

      <Elements />
    </div>
  );
}

export default App;
