import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { Http, Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./pending-attendance-record.html",
  encapsulation: ViewEncapsulation.None,
})
export class PendingAttendanceRecordComponent implements OnInit, AfterViewInit {
  attendancePending: any = null;
  SrNo: any = 1;
  constructor(private _script: ScriptLoaderService, private http: Http, private router: Router,public fb: FormBuilder) {
    this.getAttendancePendingList();
  }
  ngOnInit() {
    this.listTemplate();
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
  
  private getAttendancePendingList() {
    
    let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('sauAuth') });

    let options = new RequestOptions({ headers: headers });
    let StudentData = this.http.get('http://localhost:3000/api/pendingattendance', options)
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
        this.attendancePending = data;
       this.showtablerecord(data);
      
      },
      (err) => {
        localStorage.clear();

      });


  }
  public showtablerecord(data){
    // console.log(data);
     // let dataJSONArray = JSON.parse(data.teacher);
        let i=1;        
      var datatable = $('.m_datatable').mDatatable({
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
        }, {
          field: "id",
          title: "Action",
         
          template: function (row) {
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="'+row.id+'"></i></span>';
           
          }
        }]
      });
  
      var query =<any>datatable.getDataSourceQuery();
  
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
      $('.m_datatable').on('click', '.teacherFn', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
       
        this.router.navigate(['/student/profile/', id]); 
        });
       $('.m_datatable').on('click', '.edit-button', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
        console.log(id);
      //  this.getStudentData(id);
        //this.router.navigate(['/student/profile/', id]); 
        });
  }
  ngAfterViewInit() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/datatables/base/html-table.js');
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/select2.js');
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');

  }

}