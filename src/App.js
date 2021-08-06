import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { TemperatureData } from "./TemperatureData";
import { ToastContainer, toast } from "react-toastify";
import { Chart } from "./Chart";
import "react-toastify/dist/ReactToastify.css";

const dataStorage = [];
dataStorage.length = 1500; // data of last 5 minutes = 5 responses per second * 60sec * 5min
window.dataStorage = dataStorage;

function App() {
    const [data, setData] = useState({});

    function connectWS() {
        let ws = new WebSocket("ws://localhost:8999");

        ws.onopen = () => {
            showToastConnection();
        };

        ws.onmessage = (evt) => {
            const data = JSON.parse(evt.data);
            setData({ dataFromServer: data });
        };

        ws.onclose = () => {
            showToastDissconection();
            console.log(window.dataStorage)
        };
    }

    useEffect(() => {
        if (data.dataFromServer) {
            dataStorage.shift();
            dataStorage.push(data.dataFromServer);
        }
    }, [data]);

    useEffect(() => {
        connectWS();
    }, []);

    const showToastDissconection = () => {
        setTimeout(() => {
            connectWS();
        }, 7000);
        toast.warn("Disconnected", {
            position: "bottom-right",
        });
    };

    const showToastConnection = () =>
        toast.success("Connected", {
            position: "bottom-right",
        });

    return (
        <div className="App">
            <header>WILLIOT TEST</header>
            <TemperatureData data={data} />
            <Chart data={data} />
            <ToastContainer />
        </div>
    );
}
export default App;