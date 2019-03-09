import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {BaseService} from '../../../../../_services/base.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./test-marks.html",
  encapsulation: ViewEncapsulation.None,
})
export class TestMarksComponent implements OnInit, AfterViewInit {
  studentData: any = null;
  isValid = false;
  studentEditData:any;
  divisionData:any=null;
  classData:any =null;
  showTemplate: any;
  studentDetail:any;
   addStudentForm : FormGroup;
   editStudentForm : FormGroup;
  constructor(private _script: ScriptLoaderService,private baseservice: BaseService, private router: Router,public fb: FormBuilder) {
    this.getAbsentStudentList();
    
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
    
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/select2.js');
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
      
      $('#m_datepickerSet').datepicker({
        todayHighlight: true,
        templates: {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    });
    $('#m_datepickerSet').on('change', function(){
      console.log(this.addStudentForm);
    });

   
        
   

  }
  public editTemplate(studentData) {
    this.isValid=true;
    console.log('dada')
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
  private getAbsentStudentList() {
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
      var datatable = $('.m_datatable').mDatatable({
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
          field: "teacherId",
          title: "Actions",
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
        //this.router.navigate(['/student/profile/', id]); 
        });
  }
  
}