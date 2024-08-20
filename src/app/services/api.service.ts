import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { lastValueFrom } from 'rxjs';

/** Environments */
import { environment } from '../../environment/environment';

/** Interfaces */
import { IApiService } from '../interfaces/api-service.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  private httpClient: HttpClient;
  protected apiUrl = environment.apiUrl;

  constructor(
    protected injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient);
  }

  get<T>(path: string, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.get<T>(`${this.apiUrl}${path}`, options));
  }
  post<T>(path: string, body:unknown, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.post<T>(`${this.apiUrl}${path}`, body, options));
  }
  put<T>(path: string, body:unknown, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.put<T>(`${this.apiUrl}${path}`, body, options));
  }
  delete<T>(path: string, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.delete<T>(`${this.apiUrl}${path}`, options));
  }

  
}
