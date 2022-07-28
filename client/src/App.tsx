import React, {useState} from 'react';
import './App.css';

function App() {
    const [value, setMessage] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [rotationText, setText] = useState("STOP");

    const handleChange = (event: any) => {
        setMessage(event.target.value);

        fetch(`http://192.168.0.112:4567/api/move?rpm=${event.target.value}`).catch((err: any) => console.log(err));
    };
    const handleRotateChange = (event: any) => {
        setRotation(event.target.value);

        switch (event.target.value){
            case "-1":
                setText("LEFT");
                fetch(`http://192.168.0.112:4567/api/rotate?rotation=RIGHT`).catch((err: any) => console.log(err));
                break;
            case "0":
                setText("STOP");
                fetch(`http://192.168.0.112:4567/api/rotate?rotation=STOP`).catch((err: any) => console.log(err));
                break;
            case "1":
                setText("RIGHT");
                fetch(`http://192.168.0.112:4567/api/rotate?rotation=LEFT`).catch((err: any) => console.log(err));
                break;
        }

    };


    let [currentDistance, setCurrent] = useState<any>(0)

  async function FrontLite(){
      let request = await fetch('http://192.168.0.112:4567/api/lamp');
      if(request.ok){
          console.log("Done!");
      }
  }
    async function HS_SR04(){
        let request = await fetch('http://192.168.0.112:4567/api/hssr4');
        if(request.ok){
            let r = await request.json();
            setCurrent(r.distance);
        }else{
            console.log("Error");
        }
    }
    setInterval(HS_SR04, 500);
  async function BackLite(){
      let request = await fetch('http://192.168.0.112:4567/api/backlamp');
      if(request.ok){
          console.log("Done!");
      }else{
          console.log("Error");
      }
  }
  return (
    <div className="App">
        <button className="but font" onClick={FrontLite}>передняя фара</button>

        <div className="font">DISTANCE: {currentDistance}</div>
        <input className="input font" id="move" type="range" min="-250" max="250" step="50" value={value} onChange={handleChange}/>
        <div id="moveText" className="font">SPEED: {value}</div>
        <input className="input font" id="rotate" type="range" min="-1" max="1" step="0" value={rotation} onChange={handleRotateChange}/>
        <div id="rotateText" className="font">ROT: {rotationText}</div>
        <div className="text font">
            <span>TEMP: </span>
            <span>*NOT SUPPORTED*</span>
        </div>
        <div className="text font">
            <span>BATTERY:</span>
            <span>*NOT SUPPORTED*</span>
        </div>
        <button className="but font" onClick={BackLite}>Задняя фара</button>
    </div>
  );
}

export default App;
