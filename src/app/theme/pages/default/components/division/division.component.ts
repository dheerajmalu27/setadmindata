import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {BaseService} from '../../../../../_services/base.service';
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
  datatable: any ;
  addDivisionForm : FormGroup;
  editDivisionForm : FormGroup;

  constructor(private _script: ScriptLoaderService,private baseservice: BaseService, private router: Router,fb: FormBuilder){
    this.getDivisionList();
    this.addDivisionForm = fb.group({
      'divName' : [null, Validators.required],
    });
    this.editDivisionForm = fb.group({
      'id' : [null, Validators.required], 
      'divName' : [null, Validators.required],
     
    });
   
  }
  ngOnInit() {
    this.listTemplate();
  }
  ngAfterViewInit() {
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
  editTemplate() {
    $("#addTemplate").hide();
    $("#editTemplate").show();
    $("#listTemplate").hide();
    
  
    
  }
  addDivisionSubmitForm(data: any){
    this.baseservice.post('division',data).subscribe((result) => { 
      this.datatable.destroy();
      this.getDivisionList();
      this.listTemplate();
    },
    (err) => { 
    //  localStorage.clear();
    });
  }
  editDivisionSubmitForm(data: any){
    this.baseservice.put('division/'+data.id,data).subscribe((result) => { 
      this.datatable.destroy();
      this.getDivisionList();
      this.listTemplate();
    },
    (err) => {
    
    //  localStorage.clear();
    });
  }
  private editDivisionData(data){
    let excludeData  = data.split('*');
   
    this.editDivisionForm.controls['id'].setValue(excludeData[0]);
    this.editDivisionForm.controls['divName'].setValue(excludeData[1]);
    this.editTemplate();
  }
  private getDivisionList() {
    this.baseservice.get('division').subscribe((data) => {
      this.divisionData = data.division;
      this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  public showtablerecord(data){              
      this.datatable = $('.m_datatable').mDatatable({
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
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="' + row.id + '*'+row.divName+'"></i></span>';
          }
        }]
      });
  
      var query = this.datatable.getDataSourceQuery();
  
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
        this.editDivisionData(id);
        //  this.getStudentData(id);
        //this.router.navigate(['/student/profile/', id]); 
      });
  }
}
