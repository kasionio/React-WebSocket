import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "./index.css";

let firstLineData = [];
let secondLineData = [];
firstLineData.length = 5; //X-axis length
secondLineData.length = firstLineData.length;

export function Chart({ data }) {
    useEffect(() => {
        if (data.dataFromServer) {
            if (data.dataFromServer[0].data <= 100) {
                firstLineData.push(data.dataFromServer[0].data);
                firstLineData.shift();
            }
            if (data.dataFromServer[1].data <= 100) {
                secondLineData.push(data.dataFromServer[1].data);
                secondLineData.shift();
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
                    labels: firstLineData,
                    datasets: [
                        {
                            label: ["Data1"],
                            data: firstLineData,
                            backgroundColor: ["lightgrey"],
                            borderColor: ["lightgrey"],
                        },
                        {
                            label: ["Data2"],
                            data: secondLineData,
                            backgroundColor: ["#000"],
                            borderColor: ["#000"],
                        },
                    ],
                }}
            />
        </div>
    );
}
