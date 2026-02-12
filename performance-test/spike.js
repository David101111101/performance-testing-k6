import http from "k6/http";

/* Spike testing is how a system handles sudden and extreme increases in load. 
The goal of spike testing is to identify the system's breaking point and to ensure that it can recover gracefully after the spike subsides. 
In this test, we will simulate a spike in traffic by rapidly increasing the number of virtual users (VUs) accessing the system.
*/

/*7.540 iterations 298 per S without the Sleep property*/
export const options = {
    stages: [
        { duration: "10s", target: 10 }, // Ramp-up to 10 users over 10s
        { duration: "15s", target: 100 },  // ramp up to 100 users for 15s
    ],
}

export default function () { 
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    console.log("Response status: " + response.status);
}