import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseService } from '../../../../../_services/base.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./pending-attendance-record.html",
  encapsulation: ViewEncapsulation.None,
})
export class PendingAttendanceRecordComponent implements OnInit, AfterViewInit {
  attendancePending: any = null;
  SrNo: any = 1;
  datatable: any ;
  divisionData: any = null;
  classData: any = null;
  studentData: any = null;
  showTemplate: any;
  dateOfAttendance: any = null;
  selectedFiles: any;
  addAttenaceFormList: FormGroup;
  constructor(private _script: ScriptLoaderService, private baseservice: BaseService
    , private router: Router, public fb: FormBuilder) {

  }
  ngOnInit() {
   
    this.listTemplate();
    
  }
  listTemplate() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    'assets/demo/default/custom/components/datatables/base/html-table.js');
    $("#addTemplate").hide();
    $("#editTemplate").hide();
    $("#listTemplate").show();
    this.getAttendancePendingList();
  }
  addTemplate() {
    $("#addTemplate").show();
    $("#editTemplate").hide();
    $("#listTemplate").hide();
    
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/select2.js');
    $('#m_datepickerSet').datepicker({
      format: "yyyy-mm-dd",
      todayHighlight: true,
      templates: {
        leftArrow: '<i class="la la-angle-left"></i>',
        rightArrow: '<i class="la la-angle-right"></i>'
      }
    });
    $('#m_datepickerSet').on('change', function () {
    });
  }
  
  private getAttendancePendingList() {
    this.baseservice.get('pendingattendance').subscribe((data) => {
      this.attendancePending = data;
     
      this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  private getAttendanceData(attendanceId){
 
  let excludeProjects = [Number(attendanceId)];
  let pendingattendanceData=_.filter(this.attendancePending, (v) => _.includes(excludeProjects, v.row_number));
  if(pendingattendanceData.length>0){
  this.addAttendanceSubmitForm(pendingattendanceData[0]);
  this.addTemplate();
  }
  }

  public addAttendanceSubmitForm(data) {
   
    if (data.selectedDate != '' && data.classId!= '' && data.divId!= '') {
      this.baseservice.get('addattendancestudentlist?classId=' + data.classId + '&divId=' + data.divId+'&date='+data.selectedDate).subscribe((data) => {  
        this.studentData = data;    
      },
        (err) => {
          console.log(err);        
        });
    }
  }

  addStudentAttenaceSumitForm(data){
    
    var newArrData = _.map(data, function(o) {
      o.attendanceResult=JSON.parse(o.attendanceResult);
      return _.omit(o, ['studentName', 'className','divName','rollNo']); });
  
    let postdata=JSON.stringify(newArrData);
    this.baseservice.post('bulkattendance',postdata).subscribe((data) => { 
      this.datatable.destroy();
      this.listTemplate();
    },
    (err) => {
     console.log(err);
    //  localStorage.clear();
    });
  }
  public showtablerecord(data){
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
        }, {
          field: "id",
          title: "Action",
         
          template: function (row) {
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="'+row.row_number+'"></i></span>';
           
          }
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
      
       this.getAttendanceData(id);
        //this.router.navigate(['/student/profile/', id]); 
        });
  }
  ngAfterViewInit() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/datatables/base/html-table.js');


  }
}
