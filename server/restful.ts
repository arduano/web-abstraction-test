import { HelloWorld } from './../abstract/endpoints';
import { WebRequestMeta, RequestType, RequestMethods } from "../abstract/types";
import express from 'express';
import * as re from "../abstract/endpoints";


interface Endpoint extends RequestType<RequestMethods> {
    handler: express.RequestHandler;
}

interface ProcessedRequest<T> extends express.Request {
    body: T;
    //Can add middleware data here, e.g. customer
}

//Endpoint function definition
function endpoint<Req, Resp>(
    req: WebRequestMeta<RequestMethods, Req, Resp>,
    func: (req: ProcessedRequest<Req>, resp?: express.Response) => { [k in keyof Resp]: Resp[k] } | undefined
): Endpoint {
    let meta = req();
    return {
        ...meta,
        handler: (req: ProcessedRequest<Req>, resp: express.Response, next: express.NextFunction) => {
            let ret = func(req, resp);
            if (ret === undefined) next();
            else {
                resp.status(200).send(ret);
                next();
            }
        }
    };
}

//HelloWorld variable for testing reasons
let testHelloWorld: HelloWorld = {
    message: "Hello Abstraction!",
    test1: "Synced type correction across client and server",
    test2: "test"
}

//Restful endpoints
export const restfulEndpoints: Endpoint[] = [
    endpoint(re.getHelloWorld,
        (req) => {
            return testHelloWorld
        }
    ),
    endpoint(re.postHelloWorld,
        (req) => {
            testHelloWorld = req.body;

            return {
                ...testHelloWorld,
                time: Date.now(),
                updated: true
            }
        }
    ),
    endpoint(re.patchHelloWorld,
        (req) => {
            Object.keys(req.body).forEach(k => {
                if (req.body[k] !== undefined)
                    testHelloWorld[k] = req.body[k];
            });

            return {
                ...testHelloWorld,
                time: Date.now(),
                updated: true
            }
        }
    )
]