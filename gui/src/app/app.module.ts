import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//import { MatGridListModule } from '@angular/material/grid-list';
//import { MatDialogModule } from '@angular/material/dialog';

import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LinkFormComponent } from './link-form/link-form.component';
import { DomainFormComponent } from './domain-form/domain-form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { PrettyUrlComponent } from './pretty-url/pretty-url.component';
import { DescriptionFormComponent } from './description-form/description-form.component'
import { ErrorDivComponent } from './error-div/error-div.component';

import { baseURL } from './shared/baseurl';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { TagdbService } from './services/tagdb.service';
import { UrlProcessingService } from './services/url-processing.service';
import { RestApiService } from './services/rest-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LinkFormComponent,
    DomainFormComponent,
    TagFormComponent,
    UrlFormComponent,
    PrettyUrlComponent,
    DescriptionFormComponent,
    ErrorDivComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'BaseURL', useValue: baseURL},
    TagdbService,
    UrlProcessingService,
    RestApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
