import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';

import {BaseService} from '../../../../../_services/base.service';
import { Router } from '@angular/router';
declare let $: any

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./dashboard.html",
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  showTemplate:any;
  dashboardData:any=null;
  datatable: any ;
  datatable1: any ;

  constructor(private _script: ScriptLoaderService,private baseservice: BaseService, private router: Router) {
    this.getDashboardData();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/datatables/base/html-table.js');

    
  }

  private getDashboardData() {
    this.baseservice.get('dashboard').subscribe((data) => {
      this.dashboardData = data.dashboarddata[0];
      this.showpendingattendancelist(data.todayattendancependinglist);
      this.showabsentstudentlist(data.todayabsentstudentlist);
    },
    (err) => {
    //  localStorage.clear();
    });
  }

  public showpendingattendancelist(data){
    // console.log(data);
     // let dataJSONArray = JSON.parse(data.teacher);
        let i=1;        
      this.datatable = $('.m_datatable').mDatatable({
        // datasource definition
        data: {
          type: 'local',
          source: data,
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
          field: "",
          title: "Sr.No.",
          textAlign: 'center',
          sortable:false,
          template: function (row) {
            return i++;
          },
        }, {
          field: "className",
          title: "Class-Div",
          template: function (row) {
           
            return row.className+'-'+row.divName;
          },
        }, {
          field: "teacherName",
          title: "Class Teacher",
          
        }, {
          field: "selectedDate",
          title: "Date",
          
        }, {
          field: "active",
          title: "Status",
          template: function (row) {
            return '<span class="m-badge m-badge–brand m-badge–wide"> Pending </span>';
           
          },
        }]
      });
  
      var query =this.datatable.getDataSourceQuery();
  
      $('#m_form_search').on('keyup', function (e) {
        this.datatable.search($(this).val().toLowerCase());
      }).val(query.generalSearch);
  
      $('#m_form_status').on('change', function () {
        this.datatable.search($(this).val(), 'Status');
      }).val(typeof query.Status !== 'undefined' ? query.Status : '');
  
      $('#m_form_type').on('change', function () {
        this.datatable.search($(this).val(), 'Type');
      }).val(typeof query.Type !== 'undefined' ? query.Type : '');
  
      $('#m_form_status, #m_form_type').selectpicker();
     
       $('.m_datatable').on('click', '.edit-button', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
      
      //  this.getAttendanceData(id);
        //this.router.navigate(['/student/profile/', id]); 
        });
  }

  public showabsentstudentlist(data){
    
    // let dataJSONArray = JSON.parse(data.teacher);
      let i=1;         
     this.datatable1 = $('.m_datatable1').mDatatable({
       // datasource definition
       data: {
         type: 'local',
         source: data,
         pageSize: 10,
         i:1
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
       columns: [{
         field: "",
         title: "Sr No",
         textAlign: 'center',
         template: function (row) {
           return i++;        
           },
       },{
         
         field: "rollNo",
         title: "Roll No",
        
       }, {
         field: "studentName",
         title: "Student Name",
         template: function (row) {
         
           return '<span (click)="detailProfile('+row.studentId+')"  class="teacherFn" data-id="'+row.id+'">'+row.studentName+'</span>';
         },
       }, {
         field: "className",
         title: "Class-Div",
         template: function (row) {
           
           return row.className+'-'+row.divName;
         },
       },
       //  {
       //   field: "fatherName",
       //   title: "Father Name ",
         
       // }, {
       //   field: "mobNumber",
       //   title: "Mob Number",
         
       // },
        {
         field: "teacherName",
         title: "Teacher Name",
         
       },
       {
        field: "attendanceDate",
        title: "Attendance Date",
        
      },
        {
         field: "id",
         title: "Actions",

         template: function (row) {
           return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="'+row.id+'"></i></span>';
          
          
         }
       }]
     });
 
     var query =this.datatable1.getDataSourceQuery();
 
     $('#m_form_search1').on('keyup', function (e) {
       this.datatable1.search($(this).val().toLowerCase());
     }).val(query.generalSearch);
 
     $('#m_form_status').on('change', function () {
       this.datatable1.search($(this).val(), 'Status');
     }).val(typeof query.Status !== 'undefined' ? query.Status : '');
 
     $('#m_form_type').on('change', function () {
       this.datatable1.search($(this).val(), 'Type');
     }).val(typeof query.Type !== 'undefined' ? query.Type : '');
 
     $('#m_form_status, #m_form_type').selectpicker();
     $('.m_datatable').on('click', '.teacherFn', (e) => {
       e.preventDefault();
       var id = $(e.target).attr('data-id');
      
       this.router.navigate(['/student/profile/', id]); 
       });
      $('.m_datatable').on('click', '.edit-button', (e) => {
       e.preventDefault();
       var id = $(e.target).attr('data-id');
     
       //this.router.navigate(['/student/profile/', id]); 
       });
 }  
}
