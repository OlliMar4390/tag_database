import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyUrlComponent } from './pretty-url.component';

describe('PrettyUrlComponent', () => {
  let component: PrettyUrlComponent;
  let fixture: ComponentFixture<PrettyUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettyUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
