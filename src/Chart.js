import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "./index.css";

let dataX = [];
let dataY = [];
dataX.length = 5; //X-axis length
dataY.length = dataX.length;

export function Chart({ data }) {
    useEffect(() => {
        if (data.dataFromServer) {
            if (data.dataFromServer[0].data <= 100) {
                dataX.push(data.dataFromServer[0].data);
                dataX.shift();
            }
            if (data.dataFromServer[1].data <= 100) {
                dataY.push(data.dataFromServer[1].data);
                dataY.shift();
            }
        }
    }, [data]);

    return (
        <div className={styles.chart}>
            CHART OF DATA
            <Line
                options={{
                    animations: false,
                }}
                data={{
                    labels: dataX,
                    datasets: [
                        {
                            label: ["Data1"],
                            data: dataX,
                            backgroundColor: ["lightgrey"],
                            borderColor: ["lightgrey"],
                        },
                        {
                            label: ["Data2"],
                            data: dataY,
                            backgroundColor: ["#000"],
                            borderColor: ["#000"],
                        },
                    ],
                }}
            />
        </div>
    );
}
