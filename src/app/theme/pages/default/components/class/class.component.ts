import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {BaseService} from '../../../../../_services/base.service';
import { Router } from '@angular/router';
declare let $: any

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./class.html",
  encapsulation: ViewEncapsulation.None,
})
export class ClassComponent implements OnInit, AfterViewInit {
  showTemplate:any;
  classData:any;
  datatable: any ;
  addClassForm : FormGroup;
  editClassForm : FormGroup;

  constructor(private _script: ScriptLoaderService,private baseservice: BaseService
    , private router: Router,fb: FormBuilder){
    this.getClassList();
    this.addClassForm = fb.group({
      'className' : [null, Validators.required],
      
    });
    this.editClassForm = fb.group({
      'id' : [null, Validators.required], 
      'className' : [null, Validators.required],
     
    });
    // console.log(this.addClassForm);
    // this.addClassForm.valueChanges.subscribe( (form: any) => {
    //   console.log('form changed to:', form);
    // }
    // );
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
    
    // this.studentDetail = studentData;
    
  }
  addClassSubmitForm(data: any){
    this.baseservice.post('class',data).subscribe((result) => { 
      this.datatable.destroy();
      this.getClassList();
      this.listTemplate();
    },
    (err) => {
    
    //  localStorage.clear();
    });
  }
  editClassSubmitForm(data: any){
    
    this.baseservice.put('class/'+data.id,data).subscribe((result) => { 
      this.datatable.destroy();
      this.getClassList();
      this.listTemplate();
    },
    (err) => {
    
    //  localStorage.clear();
    });
  }
  private getClassList() {
    this.baseservice.get('class').subscribe((data) => {
      this.classData = data.class;
      this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  private editClassData(data){
    let excludeData  = data.split('*');
   
    this.editClassForm.controls['id'].setValue(excludeData[0]);
    this.editClassForm.controls['className'].setValue(excludeData[1]);
    this.editTemplate();
  }
  public showtablerecord(data){
    let i = 1;
     // let dataJSONArray = JSON.parse(data.teacher);
                
      this.datatable = $('.m_datatable').mDatatable({
        // datasource definition
        data: {
          type: 'local',
          source: data.class,
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
          title: "Class Name",
          template: function (row) {
          
            return row.className;
          },
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
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="' + row.id + '*'+row.className+'"></i></span>';
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
  
      $('.m_datatable').on('click', '.edit-button', (e) => {
        e.preventDefault();
        var id = $(e.target).attr('data-id');
        this.editClassData(id);
        //  this.getStudentData(id);
        //this.router.navigate(['/student/profile/', id]); 
      });
  }
}
