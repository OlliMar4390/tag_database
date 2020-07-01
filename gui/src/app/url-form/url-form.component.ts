import { Component, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PrettyUrlComponent } from '../pretty-url/pretty-url.component';
import { UrlProcessingService } from '../services/url-processing.service'
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnDestroy {

  @ViewChild(PrettyUrlComponent, { static: true }) prettyURLComponent: PrettyUrlComponent;
  
  // for focusing on the url field after submit
  @ViewChild('url', { static: true }) urlELem: ElementRef;
    
  urlFormGroup: FormGroup;
  subscUrl: Subscription;
  urlParts: object;

  validationMessage = ''
  validationMessages = {
      'required': 'URL is required.',
      'pattern':  'URL must be valid.'
  }

  constructor(
    private fb: FormBuilder,
    private ups: UrlProcessingService,
    private formServ: FormService 
    ) { 

    this.urlFormGroup = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(this.ups.validURL)]] 
    });
    
    this.subscUrl = this.urlFormGroup.controls.url.valueChanges
      .pipe(map(url => this.urlParts = this.ups.getUrlParts(url)))
      .subscribe(() => this.validationMessage =  this.formServ.validateControl(
        this.urlFormGroup.controls.url, this.validationMessages
      ));
  }

  getGroup() { return this.urlFormGroup.controls.url }
  
  @HostListener('window:beforeunload')
  ngOnDestroy () { this.subscUrl.unsubscribe(); }
  
}
