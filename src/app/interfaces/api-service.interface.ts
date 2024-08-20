interface IApiService {
    get: (path: string, options: { [param: string]: unknown }) => Promise<unknown>,
    post: (path: string, body: unknown, options: { [param: string]: unknown }) => Promise<unknown>,
    put: (path: string, body: unknown, options: { [param: string]: unknown }) => Promise<unknown>,
    delete: (path: string, options: { [param: string]: unknown }) => Promise<unknown>,
}