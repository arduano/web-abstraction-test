import axios from 'axios';
import { WebRequestMeta, RequestMethodsDataless, RequestMethodsData } from '../abstract/types';

let baseurl = 'http://localhost:8080/api';

export async function webDatalessRequest<Resp>(req: WebRequestMeta<RequestMethodsDataless, undefined, Resp>) {
    //Build headers, from localstorage or mobx store or something
    let headers = {};

    let meta = req();

    let axiosfn = meta.method.toLowerCase();
    let resp = await axios[axiosfn](baseurl + meta.url, { headers });
    return resp.data as Resp;
}

export async function webDataRequest<Req, Resp>(req: WebRequestMeta<RequestMethodsData, Req, Resp>, data: Req) {
    //Build headers, from localstorage or mobx store or something
    let headers = {};

    let meta = req();

    let axiosfn = meta.method.toLowerCase();
    let resp = await axios[axiosfn](baseurl + meta.url, data, { headers });
    return resp.data as Resp;
}