import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { TagdbService } from './tagdb.service';

export interface DomainLoad {
  domainMap: object;
  domains$: Observable<string[]>;
}

export interface TagsLoad {
  tags: string[];
  filteredTags$: Observable<string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(
    private tagdb: TagdbService
  ) { }

  loadDomains(): Observable<DomainLoad> { 
    return this.tagdb.getDomains()
    .pipe(take(1))
    .pipe(map((domainMap: object) => {
      return {domainMap: domainMap, domains$: of(Object.keys(domainMap))}
  }))}

  loadTagsPerDomain(domain: number): Observable<TagsLoad> { 
    return this.tagdb.getTagsPerDomain(domain)
      .pipe(take(1))
      .pipe(map((tags: string[]) => { return {
          tags: Object.values(tags),
          filteredTags$: of(tags)
      }}))
  }

}
