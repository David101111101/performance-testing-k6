import http from "k6/http";
import { Rate } from "k6/metrics";
import { check } from "k6";

/*Custom Metric to track the rate of successful requests to the products endpoint
* Specifically the percentage of values that are not 0!
*/


/*Challenge: Access randomly to 1 out of 300 product end-points and if it returns a 404 status code, add 0 to the Rate metric, otherwise add 1. In this way we will be able to track the percentage of successful requests to the products endpoint


"2nd Challenge, IF 35% of the petitions fail, Use a threshold to Fail the test.
Evaluate this at 10Seconds of the test & at the end of the test"
 */
export const options = {
    vus: 10,
    duration: "20s",
        thresholds: {
        http_req_failed: ["rate<0.35"], // Return Error if the rate of failed requests is higher than 35%
        http_req_failed: [
            {
                threshold: "rate<0.35",
                abortOnFail: true, // Abort the test if the 95th percentile of request duration is higher than 200ms
                delayAbortEval: "10s", // Delay the evaluation of the threshold until 10s have passed
            },// Return Error if the minimum duration time of requests is less than 200ms
            ],
    }
}
const myRate = new Rate("products")
export default function () { 
    const randomNumber = Math.floor(Math.random() * 300);
    const request = http.get("https://api.escuelajs.co/api/v1/products/" + randomNumber);
        if (request.status === 404 || request.status === 400) {
            myRate.add(0);
        }
        else if (request.status === 200) {
            myRate.add(1);
        }
        check(request, {
        "35% of petitions Failed": (r) => r.http_req_failed < 0.35,
        })
  
}