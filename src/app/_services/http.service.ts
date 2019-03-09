import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { appVariables } from '../app.constants';


@Injectable()
export class HttpService extends Http {
  router: Router;
  // addContentTypeHeader: boolean | string = true;
  constructor(backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
    
  }


  request(url: string | Request, options?: RequestOptions): Observable<Response> {

    if (typeof url === 'string') {
      if (!options) {
        // let's make an option object
        options = new RequestOptions({ headers: new Headers() });
      }
      this.createRequestOptions(options);
    } else {
      this.createRequestOptions(url);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }


  createRequestOptions(options: RequestOptions | Request) {
    const token: string = localStorage.getItem(appVariables.accessTokenLocalStorage);
    // if (this.addContentTypeHeader && typeof this.addContentTypeHeader === 'string') {
    //   options.headers.append('Content-Type', this.addContentTypeHeader);
    // } else {
    //   const contentTypeHeader: string = options.headers.get('Content-Type');
    //   if (!contentTypeHeader && this.addContentTypeHeader) {
    //     options.headers.append('Content-Type', appVariables.defaultContentTypeHeader);
    //   }
     
    // }
    options.headers.append('Content-Type', appVariables.defaultContentTypeHeader);
    options.headers.append('authorization', token);
  }
  catchAuthError(self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
   return (res: Response) => {
    if (res.status === 401 || res.status === 403) {
      // if not authenticated
      // localStorage.removeItem(appVariables.userLocalStorage);
      // localStorage.removeItem(appVariables.accessTokenLocalStorage);
      this.router.navigate([appVariables.loginPageUrl]);
    }
    return Observable.throw(res);
  };
}
}
