import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

import { TagdbService } from '../services/tagdb.service';
import { FormService } from '../services/form.service';
import { LoadDataService } from '../services/load-data.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit, OnDestroy {

  @Input() domainComponent;
  
  allTags: string[];
  tags: string[];
  filteredTags$: Observable<string[]>;
  tagsFormGroup: FormGroup;
  actElem: any;
  value: string;
  subscChanges: Subscription;
  errMess: string;
  
  validationMessage = 'You must specify at least one tag.'

  constructor(
    private fb: FormBuilder,
    private tagdb: TagdbService,
    private formServ: FormService,
    private loadData: LoadDataService
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.subscChanges = this.loadTagInformation();
  }

  loadTagInformation() {
    // get all the tags of the database
    return this.tagdb.getTags()
      .pipe(take(1))
      .pipe(switchMap((tags: string[]) => this.allTags = tags))
      // load tags filtered by domain if the domain is changed
      .pipe(switchMap(() => this.domainComponent.domainChanges$))
      .pipe(switchMap((value: string) => this.loadData.loadTagsPerDomain(
          this.domainComponent.domainMap[value])))
      .pipe(map(res => { this.tags = res.tags; this.filteredTags$ = res.filteredTags$; }))
      // filter the tags when changed and manage the number of tag fields
      .pipe(switchMap(() => this.formServ.observeOptions(this.tagFields)))
      .pipe(map(() => {
        this.value = this.formServ.getActiveElementValue();
        this.formServ.manageTagFieldsNumber(this.value, this.tagFields);
        this.filteredTags$ = this.formServ.filterOptions(this.value, this.tags, this.allTags);
      }))
      .subscribe(() => {}, errMess => this.errMess = errMess);
  }

  createForm() {
    this.tagsFormGroup = this.fb.group({
      tags: this.fb.array([
        this.fb.control([])
    ], this.formServ.minLengthArray(1)
  )});}

  get tagFields() { return this.tagsFormGroup.get('tags') as FormArray; }

  changeActiveElement() {
    // triggered by focus event of input element in template
    this.actElem = document.activeElement;
    if (this.actElem.tagName === 'INPUT') {
      this.value = this.actElem.value;
      this.filteredTags$ = this.formServ.filterOptions(this.value, this.tags, this.allTags);
    }
  }
  
  getGroup() { return this.tagFields }

  @HostListener('window:beforeunload')
  ngOnDestroy() { this.subscChanges.unsubscribe(); }

}
