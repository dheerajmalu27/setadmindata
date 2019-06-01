import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {BaseService} from '../../../../../_services/base.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./final-result-report.html",
  encapsulation: ViewEncapsulation.None,
})
export class finalResultReportComponent implements OnInit, AfterViewInit {
   myArray= [];
  classData:any =null;
  
  constructor(private _script: ScriptLoaderService,private baseservice: BaseService
    , private router: Router) {
    
    }
  ngOnInit() {
this.getTestClassList();
  }

 public buttonsetcolor(i){
    if((i+1)%5==0){
      return 'btn m-btn--pill m-btn--air btn-primary';
    }else if((i+1)%4==0){
      return 'btn m-btn--pill m-btn--air btn-danger';
    }else if((i+1)%3==0){
      return 'btn m-btn--pill m-btn--air btn-success';
    }else if((i+1)%2==0){
      return 'btn m-btn--pill m-btn--air btn-info';
    }else{
      return 'btn m-btn--pill m-btn--air btn-warning';
    }
  }
  public generatePDF() 
  { 
	let str='1-1-1';
    let res = str.split("-");
    let postdata={"testId":res[0],"classId":res[1],"divId":res[2] };
    this.baseservice.post('bulktestmarks',postdata).subscribe((data) => { 
      if(data.testreportclassdata!=null && data.testreportclassdata!=''){
        this.genratefile();
            }
    },
    (err) => {
     console.log(err);
    //  localStorage.clear();
    });
    
    this.baseservice.get('testclassreportlist').subscribe((data) => {
     
     
   },
   (err) => {
   //  localStorage.clear();
   });   
 
  } 
  private getTestClassList() {
    this.baseservice.get('testclassreportlist').subscribe((data) => {
      if(data.testreportclasslist!=null && data.testreportclasslist!=''){
        this.classData=_.groupBy(data.testreportclasslist,ct => ct.testId);
        this.classData=_.toArray(this.classData);
      }
     
   },
   (err) => {
   //  localStorage.clear();
   });   
 }
private genratefile(){
  var data = document.getElementById('contentToConvert'); 
  html2canvas(data).then(canvas => { 
  // Few necessary setting options 
  var imgWidth = 208; 
  var pageHeight = 295; 
  var imgHeight = canvas.height * imgWidth / canvas.width; 
  var heightLeft = imgHeight; 
  
  const contentDataURL = canvas.toDataURL('image/png') 
  let pdf =new jspdf('p', 'mm', [500, 500]);//new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
  var position = 0; 
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
  pdf.save('MYPdf.pdf'); // Generated PDF  
  }); 
}
  ngAfterViewInit() {  

  }  
}