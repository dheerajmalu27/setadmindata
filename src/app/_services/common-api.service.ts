import { Injectable } from '@angular/core';
import { BaseService } from '../_services/base.service';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
declare let $: any

@Injectable()
export class CommonService {

    url: string;
    headers: any;
    constructor(private baseservice: BaseService) {

    }

    getDropDownClassList() {
        var resultArray: Array<any> = [];
        this.baseservice.get('class').subscribe((data) => {
          var classData = data.class;
          classData.map( item => {
            resultArray.push(
                _.mapKeys( item, ( value, key ) => {
                    let newKey = key;
                    if( key === 'className' ) {
                        newKey = 'text';
                    }
                    return newKey;
                })
            )
        });
        resultArray = _.map(resultArray, function(o) { return _.pick(o, ['id', 'text']); });
        console.log(resultArray);
       return resultArray;
        
       },
       (err) => {
       //  localStorage.clear();
       });   


    }
    getDropDownDivisionList() {
        var resultArray: Array<any> = [];
        this.baseservice.get('division').subscribe((data) => {
            var divisionData = data.division;
            divisionData.map(item => {
                resultArray.push(
                    _.mapKeys(item, (value, key) => {
                        let newKey = key;
                        if (key === 'className') {
                            newKey = 'text';
                        }
                        return newKey;
                    })
                )
            });
            return resultArray;
        },
            (err) => {
                //  localStorage.clear();
            });
    }
}