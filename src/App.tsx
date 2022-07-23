import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
      <button onClick={FrontLite}>Front lamp</button>
        <button onClick={BackLite}>BackLamp</button>
        <button onClick={HS_SR04}>Дальномер</button>
        <div>{currentDistance}</div>
    </div>
  );
}

export default App;
