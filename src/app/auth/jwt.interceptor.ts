//     import 'rxjs/add/operator/do';
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(public auth: AuthService) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
//     return next.handle(req).do((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//         // do stuff with response if you want
//       }
//     }, (err: any) => {
//       if (err instanceof HttpErrorResponse {
//         if (err.status === 401) {
//           this.auth.collectFailedRequest(request);
//         }
//       }
//     });
//   }
// }
