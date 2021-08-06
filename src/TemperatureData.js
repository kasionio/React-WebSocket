export function TemperatureData({ data }) {
    return (
    <div>
        ID1 Temp1: {data.dataFromServer ? 
        data.dataFromServer[0].temperature : null} C <br/>
        ID2 Temp2: {data.dataFromServer ? 
        data.dataFromServer[1].temperature : null} C
    </div>
        )
}