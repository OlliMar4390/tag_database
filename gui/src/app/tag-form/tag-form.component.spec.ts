import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TagFormComponent } from './tag-form.component';
import { TagdbService } from '../services/tagdb.service';

describe('TagFormComponent', () => {
  let component: TagFormComponent;
  let fixture: ComponentFixture<TagFormComponent>;
  
  beforeEach(async(async () => {

    const tagdbServiceStub = { getTags: function getTags(){ return of(["1","2","3"]) }}
     
    TestBed.configureTestingModule({
      declarations: [
        TagFormComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        BrowserAnimationsModule
      ],
      providers: [
        DomainFormComponentStub,
        { provide: TagdbService, useValue: tagdbServiceStub},
      ],
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFormComponent);
    component = fixture.componentInstance;
    component.domainComponent = TestBed.get(DomainFormComponentStub)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `app-domain-form`,
    template: `` 
  })
  class DomainFormComponentStub {
    private domainMap: object = {'Medien':1, 'Wohnen':2, 'Armut':3, 'Daten':4};
    private domainChanges$: Observable<string> = of('Armut');  
  }

});

