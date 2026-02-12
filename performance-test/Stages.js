import http from "k6/http";
import { sleep } from "k6";

/* The options object defines the number of virtual users (vus) and the duration of the test. In this case, it will run with 10 virtual users for 10 seconds.
>> Results: 1279 iterations 126 per S, 0 failed, 1279 passed, 0% failure rate
export const options = {
    vus: 10,
    duration: "10s",
}
*/

/* 1827 iterations 7.5 per S */
export const options = {
    stages: [
        { duration: "60s", target: 10 }, // Ramp-up to 10 users over 60 seconds
        { duration: "180s", target: 10 },  // Stay at 10 users for 3M
        { duration: "60", target: 0 },    // Ramp-down to 0 users over 60 S
    ],
}

export default function () { 
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    console.log("Response status: " + response.status);
    //Doesnt need to be used but good practice to add a sleep to simulate real user wait time
    // WITHOUT Sleep>> Results: 1279 iterations 126 per S,
    // WITH Sleep   >> Results: 90 iterations 8 per S,
    sleep(1);
}