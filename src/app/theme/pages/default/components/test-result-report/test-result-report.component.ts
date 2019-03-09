import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {BaseService} from '../../../../../_services/base.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./test-result-report.html",
  encapsulation: ViewEncapsulation.None,
})
export class testResultReportComponent implements OnInit, AfterViewInit {
  studentData: any = null;
  isValid = false;
  studentEditData:any;
  divisionData:any=null;
  classData:any =null;
  showTemplate: any;
  studentDetail:any;
   addStudentForm : FormGroup;
   editStudentForm : FormGroup;
  constructor(private _script: ScriptLoaderService,private baseservice: BaseService
    , private router: Router,public fb: FormBuilder) {
    this.getStudentList();
      // console.log(this.addStudentForm);
      // this.addStudentForm.valueChanges.subscribe( (form: any) => {
      //   console.log('form changed to:', form);
      // }
      // );
    }
  ngOnInit() {
    
    this.addStudentForm = this.fb.group({
      'firstName' : new FormControl('', Validators.required),
      'middleName' : new FormControl('', Validators.required),
      'lastName' : new FormControl('', Validators.required),
      'dob' : new FormControl('', Validators.required),
      'gender' : new FormControl('', Validators.required),
      'motherName' : new FormControl('', Validators.required),
      'stateId' : new FormControl('', Validators.required),
      'cityId' : new FormControl('', Validators.required),
      // 'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      // 'gender' : [null, Validators.required],
      // 'hiking' : [false],
      // 'running' : [false],
      // 'swimming' : [false]
    });
    this.editStudentForm = this.fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      // 'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      // 'gender' : [null, Validators.required],
      // 'hiking' : [false],
      // 'running' : [false],
      // 'swimming' : [false]
    });
  
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
    this.getClassList();
    this.getDivisionList();
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
      // this.addStudentForm.controls['dob'].updateValue('sd');
      // this.addStudentForm.controls['dob'].patchValue(survey.account);
      // (<FormGroup>this.addStudentForm).setValue($('#m_datepickerSet').val());
      // this.addStudentForm.patchValue({'dob': 'datevalue'});
    //   var datevalue=$(this).val();
    //   if(datevalue.length!=0){
    //     (<FormGroup>this.addStudentForm.controls).patchValue({'dob': datevalue});
    // }
    });

    //   $( "#m_form_1" ).validate({
    //     // define validation rules
    //     rules: {
    //         firstName: {
    //             required: true,
    //         },
    //         middleName: {
    //             required: true 
    //         },
    //         lastName: {
    //           required: true 
    //         },
    //         dob: {
    //           required: true 
    //         },
    //           motherName: {
    //             required: true 
    //         },
    //         gender:{
    //           required: true 
    //         },
    //         state: {
    //           required: true 
    //         },
    //         city: {
    //           required: true 
    //         },
    //         address: {
    //           required: true 
    //         },
    //         pincode: {
    //           required: true 
    //         },
    //         fatherQual: {
    //           required: true 
    //         },
    //         fatherProf: {
    //           required: true 
    //         },
    //         motherQual: {
    //           required: true 
    //         },
    //         motherProf: {
    //           required: true 
    //         },
    //         mobileNo1: {
    //           required: true 
    //         },
    //         mobileNo2: {
    //           required: true 
    //         },
    //         classId: {
    //           required: true 
    //         },
    //         divId: {
    //           required: true 
    //         },
          
    //     },
        
    //     //display error alert on form submit  
    //     invalidHandler: function(event, validator) {     
    //         var alert = $('#m_form_1_msg');
    //         alert.removeClass('m--hide').show();
    //       //  mApp.scrollTo(alert, -200);
    //     },

    //     submitHandler: function (form) {
    //         //form[0].submit(); // submit the form
    //     }
    // }); 

  }
  public editTemplate(studentData) {
    this.isValid=true;
    console.log('dada')
    $("#addTemplate").hide();
    $("#editTemplate").show();
    $("#listTemplate").hide();
    this.getClassList();
    this.getDivisionList();
    this.studentDetail = studentData;
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/select2.js');
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
      $( "#m_form_2" ).validate({
        // define validation rules
        rules: {
            firstName: {
                required: true,
            },
            middleName: {
                required: true 
            },
            lastName: {
              required: true 
            },
            dob: {
              required: true 
            },
              motherName: {
                required: true 
            },
            gender:{
              required: true 
            },
            state: {
              required: true 
            },
            city: {
              required: true 
            },
            address: {
              required: true 
            },
            pincode: {
              required: true 
            },
            fatherQual: {
              required: true 
            },
            fatherProf: {
              required: true 
            },
            motherQual: {
              required: true 
            },
            motherProf: {
              required: true 
            },
            mobileNo1: {
              required: true 
            },
            mobileNo2: {
              required: true 
            },
            classId: {
              required: true 
            },
            divId: {
              required: true 
            },
          
        },
        
        //display error alert on form submit  
        invalidHandler: function(event, validator) {     
            var alert = $('#m_form_2_msg');
            alert.removeClass('m--hide').show();
          //  mApp.scrollTo(alert, -200);
        },

        submitHandler: function (form) {
            //form[0].submit(); // submit the form
        }
    });
  }
  ngAfterViewInit() {
    
    
  }
  private getStudentList() {
    this.baseservice.get('student').subscribe((data) => {
      this.studentData = data.student;
        this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  
  private getDivisionList() {
    this.baseservice.get('division').subscribe((data) => {
      this.divisionData = data.division;
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  private getClassList() {
    this.baseservice.get('class').subscribe((data) => {
      this.classData = data.class;
    },
    (err) => {
    //  localStorage.clear();
    });
  }
  public showtablerecord(data){
    // console.log(data);
     // let dataJSONArray = JSON.parse(data.teacher);
                
      var datatable = $('.m_datatable').mDatatable({
        // datasource definition
        data: {
          type: 'local',
          source: data.student,
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
          title: "Student Name",
          template: function (row) {
            console.log(row);
            return '<span (click)="detailProfile('+row.id+')"  class="teacherFn" data-id="'+row.id+'">'+row.firstName+' '+row.lastName+'</span>';
          },
        }, {
          field: "className",
          title: "Class-Div",
          template: function (row) {
            console.log(row);
            return row.className+'-'+row.divName;
          },
        }, {
          field: "fatherName",
          title: "Father Name ",
          
        }, {
          field: "parentNumber",
          title: "Mob Number",
          
        }, {
          field: "lastName",
          title: "Actions",
         
          template: function (row) {
            return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="'+row.id+'"></i></span>';
            // var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
  
            // return '\
            //   <div class="dropdown ' + dropup + '">\
            //     <a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
            //                       <i class="la la-ellipsis-h"></i>\
            //                   </a>\
            //       <div class="dropdown-menu dropdown-menu-right">\
            //         <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
            //         <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
            //         <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
            //       </div>\
            //   </div>\
            //   <a href="#"  class="edit-button btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View ">\
            //                   <i class="la la-edit"></i>\
            //               </a>\
            // ';
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
  
}