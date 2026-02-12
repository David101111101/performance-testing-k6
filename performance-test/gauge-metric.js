import http from "k6/http";
import { Counter } from "k6/metrics";

/*Custom Metric to track the waiting time of requests (Min, Max & Last One)*/
export const options = {
    vus: 10,
    duration: "10s",
}
const waitingTime = new Gauge("waiting_time")

export default function () { 
const request = http.get("https://api.escuelajs.co/api/v1/users")
//Add the waiting time of the request to the custom Gauge metric
waitingTime.add(request.timings.waiting + request.timings.sending)
}