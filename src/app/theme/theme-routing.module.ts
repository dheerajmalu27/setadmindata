import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
  {
    "path": "",
    "component": ThemeComponent,
    "canActivate": [AuthGuard],
    "children": [
      {
        "path": "dashboard",
        "loadChildren": ".\/pages\/default\/components\/dashboard\/dashboard.module#DashboardModule"
      },
      {
        "path": "teacher",
        "loadChildren": ".\/pages\/default\/components\/teacher\/teacher.module#TeacherModule"
      },
      {
        "path": "teacher-leave",
        "loadChildren": ".\/pages\/default\/components\/teacher-leave\/teacher-leave.module#TeacherLeaveModule"
      },
      {
        "path": "teacher\/profile\/:id",
        "loadChildren": ".\/pages\/default\/components\/teacher-profile\/teacher-profile.module#TeacherProfileModule"
      },
//student section
      {
        "path": "student",
        "loadChildren": ".\/pages\/default\/components\/student\/student.module#StudentModule"
      },
      {
        "path": "absent-student",
        "loadChildren": ".\/pages\/default\/components\/absent-student\/absent-student.module#AbsentStudentModule"
      },
     
      {
        "path": "student\/profile\/:id",
        "loadChildren": ".\/pages\/default\/components\/student-profile\/student-profile.module#StudentProfileModule"
      },
     // attendence section
      {
        "path": "attendance",
        "loadChildren": ".\/pages\/default\/components\/attendance\/attendance.module#AttendanceModule"
      },  
      {
        "path": "pending-attendance-record",
        "loadChildren": ".\/pages\/default\/components\/pending-attendance-record\/pending-attendance-record.module#PendingAttendanceRecordModule"
      },
      {
        "path": "today-absent-student",
        "loadChildren": ".\/pages\/default\/components\/today-absent-student\/today-absent-student.module#TodayAbsentStudentModule"
      },
     // test marks section
     {
      "path": "test-marks",
      "loadChildren": ".\/pages\/default\/components\/test-marks\/test-marks.module#TestMarksModule"
    },
    {
      "path": "pending-marks-test",
      "loadChildren": ".\/pages\/default\/components\/pending-marks-test\/pending-marks-test.module#PendingMarksTestModule"
    }, 
    //timetable section
    {
      "path": "timetable",
      "loadChildren": ".\/pages\/default\/components\/timetable\/timetable.module#TimeTableModule"
    }, 

      // Setting section 
      {
        "path": "class",
        "loadChildren": ".\/pages\/default\/components\/class\/class.module#ClassModule"
      },
      {
        "path": "class-subject-test",
        "loadChildren": ".\/pages\/default\/components\/class-subject-test\/class-subject-test.module#ClassSubjectTestModule"
      },
      {
        "path": "division",
        "loadChildren": ".\/pages\/default\/components\/division\/division.module#DivisionModule"
      },
      {
        "path": "subject",
        "loadChildren": ".\/pages\/default\/components\/subject\/subject.module#SubjectModule"
      },   
      {
        "path": "test",
        "loadChildren": ".\/pages\/default\/components\/test\/test.module#TestModule"
      },
      {
        "path": "holidays",
        "loadChildren": ".\/pages\/default\/components\/holidays\/holidays.module#HolidaysModule"
      },
     //report section
      {
        "path": "attendance-report",
        "loadChildren": ".\/pages\/default\/components\/attendance-report\/attendance-report.module#AttendanceReportModule"
      },
      {
        "path": "test-result-report",
        "loadChildren": ".\/pages\/default\/components\/test-result-report\/test-result-report.module#testResultReportModule"
      },
      {
        "path": "final-result-report",
        "loadChildren": ".\/pages\/default\/components\/final-result-report\/final-result-report.module#finalResultReportModule"
      },

      // bus track Section
      {
        "path": "bus-track",
        "loadChildren": ".\/pages\/default\/components\/bus-track\/bus-track.module#BusTrackModule"
      },
     
     
     
      {
        "path": "index",
        "loadChildren": ".\/pages\/default\/index\/index.module#IndexModule"
      },
     
      {
        "path": "components\/icons\/flaticon",
        "loadChildren": ".\/pages\/default\/components\/icons\/icons-flaticon\/icons-flaticon.module#IconsFlaticonModule"
      },
      {
        "path": "components\/icons\/fontawesome",
        "loadChildren": ".\/pages\/default\/components\/icons\/icons-fontawesome\/icons-fontawesome.module#IconsFontawesomeModule"
      },
      {
        "path": "components\/icons\/lineawesome",
        "loadChildren": ".\/pages\/default\/components\/icons\/icons-lineawesome\/icons-lineawesome.module#IconsLineawesomeModule"
      },
      {
        "path": "components\/icons\/socicons",
        "loadChildren": ".\/pages\/default\/components\/icons\/icons-socicons\/icons-socicons.module#IconsSociconsModule"
      },
      {
        "path": "components\/portlets\/base",
        "loadChildren": ".\/pages\/default\/components\/portlets\/portlets-base\/portlets-base.module#PortletsBaseModule"
      },
      {
        "path": "components\/portlets\/advanced",
        "loadChildren": ".\/pages\/default\/components\/portlets\/portlets-advanced\/portlets-advanced.module#PortletsAdvancedModule"
      },
      {
        "path": "components\/portlets\/creative",
        "loadChildren": ".\/pages\/default\/components\/portlets\/portlets-creative\/portlets-creative.module#PortletsCreativeModule"
      },
      {
        "path": "components\/portlets\/tabbed",
        "loadChildren": ".\/pages\/default\/components\/portlets\/portlets-tabbed\/portlets-tabbed.module#PortletsTabbedModule"
      },
      {
        "path": "components\/portlets\/draggable",
        "loadChildren": ".\/pages\/default\/components\/portlets\/portlets-draggable\/portlets-draggable.module#PortletsDraggableModule"
      },
      {
        "path": "components\/portlets\/tools",
        "loadChildren": ".\/pages\/default\/components\/portlets\/portlets-tools\/portlets-tools.module#PortletsToolsModule"
      },
      {
        "path": "components\/widgets\/general",
        "loadChildren": ".\/pages\/default\/components\/widgets\/widgets-general\/widgets-general.module#WidgetsGeneralModule"
      },
      {
        "path": "components\/widgets\/chart",
        "loadChildren": ".\/pages\/default\/components\/widgets\/widgets-chart\/widgets-chart.module#WidgetsChartModule"
      },  
      {
        "path": "components\/charts\/amcharts\/charts",
        "loadChildren": ".\/pages\/default\/components\/charts\/amcharts\/amcharts-charts\/amcharts-charts.module#AmchartsChartsModule"
      },
      {
        "path": "components\/charts\/amcharts\/stock-charts",
        "loadChildren": ".\/pages\/default\/components\/charts\/amcharts\/amcharts-stock-charts\/amcharts-stock-charts.module#AmchartsStockChartsModule"
      },
      {
        "path": "components\/charts\/amcharts\/maps",
        "loadChildren": ".\/pages\/default\/components\/charts\/amcharts\/amcharts-maps\/amcharts-maps.module#AmchartsMapsModule"
      },
     
      {
        "path": "components\/maps\/google-maps",
        "loadChildren": ".\/pages\/default\/components\/maps\/maps-google-maps\/maps-google-maps.module#MapsGoogleMapsModule"
      },
      {
        "path": "components\/maps\/jqvmap",
        "loadChildren": ".\/pages\/default\/components\/maps\/maps-jqvmap\/maps-jqvmap.module#MapsJqvmapModule"
      },
      {
        "path": "components\/utils\/idle-timer",
        "loadChildren": ".\/pages\/default\/components\/utils\/utils-idle-timer\/utils-idle-timer.module#UtilsIdleTimerModule"
      },
      {
        "path": "components\/utils\/session-timeout",
        "loadChildren": ".\/pages\/default\/components\/utils\/utils-session-timeout\/utils-session-timeout.module#UtilsSessionTimeoutModule"
      },
      {
        "path": "header\/actions",
        "loadChildren": ".\/pages\/default\/header\/header-actions\/header-actions.module#HeaderActionsModule"
      },
      {
        "path": "header\/profile",
        "loadChildren": ".\/pages\/default\/header\/header-profile\/header-profile.module#HeaderProfileModule"
      },
      {
        "path": "404",
        "loadChildren": ".\/pages\/default\/not-found\/not-found\/not-found.module#NotFoundModule"
      },
      {
        "path": "",
        "redirectTo": "index",
        "pathMatch": "full"
      }
    ]
  },
  {
    "path": "snippets\/pages\/user\/login-1",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-1\/user-login-1.module#UserLogin1Module"
  },
  {
    "path": "snippets\/pages\/user\/login-2",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-2\/user-login-2.module#UserLogin2Module"
  },
  {
    "path": "snippets\/pages\/user\/login-3",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-3\/user-login-3.module#UserLogin3Module"
  },
  {
    "path": "snippets\/pages\/user\/login-4",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-4\/user-login-4.module#UserLogin4Module"
  },
  {
    "path": "snippets\/pages\/user\/login-5",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-5\/user-login-5.module#UserLogin5Module"
  },
  {
    "path": "snippets\/pages\/errors\/error-1",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-1\/errors-error-1.module#ErrorsError1Module"
  },
  {
    "path": "snippets\/pages\/errors\/error-2",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-2\/errors-error-2.module#ErrorsError2Module"
  },
  {
    "path": "snippets\/pages\/errors\/error-3",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-3\/errors-error-3.module#ErrorsError3Module"
  },
  {
    "path": "snippets\/pages\/errors\/error-4",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-4\/errors-error-4.module#ErrorsError4Module"
  },
  {
    "path": "snippets\/pages\/errors\/error-5",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-5\/errors-error-5.module#ErrorsError5Module"
  },
  {
    "path": "snippets\/pages\/errors\/error-6",
    "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-6\/errors-error-6.module#ErrorsError6Module"
  },
  {
    "path": "**",
    "redirectTo": "404",
    "pathMatch": "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
