import { Injectable } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';
import { Error } from '../interfaces/error.interface';
import { ServerResponse } from '../interfaces/server-response.interface';
import { appVariables } from './../app.constants';
import { CustomErrorHandlerService } from './custom-error-handler.service';
@Injectable()
export class BaseService {
  constructor(public http: HttpService, public errorHandler: CustomErrorHandlerService) {
  }
  get(url) {
    // Helper service to start ng2-slim-loading-bar progress bar
    
    return this.http.get(<string>(appVariables.apiUrl+url)).map((res: Response) => {
      return this.handleResponse(res);
    }).catch((error: Response) => Observable.throw(this.errorHandler.tryParseError(error)))
      .finally(() => {
        // stop ng2-slim-loading-bar progress bar
        
      });
  }


  post(url, postBody: any, options?: RequestOptions) {
    
    if (options) {
      return this.http.post(appVariables.apiUrl+url, postBody, options)
        .map((res: Response) => {
          return this.handleResponse(res);
        })
        .catch((error: Response) => Observable.throw(error))
        .finally(() => {
          
        });
    } else {
      return this.http.post(appVariables.apiUrl+url, postBody)
        .map((res: Response) => {
          return this.handleResponse(res);
        })
        .catch((error: Response) => Observable.throw(error))
        .finally(() => {
          
        });
    }


  }
  delete(url, postBody: any) {
    
    return this.http.delete(appVariables.apiUrl+url).map((res: Response) => {
      return this.handleResponse(res);
    }).catch((error: Response) => Observable.throw(error))
      .finally(() => {
        
      });
  }
  put(url, putData) {
    
    return this.http.put(appVariables.apiUrl+url, putData).map((res: Response) => {
      return this.handleResponse(res);
    }).catch((error: Response) => Observable.throw(error))
      .finally(() => {
        
      });
  }


  upload(url: string, file: File) {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('files', file, file.name);
    }
    // this.helperService.addContentTypeHeader = false;
    return this.post(url, formData);
  }


  formUrlParam(url, data) {
    let queryString: string = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!queryString) {
          queryString = `?${key}=${data[key]}`;
        } else {
          queryString += `&${key}=${data[key]}`;
        }
      }
    }
    return url + queryString;
  }


  handleResponse(res: Response): ServerResponse {
    // My API sends a new jwt access token with each request,
    // so store it in the local storage, replacing the old one.
    //this.refreshToken(res);
    const data = res.json();
    if (data.error) {
      const error: Error = { error: data.error, message: data.message };
      throw new Error(this.errorHandler.parseCustomServerErrorToString(error));
    } else {
      return data;
    }
  }


  refreshToken(res: Response) {
    const token = res.headers.get(appVariables.accessTokenServer);
    if (token) {
      localStorage.setItem(appVariables.accessTokenLocalStorage, `${token}`);
    }
  }
}