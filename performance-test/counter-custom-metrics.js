import http from "k6/http";
import { Counter } from "k6/metrics";
import { Trend } from "k6/metrics";
/*Custom Counter Metric to track the number of times the products endpoint is called*/
export const options = {
    vus: 10,
    duration: "10s",
}
const productsCounter = new Counter('productsCounter', false);
const categoriesCounter = new Counter('categoriesCounter', false);
const usersCounter = new Counter('usersCounter', false);
const endpointBase = "https://api.escuelajs.co/api/v1";
const myFirstTrend = new Trend("products_time")
const mySecondTrend = new Trend("categories_time")
const myThirdTrend = new Trend("users_time")
//Dynamic array of endpoints and their corresponding counters
const endpoints = [
    { name: "products", counter: productsCounter },
    { name: "categories", counter: categoriesCounter },
    { name: "users", counter: usersCounter }
]

export default function() {
    //In this challenge we will randomly call one of the three endpoints and add 1 to the corresponding counter
    const randomNumber = Math.floor(Math.random() * endpoints.length);
    let randomEndpoint = endpoints[randomNumber];
    let response = http.get(`${endpointBase}/${randomEndpoint.name}`);
    randomEndpoint.counter.add(1);
    //Also, we will track the duration time of each endpoint using Trend metrics
    if (randomEndpoint.name === "products") {
        myFirstTrend.add(response.timings.duration);
    } else if (randomEndpoint.name === "categories") {
        mySecondTrend.add(response.timings.duration);
    } else if (randomEndpoint.name === "users") {
        myThirdTrend.add(response.timings.duration);
    }
}