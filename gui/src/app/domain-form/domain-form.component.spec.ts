import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { DomainFormComponent } from './domain-form.component';
import { TagdbService } from '../services/tagdb.service';


describe('DomainFormComponent', () => {
  let component: DomainFormComponent;
  let fixture: ComponentFixture<DomainFormComponent>;
  const domains = of({'Berlin':1, 'Dtl':2, 'Weltweit':3, 'Sonstiges':4});
  const defdom = of('Dtl');

  beforeEach(async(() => {

    const tagdbServiceStub = {
      getDomains: function(): Observable<object> {
        return domains
      },
      getDefaultDomain: function(): Observable<string> {
        return defdom
      }
    };

    TestBed.configureTestingModule({
      declarations: [ DomainFormComponent ],
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatListModule,
      ],
      providers: [
        { provide: TagdbService, useValue: tagdbServiceStub},
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

