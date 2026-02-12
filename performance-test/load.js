import http from "k6/http";

/* Load testing to evaluate the performance of the API under different levels of load. without sleep property
*/
export const options = {
    stages: [
        { duration: "10s", target: 100 }, 
        { duration: "15s", target: 100 },  
        { duration: "5s", target: 150 },  
        { duration: "10s", target: 100 }, 
    ],
}

export default function () { 
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    console.log("Response status: " + response.status);

}