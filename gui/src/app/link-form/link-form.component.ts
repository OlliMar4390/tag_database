import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { UrlFormComponent } from '../url-form/url-form.component';
import { DomainFormComponent } from '../domain-form/domain-form.component';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { DescriptionFormComponent } from '../description-form/description-form.component';

import { Link } from '../shared/link';
import { flyInOut, expand } from '../animations/app.animation';
import { TagdbService } from '../services/tagdb.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class LinkFormComponent implements OnInit, OnDestroy {

  @ViewChild(UrlFormComponent, { static: true }) urlComponent: UrlFormComponent;
  @ViewChild(DomainFormComponent, { static: true }) domainComponent: DomainFormComponent;
  @ViewChild(TagFormComponent, { static: true }) tagComponent: TagFormComponent;
  @ViewChild(DescriptionFormComponent, { static: true }) descrComponent: DescriptionFormComponent;
  
  linkForm: FormGroup;
  errMess: string;
  subscSubmit: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private tagdb: TagdbService,
    private formServ: FormService
    ) {  }

  ngOnInit() { this.createForm(); }

  createForm(): void {
    this.linkForm = this.fb.group({
      domain: this.domainComponent.getGroup(),
      url: this.urlComponent.getGroup(),
      tags: this.tagComponent.getGroup(),
      description: this.descrComponent.getGroup()
      });
    this.urlComponent.urlELem.nativeElement.focus();
  }

  onSubmit() {
    const link: Link = this.linkForm.value;
    
    // avoid sending empty string of last (i.e. new) tag field
    link['tags'] = link['tags'].filter((tagfield: string) => tagfield.trim());

    // subscription is necessary for the posting to happen
    this.subscSubmit = this.tagdb.submitLink(link)
      .pipe(take(1))
      .subscribe(response => {
          console.log('posted:\n' + response);
          this.linkForm.reset();
          this.formServ.clearFormArray(this.tagComponent.tagFields);
          this.urlComponent.prettyURLComponent.urlParts = null;
          this.domainComponent.domainField.setValue(link['domain']);
          this.urlComponent.urlELem.nativeElement.focus();

          // reload tags if tag(s) was (were) new and therefore added to the db
          if (!link['tags'].every(tag => this.tagComponent.allTags.includes(tag)))
            { this.tagComponent.ngOnInit(); }
        },
        errMess => this.errMess = errMess)
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() { if (this.subscSubmit) this.subscSubmit.unsubscribe() }
}

