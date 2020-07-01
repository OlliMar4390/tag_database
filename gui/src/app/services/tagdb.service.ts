import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Link } from '../shared/link';
import { RestApiService } from './rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class TagdbService {

  constructor(
    private restApi: RestApiService
  ) { }

  getDomains(): Observable<object | any> {
    return this.restApi.getCollectionData('api/domains')
  }

  getDefaultDomain(): Observable<string> {
    return this.restApi.getLiteralData('api/default_domain')
  }

  getTagsPerDomain(domain: number): Observable<string[] | any> {
    return this.restApi.getCollectionData('api/tags_per_domain/' + domain)
  }

  getTags(): Observable<string[] | any> {
    return this.restApi.getCollectionData('api/tags')
  }

  submitLink(link: Link): Observable<Link> {
    return this.restApi.postData('api/add_link', link)
  }

}
