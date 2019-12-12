import { WebRequestMeta, RequestType } from "./types";

export interface HelloWorld {
    message: string;
    test1: string;
    test2: string;
}

export interface UpdateHelloWorld extends HelloWorld{
    time: number;
    updated: boolean;
}

export function getHelloWorld (req: undefined, resp: HelloWorld): RequestType<'GET'> {
    return {
        method: 'GET',
        url: '/hello-world'
    }
}

export function postHelloWorld (req: HelloWorld, resp: UpdateHelloWorld): RequestType<'POST'> {
    return {
        method: 'POST',
        url: '/hello-world'
    }
}

export function patchHelloWorld (req: Partial<HelloWorld>, resp: UpdateHelloWorld): RequestType<'PATCH'> {
    return {
        method: 'PATCH',
        url: '/hello-world'
    }
}