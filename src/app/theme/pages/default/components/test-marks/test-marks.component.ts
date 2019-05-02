import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {BaseService} from '../../../../../_services/base.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./test-marks.html",
  encapsulation: ViewEncapsulation.None,
})
export class TestMarksComponent implements OnInit, AfterViewInit {
  studentData: any = null;
  isValid = false;
  datatable:any=null;
  addStudentData:any;
  divisionData:any=null;
  classData:any =null;
  editStudentData: any = null;
  showTemplate: any;
  studentDetail:any;
  addTestmarksFormList: FormGroup;
  constructor(private _script: ScriptLoaderService,private baseservice: BaseService, private router: Router,public fb: FormBuilder) {
    this.getTestmarksList();
    
    }
  ngOnInit() {
    this.listTemplate();
    this.addTestmarksFormList = this.fb.group({
      'testId': new FormControl(),
      'subId': new FormControl(),
      'classId': new FormControl(),
      'divId': new FormControl(),
    });
    }
  listTemplate() {
    $("#addTemplate").hide();
    $("#editTemplate").hide();
    $("#listTemplate").show();
  }
  addTemplate() {
    $("#addTemplate").show();
    $("#addTestmarksForm1").show();
    $("#addTestmarksForm2").hide();
    $("#editTemplate").hide();
    $("#listTemplate").hide();
    this.getClassList();
    this.getDivisionList();
    
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/select2.js');
   
  }
  public editTemplate() {
    this.isValid=true;
  
    $("#addTemplate").hide();
    $("#editTemplate").show();
    $("#listTemplate").hide();
  
      
  }


  tableToExcel(table){
    let uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
        , format = function(s,c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
                }
  ngAfterViewInit() {
    
    
  }
  private getClassList() {

    var select2: any;
    var resultArray: Array<any> = [];
    this.baseservice.get('classlist').subscribe((data) => {
      this.classData = data.class;
      (<any>$('.class_select2_drop_down')).select2({ data: this.classData });
      this.getSubjectTestList(this.classData[0].id);
    },
      (err) => {
        //  localStorage.clear();
      });
  }
  private getDivisionList() {
    this.baseservice.get('divisionlist').subscribe((data) => {
      this.divisionData = data.division;
      (<any>$('.division_select2_drop_down')).select2({ data: this.divisionData });
    },
      (err) => {
        //  localStorage.clear();
      });

  }

  private getSubjectTestList(classId) {
    // var classId = $('.class_select2_drop_down').val();
    this.baseservice.get('getsubjecttestlist?classId=' +classId).subscribe((result) => {

      (<any>$('.test_select2_drop_down')).select2({ data: result.testlist });
      (<any>$('.subject_select2_drop_down')).select2({ data: result.subjectlist });
    },
      (err) => {
        //  localStorage.clear();
      });

  }
  addStudentTestmarksSumitForm(data){
    console.log(data);
    var newArrData = _.map(data, function(o) {
      // o.TestmarksResult=JSON.parse(o.TestmarksResult);
      return _.omit(o, ['studentName', 'className','divName','rollNo','subName','teacherName']); });
    
     let postdata=JSON.stringify(newArrData);
    this.baseservice.post('bulktestmarks',postdata).subscribe((data) => { 
      this.datatable.destroy();
      this.getTestmarksList();
      this.listTemplate();
    },
    (err) => {
     console.log(err);
    //  localStorage.clear();
    });
  }
  editStudentTestmarksSumitForm(data){
    
    var newArrData = _.map(data, function(o) {
      // o.TestmarksResult=JSON.parse(o.TestmarksResult);
      return _.omit(o, ['TestmarksStudent', 'TestmarksClass','TestmarksDivision','TestmarksSubject','TestmarksTeacher','createdAt','updatedAt']); });
    let postdata=JSON.stringify(newArrData);
    this.baseservice.post('bulktestmarks',postdata).subscribe((data) => {     
      this.datatable.destroy();
      this.getTestmarksList();
      this.listTemplate();
    },
    (err) => {
     console.log(err);
    //  localStorage.clear();
    });
  }

  setTotalVal(data){
      $('.totalmarksval').val(data); 
  }
  private getTestMarksStudentData(data){
 
    let excludeData  = data.split('*');
  this.getStudentTestMarksList(excludeData);    
    }
    private getStudentTestMarksList(data){ 
      this.baseservice.get('getbyrecordtestmarks?classId=' + data[0] + '&divId=' + data[1]+'&testId='+data[2]+'&subId='+data[3]).subscribe((data) => {  
        this.editStudentData = data.testmarksstudentlist; 

        this.editTemplate();   
      },
        (err) => {
          console.log(err);        
        });
    
  }
  setMarksVal(data,maxvalue){
    if(data.value>maxvalue){
      data.value=0;
    }
  }
  public addTestmarksSubmitForm(data) {

    data.divId = $('.division_select2_drop_down').val();
    data.classId = $('.class_select2_drop_down').val();
    data.testId = $('.test_select2_drop_down').val();
    data.subId = $('.subject_select2_drop_down').val();
     if (data.dateOfTestmarks != '' && data.classId!= '' && data.divId!= '') {
      this.baseservice.get('getaddtestmarkstudentlist?classId=' + data.classId + '&divId=' + data.divId+'&testId='+data.testId+'&subId='+data.subId).subscribe((data) => {
        $("#addTestmarksForm1").hide();
        $("#addTestmarksForm2").show();
       
      this.addStudentData = data;
        // this.listTemplate();
      },
        (err) => {
          console.log(err);
          //  localStorage.clear();
        });

    }

  }

  private getTestmarksList() {
    this.baseservice.get('gettestmarkslist').subscribe((data) => {
      this.studentData = data;
      this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  
  
  public showtablerecord(data){
      let i=1;         
      this.datatable = $('.m_datatable').mDatatable({
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
          title: "Sr.No.",
          textAlign: 'center',
         
          template: function (row) {
            return i++;
          },
        }, {
          field: "testName",
          title: "Test Name",
        }, {
          field: "className",
          title: "Class-Div",
          template: function (row) {
            return row.className+'-'+row.divName;
          },
        }, {
          field: "subName",
          title: "Subject Name",
        }, {
          field: "teacherName",
          title: "Teacher Name",  
        },
        {
          field: "average",
          title: "Average-Total", 
          template: function (row) {
            return row.average+'-'+row.totalMarks;
          }, 
        },
        
         {
          field: "subId",
          title: "Actions",
          template: function (row) {
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="'+row.classId+ '*'+row.divId+'*'+row.testId+'*'+row.subId+'"></i></span>';
           
           
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
      $('.m_datatable').on('click', '.teacherFn', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
       
        this.router.navigate(['/student/profile/', id]); 
        });
       $('.m_datatable').on('click', '.edit-button', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
        this.getTestMarksStudentData(id);
        //this.router.navigate(['/student/profile/', id]); 
        });
  }
  
}