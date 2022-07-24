import React, {useState} from 'react';
import './App.css';

function App() {
    const [value, setMessage] = useState(0);

    const handleChange = (event: any) => {
        setMessage(event.target.value);

        // fetch(`http://localhost:4567/api/move?rpm=${event.target.value}`)
    };


    let [currentDistance, setCurrent] = useState<any>(0)

  async function FrontLite(){
      let request = await fetch('http://localhost:4567/api/lamp');
      if(request.ok){
          console.log("Done!");
      }
  }
    async function HS_SR04(){
        // let request = await fetch('http://localhost:4567/api/hssr4');
        // if(request.ok){
        //     let r = await request.json();
        //     setCurrent(r.distance);
        // }else{
        //     console.log("Error");
        // }
    }
    setInterval(HS_SR04, 500);
  async function BackLite(){
      let request = await fetch('http://localhost:4567/api/backlamp');
      if(request.ok){
          console.log("Done!");
      }else{
          console.log("Error");
      }
  }
  return (
    <div className="App">
      <button onClick={FrontLite}>Front lamp</button>
        <button onClick={BackLite}>Задний свет</button>
        <div>{currentDistance}</div>
        <input id="frontbackinput" type="range" min="-1020" max="1020" step="20" value={value} onChange={handleChange}/>
        <div>{value}</div>
    </div>
  );
}

export default App;
