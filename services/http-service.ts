import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { httpOptions } from "../types/http-options";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    environment = {
        apiUrl: 'https://testing.instimatch.ch'
    }
    constructor(private http: HttpClient) { }

    get(url, params?, getFile = false) {
        const heardersPayload = {
            ...{
                url: this.environment.apiUrl + url
            },
            ...(getFile ? { getFile: true } : {})
        }
        return this.http.get(this.environment.apiUrl + url, { ...this.getHeaders(heardersPayload), ...(params ? { params: params } : {}) });
    }

    post(url, payload, options: httpOptions = {}) {
        const heardersPayload = {
            ...{
                url: this.environment.apiUrl + url
            },
            ...(options.isFormData ? { getFile: true } : {})
        }
        if (options.watchProgress) {
            return this.http.post(this.environment.apiUrl + url, payload, {
                ...this.getHeaders({ ...heardersPayload, isFormData: true }),
                reportProgress: true,
                observe: "events"
            })
        }
        return this.http.post(this.environment.apiUrl + url, payload, this.getHeaders(heardersPayload))
    }

    delete(url, params) {
        const heardersPayload = {
            url: this.environment.apiUrl + url
        }
        return this.http.delete(this.environment.apiUrl + url, { ...this.getHeaders(heardersPayload), ...(params ? { params: params } : {}) });
    }

    put(url, payload, options: httpOptions = {}) {
        const heardersPayload = {
            url: this.environment.apiUrl + url,
        };
        const user = JSON.parse(String(sessionStorage.getItem('user')));
        if (options.isFormData && options.watchProgress) {
            return this.http.put(this.environment.apiUrl + url, payload, {
                ...this.getHeaders({ ...heardersPayload, isFormData: true }),
                reportProgress: true,
                observe: "events"
            });
        }
        if (options.isFormData) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'token': user['token']
                })
            };
            return this.http.put(this.environment.apiUrl + url, payload, httpOptions);
        }
        return this.http.put(this.environment.apiUrl + url, payload, this.getHeaders(heardersPayload));
    }

    getHeaders({ getFile = false, url = '', isFormData = false }) {
        const etag = sessionStorage.getItem(url) || '';
        const user = JSON.parse(String(sessionStorage.getItem('user')));
        return {
            ...{
                headers: new HttpHeaders({
                    ...((!getFile && !isFormData) ? { 'Content-Type': 'application/json' } : {}),
                    ...(user ? {
                        'token': user['token'],
                        'x-etag': etag
                    } : {})
                })
            },
            ...(getFile ? { responseType: 'blob' as 'json' } : {})
        };
    }
}
