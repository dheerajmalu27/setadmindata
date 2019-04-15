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
  templateUrl: "./attendance.html",
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceComponent implements OnInit, AfterViewInit {
  attendancePending: any = null;
  SrNo: any = 1;
  divisionData: any = null;
  classData: any = null;
  addStudentData: any = null;
  editStudentData: any = null;
  showTemplate: any;
  dateOfAttendance: any = null;
  selectedFiles: any;
  addAttenaceFormList: FormGroup;
  constructor(private _script: ScriptLoaderService, private baseservice: BaseService
    , private router: Router, public fb: FormBuilder) {

  }
  ngOnInit() {
    this.listTemplate();


    this.addAttenaceFormList = this.fb.group({
      'attendanceDate': new FormControl(),
      'classId': new FormControl(),
      'divId': new FormControl(),
    });

  }
  listTemplate() {
    $("#addTemplate").hide();
    $("#editTemplate").hide();
    $("#listTemplate").show();
    this.getAttendanceList();
  }
  editTemplate() {
    $("#addTemplate").hide();
    $("#editTemplate").show();
    $("#listTemplate").hide();
   
  }
  addTemplate() {
    $("#addTemplate").show();
    $("#editTemplate").hide();
    $("#listTemplate").hide();
    this.getClassList();
    this.getDivisionList();
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

  private getAttendanceData(data){
 
    let excludeData  = data.split('*');
    // console.log(excludeData);
  this.getStudentAttendanceList(excludeData);
    // this.addTemplate();
    
    }
    private getStudentAttendanceList(data){
      
        this.baseservice.get('getbyrecord?classId=' + data[0] + '&divId=' + data[1]+'&date='+data[2]).subscribe((data) => {  
          this.editStudentData = data.attendancestudentList; 
          this.editTemplate();   
        },
          (err) => {
            console.log(err);        
          });
      
    }
  private getAttendanceList() {
    this.baseservice.get('getattendancelist').subscribe((data) => {
      this.attendancePending = data;
      console.log(this.attendancePending);
      this.showtablerecord(data);
    },
      (err) => {
        //  localStorage.clear();
      });

  }
  private getClassList() {

    var select2: any;
    var resultArray: Array<any> = [];
    this.baseservice.get('classlist').subscribe((data) => {
      this.classData = data.class;
      (<any>$('.class_select2_drop_down')).select2({ data: this.classData });
    },
      (err) => {
        //  localStorage.clear();
      });
  }
  private getDivisionList() {
    var select2: any;
    var resultArray: Array<any> = [];
    this.baseservice.get('divisionlist').subscribe((data) => {
      this.divisionData = data.division;
      (<any>$('.division_select2_drop_down')).select2({ data: this.divisionData });
    },
      (err) => {
        //  localStorage.clear();
      });

  }
  addStudentAttenaceFormSumitForm(data){
    
    var newArrData = _.map(data, function(o) {
      o.attendanceResult=JSON.parse(o.attendanceResult);
      return _.omit(o, ['studentName', 'className','divName','rollNo']); });
  
    let postdata=JSON.stringify(newArrData);
    this.baseservice.post('bulkattendance',postdata).subscribe((data) => { 
      this.getAttendanceList();
      this.listTemplate();
    },
    (err) => {
     console.log(err);
    //  localStorage.clear();
    });
  }
  public addAttendanceSubmitForm(data) {

    data.divId = $('.division_select2_drop_down').val();
    data.classId = $('.class_select2_drop_down').val();
    data.dateOfAttendance = $("#m_datepickerSet").val();
    this.dateOfAttendance= $("#m_datepickerSet").val();
    if (data.dateOfAttendance != '' && data.classId!= '' && data.divId!= '') {
      this.baseservice.get('addattendancestudentlist?classId=' + data.classId + '&divId=' + data.divId+'&date='+data.dateOfAttendance).subscribe((data) => {
        //this.getStudentList();
      this.addStudentData = data;
        // this.listTemplate();
      },
        (err) => {
          console.log(err);
          //  localStorage.clear();
        });

    }

  }
  public showtablerecord(data) {
    // console.log(data);
    // let dataJSONArray = JSON.parse(data.teacher);
    let i = 1;
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

        template: function (row) {
          return i++;
        },
      }, {
        field: "className",
        title: "Class-Div",
        template: function (row) {

          return row.className + '-' + row.divName;
        },
      }, {
        field: "teacherName",
        title: "Class Teacher",

      }, {
        field: "selectedDate",
        title: "Date",

      }, {
        field: "totalPresent",
        title: "Status",
        template: function (row) {
          return row.totalPresent.toString() + "/" + row.total.toString();

        },
      }, {
        field: "id",
        title: "Action",

        template: function (row) {
          return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="' + row.classId + '*'+row.divId+'*'+row.selectedDate+'"></i></span>';

        }
      }]
    });

    var query = <any>datatable.getDataSourceQuery();

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
      this.getAttendanceData(id);
      //  this.getStudentData(id);
      //this.router.navigate(['/student/profile/', id]); 
    });
  }
  ngAfterViewInit() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/datatables/base/html-table.js');


  }

}
