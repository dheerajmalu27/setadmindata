import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { CommonService } from '../../../../../_services/common-api.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {BaseService} from '../../../../../_services/base.service';
import { appVariables } from '../../../../../app.constants';
import * as _ from 'lodash';
declare let $: any
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./student.html",
  encapsulation: ViewEncapsulation.None,
})
export class StudentComponent implements OnInit, AfterViewInit {
  studentData: any = null;
  TitleSet: any = null;
  stateData:any=null;
  cityData:any=null;

  divisionData:any=null;
  classData:any =null;
  showTemplate: any;
  selectedFiles:any;
   addStudentForm : FormGroup;
   
  constructor(private commonservice: CommonService,private _script: ScriptLoaderService, private router: Router,public fb: FormBuilder,private baseservice: BaseService) {
    }
  ngOnInit() {
    this.getStudentList();
    this.addStudentForm = this.fb.group({
      'id' : new FormControl(),
      'firstName' : new FormControl('', Validators.required),
      'middleName' : new FormControl('', Validators.required),
      'lastName' : new FormControl('', Validators.required),
      'image': new FormControl(),
      'dob' : new FormControl(),
      'classId' : new FormControl(),
      'divId' : new FormControl(),
      'nationality': new FormControl('', Validators.required),
      'caste': new FormControl('', Validators.required),
      'religion': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'bloodGroup': new FormControl(),
      'gender' : new FormControl('', Validators.required),
      'motherName' : new FormControl('', Validators.required),
      'stateId' : new FormControl(),
      'cityId' : new FormControl(),
      'motherProf' : new FormControl('', Validators.required),
      'parentNumber' : new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
       'fatherName' : new FormControl('', Validators.required),
       'fatherProf' : new FormControl('', Validators.required),
       'parentNumberSecond' : new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]),
      // 'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    });
    
  
    this.listTemplate();
    }
  listTemplate() {
    $("#addTemplate").hide();
    $("#listTemplate").show();
  }
  addTemplate() {
    this.TitleSet='Add Student';
    this.addStudentForm.reset();
    $("#addTemplate").show();
    $("#listTemplate").hide();
    this.getStateList();
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
    });


  }
  public editTemplate(studentData) {
    this.TitleSet='Edit Student';
  
    this.addStudentForm.reset();
    this.getClassList();
    this.getDivisionList();
    this.getStateList();
    $("#listTemplate").hide();
    $("#addTemplate").hide();
    $("#addTemplate").show();
    this.addStudentForm.setValue({
      id: studentData.id,
      firstName: studentData.firstName,
      middleName: studentData.middleName,
      lastName: studentData.lastName,
      image: studentData.profileImage,
      dob: studentData.dateOfBirth,
      classId: studentData.classId,
      divId: studentData.divId,
      nationality: studentData.nationality,
      caste: studentData.caste,
      religion: studentData.religion,
      address: studentData.address,
      bloodGroup: studentData.bloodGroup,
      gender: studentData.gender,
      motherName: studentData.motherName,
      stateId: studentData.stateId,
      cityId: studentData.cityId,
      motherProf: studentData.motherProf,
      parentNumber: studentData.parentNumber,
      fatherName: studentData.fatherName,
      fatherProf: studentData.fatherProf,
      parentNumberSecond: studentData.parentNumberSecond,
    });
  
   

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
    setTimeout(() => 
    {
      $(".class_select2_drop_down").val(<string>studentData.classId).trigger('change');
      $(".division_select2_drop_down").val(<string>studentData.divId).trigger('change');
      $(".state_select2_drop_down").val(<string>studentData.stateId).trigger('change');
    },
    2000);
    
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
  private getStudentList() {
    this.baseservice.get('student').subscribe((data) => {
      this.studentData = data.student;
      this.showtablerecord(data);
    },
    (err) => {
    //  localStorage.clear();
    });
   
  }
  private getStudentData(Id) {
    this.baseservice.get(<string>('student/'+Id)).subscribe((data) => { 
      this.editTemplate(data.student);
    },
    (err) => {
      //localStorage.clear();
    });
   

  }
  private getStateList() {  
    this.baseservice.get('statelist').subscribe((data) => {
      if(data!=''){
        this.getCityList(data.state[0].id);
      }
      this.stateData = data.state;
      console.log(data.state[0].id);
    (<any>$('.state_select2_drop_down')).select2({data:this.stateData});
   },
   (err) => {
   //  localStorage.clear();
   });
 }
  
  private getCityList(stateId){
    this.baseservice.get('citylist/'+stateId).subscribe((data) => {
      this.cityData = data.city;
    (<any>$('.city_select2_drop_down')).select2({data:this.cityData});
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
    (<any>$('.class_select2_drop_down')).select2({data: this.classData});
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
 (<any>$('.division_select2_drop_down')).select2({data:this.divisionData});
},
(err) => {
//  localStorage.clear();
});   

}
selectFile(event: any) {
  this.selectedFiles = event.target.files[0];
}
public addStudentSubmitForm(data){
  data.stateId=$('.state_select2_drop_down').val();
  data.cityId=$('.city_select2_drop_down').val();
  data.divId=$('.division_select2_drop_down').val();
  data.classId=$('.class_select2_drop_down').val();
  data.dateOfBirth=$("#m_datepickerSet").val();
  console.log(this.selectedFiles);
  
  const formData: FormData = new FormData(data);

if(data.id!=''&& data.id!=undefined && data.id!=null)  {
// data.image=this.selectedFiles;
this.baseservice.put('student/'+data.id,data).subscribe((data) => {
  this.getStudentList();
  this.listTemplate();
},
(err) => {
 console.log(err);
//  localStorage.clear();
});
}else{
// data.image=this.selectedFiles;
delete data.id;
this.baseservice.post('student',data).subscribe((data) => { 
  this.getStudentList();
  this.listTemplate();
},
(err) => {
 console.log(err);
//  localStorage.clear();
});
}
     
}
  public showtablerecord(data){
    // console.log(data);
     // let dataJSONArray = JSON.parse(data.teacher);
     let i=1;                
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
          field: "",
          title: "Sr.No.",
          textAlign: 'center',
          sortable:false,
          template: function (row) {
            return i++;
          },
        }, {
          field: "firstName",
          title: "Student Name",
          template: function (row) {
           
            return '<span (click)="detailProfile('+row.id+')"  class="teacherFn" data-id="'+row.id+'">'+row.firstName+' '+row.lastName+'</span>';
          },
        }, {
          field: "className",
          title: "Class-Div",
          template: function (row) {
           
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
       
       this.getStudentData(id);
        //this.router.navigate(['/student/profile/', id]); 
        });
  }
  
}