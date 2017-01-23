import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { AppRoutingModule,RoutableComponents} from 'app/app.routing.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import {

    PIPES, 
    SERVICES,
   
} from './shared/shared';

import {

    PAGES
    
} from './pages/pages'

@NgModule({
  declarations: [
    AppComponent,
    RoutableComponents,
    SpinnerComponent,
    PIPES,
    PAGES,
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
