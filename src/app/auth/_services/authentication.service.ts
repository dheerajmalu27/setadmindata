import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
import "rxjs/add/operator/map";
import { appVariables } from '../../app.constants';
@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/api/users/login', JSON.stringify({ email: email, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let userData = response.json();
        if (userData && userData.token) {
          userData.user["token"] = userData.token;
          userData.user["fullName"] = userData.user["first"];
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(userData.token);
          localStorage.setItem(appVariables.accessTokenLocalStorage, userData.token);
          localStorage.setItem('currentUser', JSON.stringify(userData.user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(appVariables.accessTokenLocalStorage);
    localStorage.removeItem('currentUser');
  }
}
