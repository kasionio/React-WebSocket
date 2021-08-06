import './App.css';
import React, { useEffect, useState } from 'react';
import { TemperatureData } from './TemperatureData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart } from './Chart';

const dataStorage = [];
dataStorage.length = 1500;

function App() {

  const {} = dataStorage;

  const [data, setData] = useState({});
  const [disconnect, setdisconnect] = useState(true);

  useEffect(() => {
    if (data.dataFromServer) {
      dataStorage.shift();
      dataStorage.push(data.dataFromServer);
    }
    }, [data])

   useEffect(() => {
    let ws = new WebSocket('ws://localhost:8999');
    ws.onopen = () => showToastConnection();

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      setData({dataFromServer: message})
      console.log(message)
      }

    ws.onclose = () => {
      setdisconnect(false);
      showToastDissconection(); 
      console.log('Socket is Disconnected');
      console.log('Data of the last 5 minutes: ', dataStorage);
        }
  }, [setData]);


  const showToastDissconection = () =>
  toast.warn('Disconnected', {
    backgroundColor: '#000000',
    color: '#ffffff',
    position: 'bottom-right'
  });

  const showToastConnection = () =>
  toast.success('Connected', {
    backgroundColor: 'red',
    color: '#ffffff',
    position: 'bottom-right'
  })

  return (
  <div className="App">
    <header>
     WILLIOT TEST
    </header>
    <TemperatureData data = {data} />
    <Chart data={data} />
    <ToastContainer />
  </div>
)
    
}
export default App;