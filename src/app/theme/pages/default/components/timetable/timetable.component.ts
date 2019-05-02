import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
declare let $: any
import 'fullcalendar';
declare var moment: any;
declare var mApp:any;
// import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import {BaseService} from '../../../../../_services/base.service';
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./timetable.html",
  encapsulation: ViewEncapsulation.None,
})
export class TimeTableComponent implements OnInit, AfterViewInit {
  // calendarOptions: Options;
  // @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public test_date: any;
  subjectList:any= null;
  timeTableData: any = null;
  isValid = false;
  datatable:any=null;
  calendarData:any=Array;
  divisionData:any=null;
  classData:any =null;
  editclassId: any = null;
  editdivId: any = null;
  showTemplate: any;
  studentDetail:any;
  addTimetableFormList: FormGroup;
 
  public datavalue;
  
  public id: string;

  constructor(private _script: ScriptLoaderService,private baseservice: BaseService, private router: Router,public fb: FormBuilder) {
this.getTimeTableList();
  }
  ngOnInit() {
   
    this.listTemplate();
    this.addTimetableFormList = this.fb.group({
       'classId': new FormControl(),
        'divId': new FormControl(),
      });

  }
  ngAfterViewInit() {
    this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
      'assets/vendors/custom/jquery-ui/jquery-ui.bundle.js');
    //   var tmp=this;
    //   jQuery(document).ready(function() {
    //     tmp.openCalender();
    // });
   
  }
  listTemplate() {
    $("#addTemplate").hide();
    $("#editTemplate").hide();
    $("#listTemplate").show();
  }
  addTemplate() {
    $("#addTemplate").show();
    $("#addTimetableForm1").show();
    $("#addTimetableForm2").hide();
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

  private getClassList() {
 this.baseservice.get('classlist').subscribe((data) => {
      this.classData = data.class;
      (<any>$('.class_select2_drop_down')).select2({ data: this.classData });
     
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

       
     this.subjectList=result.subjectlist ;
     $("#addTimetableForm1").hide();
        $("#addTimetableForm2").show();
        this.openCalender(this.calendarData);
        var tmp=this;
        setTimeout(function(){ tmp.externalEvents(); }, 2000);
        
    },
      (err) => {
        //  localStorage.clear();
      });

  }
  private getTimeTableList() {
    this.baseservice.get('gettimetablelist').subscribe((data) => {
      this.timeTableData = data.timetabledatalist;
      this.showtablerecord(data.timetabledatalist);
    },
    (err) => {
    //  localStorage.clear();
    });
  }

  public addTimetableSubmitForm(data) {

    data.divId = $('.division_select2_drop_down').val();
    data.classId = $('.class_select2_drop_down').val();
     if (data.classId!= '' && data.divId!= '') {
        this.calendarData=[];
        this.getSubjectTestList(data.classId);
       
    }

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
        field: "className",
        title: "Class Name",
      },  {
        field: "divName",
        title: "division Name",
      }, {
        field: "classId",
        title: "Actions",
        template: function (row) {
          return '<span  class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" > <i class="edit-button la la-edit" data-id="'+row.classId+ '*'+row.divId+'"></i></span>';
         
         
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
      this.getTimeTableData(id);
      //this.router.navigate(['/student/profile/', id]); 
      });
}
private getTimeTableData(data){
 
    let excludeData  = data.split('*');
  this.getTimeTableDataList(excludeData);    
    }
    private getTimeTableDataList(Arraydata){ 
       this.editclassId=Arraydata[0];
       this.editdivId=Arraydata[1];
      this.baseservice.get('gettimetable?classId=' + Arraydata[0] + '&divId=' + Arraydata[1]).subscribe((data) => {  
        
        var resultArray: Array<any> = [];
        _.forOwn(data.classtimetabledata, function(value, key) {
        
          resultArray.push(
            {
              "id":value.id,
              "title": value.title,
              "description":"Lecture "+value.title+" taken by "+value.teacherName,
              "start":moment().startOf('week').add('days', value.dayId).format("YYYY-MM-DD")+" "+value.start,
              
              "end":moment().startOf('week').add('days', value.dayId).format("YYYY-MM-DD")+" "+value.end,
              "dow":[value.dayId],
              
              "classId":value.classId,
              "divId":value.divId,
              "subId":value.subId,
               "dayId":value.dayId,
               "teacherId":value.teacherId
            });
        });
        this.calendarData=resultArray;
        
        this.addTemplate(); 
        
        
        $("#addTimetableForm1").hide();
        $("#addTimetableForm2").show();
        this.getSubjectTestList(this.editclassId);
        
      },
        (err) => {
          console.log(err);        
        });
    
  } 



  private openCalender(data) {
      var tmpMain=this;
      var subID=null;
    $('#m_calendar').fullCalendar({
        timeZone: 'UTC',
        defaultTimedEventDuration: '00:30:00',
    forceEventDuration: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,listWeek'
      },
      defaultView: 'agendaWeek',
      hiddenDays: [ 0 ] ,
      allDaySlot: false,
      minTime:'10:00:00',
      maxTime:'17:00:00',
    slotDuration: '00:05:00',
    slotLabelInterval: 5,
    slotMinutes: 5,
    slotEventOverlap:false,
      // defaultDate: '2018-01-12',
      navLinks: true, // can click day/week names to navigate views
      height: 900,
      eventLimit: true, // allow "more" link when too many events
      events:data,
      draggable:true,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventReceive: function(event, view) {
        
       let ind= _.findIndex(tmpMain.subjectList, {text: event.title});
       if(ind!=-1){
         subID=tmpMain.subjectList[ind].id;
       }else{
        subID=null;
       }
        event.subId=subID;
        $('#m_calendar').fullCalendar('updateEvent', event);

    //   alert("Dropped event: " + event['title']);  // any data linked to the dropped event 
  },
//    

    eventRender: function(event, element) {
      // default render
      if (element.hasClass('fc-day-grid-event')) {
          element.data('content', event.description);
          element.data('placement', 'top');
          mApp.initPopover(element);
      } else if (element.hasClass('fc-time-grid-event')) {
          element.find('.fc-title').append('<div class="fc-description">' + event.description + '</div>');
      } else if (element.find('.fc-list-item-title').lenght !== 0) {
          element.find('.fc-list-item-title').append('<div class="fc-description">' + event.description + '</div>');
      }
  }
    });

    
  }

  public externalEvents(){
    $('#m_calendar_external_events .fc-event').each(function() {
       
        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: false, // maintain when user navigates (see docs on the renderEvent method)
            className: $(this).data('color'),
            description: ''
        });
  
        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0 //  original position after the drag
        });
  });
  }
  public showSubjectList(){
    $('#m_user_profile_tab_3').show();
  }

  public saveTimeTable(){
    var events = $('#m_calendar').fullCalendar('clientEvents');
    var resultArray: Array<any> = [];
    _.forOwn(events, function(value, key) {
        var start_time =moment(value.start._i).format("HH:mm");
        var end_time =moment(value.end._i).format("HH:mm"); 
       resultArray.push(
        {
          
          "id": value.id,
          "divId":this.editdivId,
          "subId":value.subId,
          "classId":this.editclassId,
          "dayId":moment(value.start._i).day(),
          "timeSlot":start_time+'-'+end_time,
        });
    });
   
let postdata=JSON.stringify(resultArray);
    this.baseservice.post('bulktimetable',postdata).subscribe((data) => { 
      this.datatable.destroy();
      this.getTimeTableList();
      this.listTemplate();
    },
    (err) => {
     console.log(err);
    //  localStorage.clear();
    });
  }

}
