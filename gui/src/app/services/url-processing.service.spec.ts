import { TestBed } from '@angular/core/testing';

import { UrlProcessingService } from './url-processing.service';

describe('UrlProcessingService', () => {
  let service: UrlProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy;
  });

  it('#validateUrl should validate URL', () => {
    const falseUrls = ['test', 'http//test.de', 'test@test.de'];
    const trueUrl = ['http://test.de']
    for (let u of falseUrls) {
      expect(service.validateUrl(u)).toBeFalse();
    }
    for (let u of trueUrl) {
      console.log(u); console.log(service.validateUrl(u));
      expect(service.validateUrl(u)).toBeTrue();
    }
  });

  it('Validator pattern #validURL should validate URL', () => {
    const falseUrls = ['test', 'http//test.de', 'test@@test.de'];
    const trueUrl = ['http://test.de', 'test@test.de', 'Person@test.de']
    const pattern = new RegExp(service.validURL)
    for (let u of falseUrls) {
      expect(!!pattern.test(u)).toBeFalse();
    }
    for (let u of trueUrl) {
      expect(!!pattern.test(u)).toBeTrue();
    }
  });

  it('should detect IDs', () => {
    const noIDs = [
      'gesellschaft',
      'ama',
      '19 verletzte polizisten',
      'ueber 500 millionen',
      '2020'
    ];
    const IDs = [
      '25935846',
      'e2ase39waos'
    ]
    for (let path of noIDs) {
      expect(service.probNoId(path)).toBeTrue();
    }
    for (let path of IDs) {
      expect(service.probNoId(path)).toBeFalse();
    }
  });

  it('#getUrlParts should contain all processed parts', () => {
    const testUrl = 'https://www.google.com/search?hl=de&q=bl+a%20blo%20blas-ea_orijga#bla';
    const urlParts = service.getUrlParts(testUrl);
    expect(urlParts['hostname']).toBe('www.google.com');
    expect(urlParts['path']).toEqual(['search']);
    expect(urlParts['hash']).toBe('#bla');
    expect(urlParts['arguments']).toBe('hl de q bl a blo blas ea ...');
  });
  
});
