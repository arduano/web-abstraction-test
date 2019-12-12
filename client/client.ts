import { webDatalessRequest, webDataRequest } from "./web";
import * as re from "../abstract/endpoints";

async function run() {
    let data;

    data = await webDatalessRequest(re.getHelloWorld);
    console.log('original data:', data);

    data = await webDataRequest(re.postHelloWorld, {
        message: "Hello Modified",
        test1: "modified 1",
        test2: "modified 2"
    });
    console.log('posted data response:', data);
    
    data = await webDataRequest(re.patchHelloWorld, {
        message: "Hello Patched",
        test1: "patched 1",
    });
    console.log('patched data response:', data);
}

run();