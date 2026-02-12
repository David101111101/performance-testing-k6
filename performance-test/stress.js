import http from "k6/http";
import { sleep } from "k6";

/*Stress test with stages, simulating a real-world scenario where traffic increases over time. 
 This allows us to observe how the system handles increasing load and identify any potential performance issues as the number of users increases*/


/*81.965 Interations > 123.9 per S, data received 7GB*/
export const options = {
    stages: [
        { duration: "2M", target: 100 }, // Ramp-up to 100 users over 2M
        { duration: "5M", target: 100 },  // Stay at 100 users for 5M
        { duration: "2M", target: 400 },    // Ramp-up to 400 users over 2m
    ],
}

export default function () { 
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    console.log("Response status: " + response.status);

    sleep(1);
}