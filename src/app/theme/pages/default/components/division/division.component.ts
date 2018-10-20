import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { Http, Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
import { Router } from '@angular/router';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./division.html",
  encapsulation: ViewEncapsulation.None,
})
export class DivisionComponent implements OnInit, AfterViewInit {
  showTemplate:any;
  divisionData:any;

  constructor(private _script: ScriptLoaderService, private http: Http, private router: Router) {
    this.getClassList();
  }
  ngOnInit() {
    this.showTemplate = "listTemplate";
  }
  ngAfterViewInit() {
    this.showTemplate = "listTemplate";
 
  }
  listTemplate() {
    this.showTemplate = "listTemplate";
  }
  addTemplate() {
    this.showTemplate = "addTemplate";
   
   
   

  }
  editTemplate(studentData) {
    this.showTemplate = "editTemplate";
    // this.studentDetail = studentData;
    
  }
  addDivisionRecord(){
    $( "#m_form_1" ).validate({
      // define validation rules
      rules: {
          email: {
              required: true,
              email: true 
          },
          url: {
              required: true 
          },
          digits: {
              required: true,
              digits: true
          },
          creditcard: {
              required: true,
              creditcard: true 
          },
          phone: {
              required: true,
              phoneUS: true 
          },
          option: {
              required: true
          },
          options: {
              required: true,
              minlength: 2,
              maxlength: 4
          },
          memo: {
              required: true,
              minlength: 10,
              maxlength: 100
          },

          checkbox: {
              required: true
          },
          checkboxes: {
              required: true,
              minlength: 1,
              maxlength: 2
          },
          radio: {
              required: true
          }
      },
      
      //display error alert on form submit  
      invalidHandler: function(event, validator) {     
          var alert = $('#m_form_1_msg');
          alert.removeClass('m--hide').show();
          $(document).scrollTo(alert, -200);
      },

      submitHandler: function (form) {
        console.log(form);
          //form[0].submit(); // submit the form
      }
  });
  }
  private getClassList() {
    let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('sauAuth') });

    let options = new RequestOptions({ headers: headers });
    let StudentData = this.http.get('http://localhost:3000/api/division', options)
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
        this.divisionData = data.division;
        this.showtablerecord(data);
        console.log(this.divisionData);
      },
      (err) => {
        localStorage.clear();

      });


  }
  public showtablerecord(data){
   console.log(data.division);
     // let dataJSONArray = JSON.parse(data.teacher);
                
      var datatable = $('.m_datatable').mDatatable({
        // datasource definition
        data: {
          type: 'local',
          source: data.division,
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
          field: "divName",
          title: "Division Name",
          
        }, {
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
