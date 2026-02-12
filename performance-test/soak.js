import http from "k6/http";

/* Soak testing to evaluate the performance of the API over an extended period of time under a consistent load.
*/
/*629.746 Interations > 723.7 per S, data received 13GB*/
export const options = {
    stages: [
        { duration: "2M", target: 200 }, 
        { duration: "3H30m", target: 200 },  
        { duration: "2M", target: 0 },  
    ],
}

export default function () { 
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    console.log("Response status: " + response.status);

}