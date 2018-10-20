import { Component, OnInit, ViewEncapsulation, AfterViewInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { Http, Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
// import * as $ from 'jquery';
declare let $: any;
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./teacher.html",
  encapsulation: ViewEncapsulation.None,
})
export class TeacherComponent implements OnInit, AfterViewInit {
  showTemplate: any;
  teacherDetail: any;
  teacherData: any = null;

  constructor(private _script: ScriptLoaderService,private http: Http, private router: Router) {
    this.getTeacherList();
  }
  ngOnInit() {
    this.showTemplate = "listTemplate";
  }
  listTemplate() {
    this.showTemplate = "listTemplate";
  }
  addTemplate() {
    this.showTemplate = "addTemplate";
  }
  editTemplate(teacherData) {
    this.showTemplate = "editTemplate";
    this.teacherDetail = teacherData;
  }
  detailProfile(id){
    alert(id);
    this.router.navigate(['/teacher/profile/', id]); 
  }
  tableToExcel(table, EmployeeList){
    let uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
        , format = function(s,c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
                }
  ngAfterViewInit() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/select2.js');
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
      

  }
  private getTeacherList() {
    let headers = new Headers({ 'Content-Type': 'application/json','authorization':localStorage.getItem('sauAuth') });
  
let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost:3000/api/teacher',options)
   .map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status < 200 || res.status >= 300) {
           
            throw new Error('This request has failed ' + res.status);
    } 
    // If everything went fine, return the response
    else {
      return res.json();
    }
  })
                 .subscribe((data) => {
                        this.teacherData = data.teacher;
                        this.showtablerecord(data);
                },
                (err) =>{
                        localStorage.clear();
                        
                });
     
               
              }
  
  public showtablerecord(data){
    console.log(data);
     // let dataJSONArray = JSON.parse(data.teacher);
                
      var datatable = $('.m_datatable').mDatatable({
        // datasource definition
        data: {
          type: 'local',
          source: data.teacher,
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
          textAlign: 'center'
        }, {
          field: "firstName",
          title: "Teacher Name",
          template: function (row) {
            console.log(row);
            return '<span (click)="detailProfile('+row.id+')" style="cursor: pointer;" class="teacherFn" data-id="'+row.id+'">'+row.firstName+' '+row.lastName+'</span>';
          },
        }, {
          field: "className",
          title: "Class-Div",
          template: function (row) {
            console.log(row);
            return row.className+'-'+row.divName;
          },
        }, {
          field: "mobileNumber",
          title: "Mob Number",
          
        }, {
          field: "joiningDate",
          title: "Joining Date",
          
        }, {
          field: "lastName",
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
      $('.m_datatable').on('click', '.teacherFn', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
        console.log(id);
        this.router.navigate(['/teacher/profile/', id]); 
        });
  }            
  }
 

    
    
  
