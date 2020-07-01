import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { TagdbService } from './tagdb.service';
import { Link } from '../shared/link';

describe('TagdbService testing', () => {
  let service: TagdbService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let subscription: Subscription;
  let testApiUrl = "http://127.0.0.1:8080/api/"

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TagdbService); 
  });

  afterEach(() => {
    httpTestingController.verify();
    if (subscription) {subscription.unsubscribe();}
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDefaultDomain', () => {
    const testData: string = '';
    subscription = service.getDefaultDomain()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'default_domain');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('getDomains', () => {
    const testData: object = {};
    subscription = service.getDomains()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'domains');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('getTags', () => {
    const testData: object = {};
    subscription = service.getTags()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'tags');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('getTagsPerDomain', () => {
    const testData: object = {};
    subscription = service.getTagsPerDomain(0) 
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'tags_per_domain/0');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('submitLink', () => {
    const testData: Link = {url: '', description: '', domain: '', tags: []};
    subscription = service.submitLink(testData) 
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'add_link');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

});