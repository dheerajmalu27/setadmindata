import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AmChartsModule } from "amcharts3-angular2";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { FullCalendarModule } from 'ng-fullcalendar';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from './auth/token.interceptor';
// import { HttpClientModule } from '@angular/common/http'; 
// import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
  ],
  imports: [
    // HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
    AmChartsModule,
    // HttpClientModule,
  ],
  providers: [ScriptLoaderService,
    //   {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
