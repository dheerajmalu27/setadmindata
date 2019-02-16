    import 'rxjs/add/operator/do';
   import { Router  } from '@angular/router';
    import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent,HttpResponse,HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService,public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    return next.handle(request).do((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse){
          // if the token is valid
        }
      }, (err: any) => {
        // if the token has expired.
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            // this is where you can do anything like navigating
            this.router.navigateByUrl('/login');
          }
        }
      });
  }
}
