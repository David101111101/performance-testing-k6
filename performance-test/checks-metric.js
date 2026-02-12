import http from "k6/http";
import { check } from "k6";

/*In this challenge we will use the check function to create a custom metric that tracks the percentage of successful requests to the products endpoint. Specifically, we will check if the status code of the response is 200

By using Threshold we can add an acceptace criteria, in this case we will set that if the percentage of failed requests is higher than 10% then show an error in the test results
*/

export const options = {
    vus: 20, 
    duration: "20s",
    thresholds: {
        http_req_failed: ["rate<0.1"], // Return Error if the rate of failed requests is higher than 10%
        http_req_duration: [
            {
                threshold: "p(95)<200",
                abortOnFail: true, // Abort the test if the 95th percentile of request duration is higher than 200ms
                delayAbortEval: "10s", // Delay the evaluation of the threshold until 10s have passed
            },// Return Error if the minimum duration time of requests is less than 200ms
            ],
    }
}

export default function(){
const response = http.get("https://api.escuelajs.co/api/v1/products/11")
check(response, {
    "statusCode is 200": (r) => r.status === 200,
    "Transaction is bellow 500ms": (r) => r.timings.duration < 500,
})

}
