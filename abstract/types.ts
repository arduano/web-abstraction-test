export type RequestMethodsData = 'POST' | 'PUT' | 'PATCH'
export type RequestMethodsDataless = 'GET' | 'DELETE'
export type RequestMethods = RequestMethodsData | RequestMethodsDataless;

export interface RequestType<Methods extends RequestMethods>{
    url: string,
    method: Methods
}

export type WebRequestMeta<Methods extends RequestMethods, Req, Resp> = (req?: Req, resp?: Resp) => RequestType<Methods>;