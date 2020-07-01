import { Component, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TagdbService } from '../services/tagdb.service';
import { LoadDataService } from '../services/load-data.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss']
})
export class DomainFormComponent implements OnDestroy {

  domainFormGroup: FormGroup;
  domains$: Observable<string[]>;
  domainMap: object;
  errMess: string;
  domainChanges$: Observable<string>;
  subscDomains: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private tagdb: TagdbService,
    private loaddata: LoadDataService,
    private formServ: FormService
  ) {
    this.createForm();
   }

  loadDomainInformation() {
    // load the domains
    return this.loaddata.loadDomains()
    .pipe(map(res => {this.domainMap = res.domainMap; this.domains$ = res.domains$;}))
    //set the default domain as value
    .pipe(switchMap(() => { return this.formServ.setDefaultValue(
      this.tagdb.getDefaultDomain(), this.domainField)}))
    .subscribe(() => {}, errmess => this.errMess = <any>errmess);
  }
  
  createForm() {
    this.domainFormGroup = this.fb.group({
      domain: ['', [Validators.required]]
    });
    this.subscDomains = this.loadDomainInformation(); 
    this.domainChanges$ = this.domainField.valueChanges;
  }

  get domainField() { return this.domainFormGroup.get('domain') as AbstractControl; }

  getGroup() { return this.domainField }

  @HostListener('window:beforeunload')
  ngOnDestroy() { 
    this.domainChanges$ = null;
    this.subscDomains.unsubscribe();
   }

}
