import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
import 'rxjs/add/operator/map';
 
@Injectable()
export class CommonService {
      
    url: string;
    headers: any;
    constructor(private http : Http){
        this.url  = 'http://localhost:3000/api/';
        this.headers=new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('sauAuth') });
    }
 
    getStateList(){
     
      let options = new RequestOptions({ headers: this.headers });
    //  this.http.get(this.url+"/state", options)
    //   .map(res => {
    //     // If request fails, throw an Error that will be caught
    //     if (res.status < 200 || res.status >= 300) {
    //       throw new Error('This request has failed ' + res.status);
    //     }
    //     // If everything went fine, return the response
    //     else { 
    //       return res.json();
    //     }
    //   })
    //   .subscribe((data) => {
    //     return data
    //   },
    //   (err) => {
    //     localStorage.clear();

    //   });


        return this.http.get(this.url+"state",options ).map(res => {
            return res.json()
        });
    }
    getCityListByState(StateId){
     
      let options = new RequestOptions({ headers: this.headers });
    //  this.http.get(this.url+"/state", options)
    //   .map(res => {
    //     // If request fails, throw an Error that will be caught
    //     if (res.status < 200 || res.status >= 300) {
    //       throw new Error('This request has failed ' + res.status);
    //     }
    //     // If everything went fine, return the response
    //     else { 
    //       return res.json();
    //     }
    //   })
    //   .subscribe((data) => {
    //     return data
    //   },
    //   (err) => {
    //     localStorage.clear();

    //   });


        return this.http.get(this.url+"state/"+StateId,options ).map(res => {
            return res.json()
        });
    }
}