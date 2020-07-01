import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subscription } from 'rxjs';

import { RestApiService } from './rest-api.service';
import { Link } from '../shared/link';

describe('RestApiService', () => {
  let service: RestApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let subscription: Subscription;
  let testApiUrl = "http://127.0.0.1:8080/api/"

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],

    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(RestApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
    if (subscription) {subscription.unsubscribe();}
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLiteralData() (with default_domain)', () => {
    const testData: string = '';
    subscription = service.getLiteralData('api/default_domain')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'default_domain');
    expect(req.request.method).toEqual('GET',
      'getting data works');
    req.flush(testData);
  });

  it('getCollectionData() (with domains)', () => {
    const testData: object = {};
    subscription = service.getCollectionData('api/domains')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'domains');
    expect(req.request.method).toEqual('GET',
      'getting data works');
    req.flush(testData);
  });

  it('submitLink', () => {
    const testData: Link = {url: '', description: '', domain: '', tags: []};
    subscription = service.postData('api/add_link', testData) 
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne(testApiUrl + 'add_link');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

});
