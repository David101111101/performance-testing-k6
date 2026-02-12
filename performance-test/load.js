import http from "k6/http";

/* Load testing to evaluate the performance of the API under different levels of load. without sleep property
*/
/*629.746 Interations > 723.7 per S, data received 13GB*/
export const options = {
    stages: [
        { duration: "3M", target: 100 }, 
        { duration: "5M", target: 100 },  
        { duration: "45s", target: 150 },  
        { duration: "45s", target: 100 }, 
        { duration: "5M", target: 100 },
    ],
}

export default function () { 
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    console.log("Response status: " + response.status);

}