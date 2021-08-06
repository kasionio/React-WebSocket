import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './index.css';

let dataX = [];
let dataY = [];
dataX.length = 5; //X-axis length
dataY.length = dataX.length; 

export function Chart({ data }) {
  let data1, data2;
    useEffect(() => {
        
        if (data.dataFromServer) {
        if(data.dataFromServer[0].data <= 100) {
        data1 = data.dataFromServer[0].data;
        }
        if(data.dataFromServer[1].data <= 100) {
        data2 = data.dataFromServer[1].data;
        }
        }
        if(data1 !== undefined && data2 !== undefined) {
        dataX.push(data1);
        dataX.shift();
        dataY.push(data2);
        dataY.shift();
        console.log(dataX, dataY)
        }
    }, [data]
    )

    return (
    <div className={styles.chart}>
        {console.log(data1)}
        CHART OF DATA
        <Line options = {{
            animations: false
            }}
            data={{
        labels: dataX,
        datasets: [{
            label: ['Data1'],
           
            
            data: dataX,
            backgroundColor: [
                'lightgrey'
            ],
            borderColor: [
                'lightgrey'
            ],
            borderWidth: 2
        },
        {
            label: ['Data2'],
            
            data: dataY,
            backgroundColor: [
                '#000'
            ],
            borderColor: [
                '#000'
            ],
            borderWidth: 2
        }
        ]
       
    
    }} />
    
    </div>
        )
}