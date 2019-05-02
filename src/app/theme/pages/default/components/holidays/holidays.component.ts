import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {BaseService} from '../../../../../_services/base.service';
import { Router } from '@angular/router';
declare let $: any

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./holidays.html",
  encapsulation: ViewEncapsulation.None,
})
export class HolidaysComponent implements OnInit, AfterViewInit {
  showTemplate:any;
  holidayData:any;
  datatable:any;
  addHolidaysForm : FormGroup;
  editHolidaysForm : FormGroup;

  constructor(private _script: ScriptLoaderService,private baseservice: BaseService
    , private router: Router,fb: FormBuilder){
    this.getHolidaysList();
    this.addHolidaysForm = fb.group({
      'holidayDate' : [null, Validators.required],
     
    });
    
    this.editHolidaysForm = fb.group({
      'id' : [null, Validators.required],
      'holidayDate' : [null, Validators.required],
     
    });
    // console.log(this.addHolidaysForm);
    // this.addHolidaysForm.valueChanges.subscribe( (form: any) => {
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
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
  $('#m_datepickerSet').datepicker({
    format: "yyyy-mm-dd",
    todayHighlight: true,
    templates: {
      leftArrow: '<i class="la la-angle-left"></i>',
      rightArrow: '<i class="la la-angle-right"></i>'
    }
    
  });
  var temp = this;
  $('#m_datepickerSet').on('change', function () {
    console.log(this.value);
    temp.addHolidaysForm.controls['holidayDate'].setValue(this.value);
  });
    $("#addTemplate").show();
    $("#editTemplate").hide();
    $("#listTemplate").hide();
  }
  editTemplate() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
  $('#m_datepickerSet1').datepicker({
    format: "yyyy-mm-dd",
    todayHighlight: true,
    templates: {
      leftArrow: '<i class="la la-angle-left"></i>',
      rightArrow: '<i class="la la-angle-right"></i>'
    }
  });
  var temp = this;
  $('#m_datepickerSet1').on('change', function () {
    console.log(this.value);
    temp.editHolidaysForm.controls['holidayDate'].setValue(this.value);
  });
    $("#addTemplate").hide();
    $("#editTemplate").show();
    $("#listTemplate").hide();
  }
 
  private editHolidaysData(data){
    let excludeData  = data.split('*');
   
    this.editHolidaysForm.controls['id'].setValue(excludeData[0]);
    this.editHolidaysForm.controls['holidayDate'].setValue(excludeData[1]);
    this.editTemplate();
  }
  addHolidaysSubmitForm(data: any){
    this.baseservice.post('holidays',data).subscribe((result) => { 
      this.datatable.destroy();
      this.getHolidaysList();
      this.listTemplate();
    },
    (err) => { 
    //  localStorage.clear();
    });
  }
  editHolidaysSubmitForm(data: any){
    this.baseservice.put('holidays/'+data.id,data).subscribe((result) => { 
      this.datatable.destroy();
      this.getHolidaysList();
      this.listTemplate();
    },
    (err) => {
    
    //  localStorage.clear();
    });
  }
  private getHolidaysList() {
    this.baseservice.get('holidays').subscribe((data) => {
      this.holidayData = data.holidays;
      this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });


  }
  public showtablerecord(data){
 
     
      var iValue=0;           
       this.datatable = $('.m_datatable').mDatatable({
        
         data: {
           type: 'local',
           source: data.holidays,
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
           template: function () {
            return iValue=iValue+1;
          }
         }, {
           field: "holidayDate",
           title: "Date",
           
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
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="' + row.id + '*'+row.holidayDate+'"></i></span>';
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
        this.editHolidaysData(id);
        //  this.getStudentData(id);
        //this.router.navigate(['/student/profile/', id]); 
      });
   }
}
