import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Http, Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
import { Router } from '@angular/router';
declare let $: any

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./teacher-leave.html",
  encapsulation: ViewEncapsulation.None,
})
export class TeacherLeaveComponent implements OnInit, AfterViewInit {
  showTemplate:any;
  subjectData:any;
  addTeacherLeaveForm : FormGroup;
  editTeacherLeaveForm : FormGroup;

  constructor(private _script: ScriptLoaderService, private http: Http, private router: Router,fb: FormBuilder){
    this.getSubjectList();
    this.addTeacherLeaveForm = fb.group({
      'subjectName' : [null, Validators.required],
      // 'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      // 'gender' : [null, Validators.required],
      // 'hiking' : [false],
      // 'running' : [false],
      // 'swimming' : [false]
    });
    this.editTeacherLeaveForm = fb.group({
      'subjectName' : [null, Validators.required],
      // 'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      // 'gender' : [null, Validators.required],
      // 'hiking' : [false],
      // 'running' : [false],
      // 'swimming' : [false]
    });
    // console.log(this.addTeacherLeaveForm);
    // this.addTeacherLeaveForm.valueChanges.subscribe( (form: any) => {
    //   console.log('form changed to:', form);
    // }
    // );
  }
  ngOnInit() {
    this.listTemplate();
  }
  ngAfterViewInit() {
    this.listTemplate();
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    'assets/demo/default/custom/components/forms/widgets/select2.js');
  this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
    

  }
  listTemplate() {
    $("#addTemplate").hide();
    $("#editTemplate").hide();
    $("#listTemplate").show();
   
  }
  addTemplate() {
    $("#addTemplate").show();
    $("#editTemplate").hide();
    $("#listTemplate").hide();
  }
  editTemplate(studentData) {
    $("#addTemplate").hide();
    $("#editTemplate").show();
    $("#listTemplate").hide();
    
    // this.studentDetail = studentData;
    
  }
  addSubjectSubmitForm(value: any){
    console.log(value);
  }
  editSubjectSubmitForm(value: any){
    console.log(value);
  }
  private getSubjectList() {
    let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('sauAuth') });

    let options = new RequestOptions({ headers: headers });
     this.http.get('http://localhost:3000/api/subject', options)
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {

          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else { 
          return res.json();
        }
      })
      .subscribe((data) => {
        this.subjectData = data.subject;
        this.showtablerecord(data);
       
      },
      (err) => {
        localStorage.clear();

      });


  }
  public showtablerecord(data){
   
     
                 
       var datatable = $('.m_datatable').mDatatable({
        
         data: {
           type: 'local',
           source: data.subject,
           pageSize: 10
         },
   
         // layout definition
         layout: {
           theme: 'default', // datatable theme
           class: '', // custom wrapper class
           scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
           height: 450, // datatable's body's fixed height
           footer: false // display/hide footer
         },
   
         // column sorting
         sortable: true,
   
         pagination: true,
   
         // inline and bactch editing(cooming soon)
         // editable: false,
   
         // columns definition
         columns: [{
           field: "id",
           title: "Sr.No.",
           
         }, {
           field: "subName",
           title: "Teacher Name",
           
         },{
          field: "id",
          title: "Total Leave",
          
        },{
          field: "id",
          title: "Remaining Leave",
          
        },{
          field: "id",
          title: "Leave Dates",
          
        },
         {
           field: "active",
           title: "Status",
           // callback function support for column rendering
           template: function (row) {
             var status = {
               true: {'title': 'Active', 'class': ' m-badge--success'},
               false: {'title': 'Inactive', 'class': ' m-badge--danger'}
               
             };
             return '<span class="m-badge ' + status[row.active].class + ' m-badge--wide">' + status[row.active].title + '</span>';
           }
         }, {
           field: "createdAt",
           width: 110,
           title: "Actions",
           sortable: false,
           overflow: 'visible',
           template: function (row) {
             var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
   
             return '\
               <div class="dropdown ' + dropup + '">\
                 <a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                   <i class="la la-ellipsis-h"></i>\
                               </a>\
                   <div class="dropdown-menu dropdown-menu-right">\
                     <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
                     <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
                     <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
                   </div>\
               </div>\
               <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View ">\
                               <i class="la la-edit"></i>\
                           </a>\
             ';
           }
         }]
       });
   
       var query = datatable.getDataSourceQuery();
   
       $('#m_form_search').on('keyup', function (e) {
         datatable.search($(this).val().toLowerCase());
       }).val(query.generalSearch);
   
       $('#m_form_status').on('change', function () {
         datatable.search($(this).val(), 'Status');
       }).val(typeof query.Status !== 'undefined' ? query.Status : '');
   
       $('#m_form_type').on('change', function () {
         datatable.search($(this).val(), 'Type');
       }).val(typeof query.Type !== 'undefined' ? query.Type : '');
   
       $('#m_form_status, #m_form_type').selectpicker();
       // $('.m_datatable').on('click', '.teacherFn', (e) => {
       //   e.preventDefault();
       //   var id = $(e.target).attr('data-id');
        
       //   this.router.navigate(['/student/profile/', id]); 
       //   });
   }
}
