import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProcessingService {

  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  validURL = '^((ft|htt)ps?:\/\/)?'+ // protocol
              '((([\\w\\d]([\\w\\d-]*[\\w\\d])*)[\\.@])+[a-z]{2,}|'+ // domain name and extension
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\:\\d+)?'+ // port
              '(\\/[-\\w\\d%@_.~+&:!]*)*'+ // path
              '(\\?[;&\\w\\d%@_.,~+\(\)\\/&:=-]*)?'+ // query string
              '(\#[-\\w\\d_]*)?$' // hash

  validateUrl(url: string) {
    // check whether the url can certainly be parsed with parseUrl
    try {
      const u = new URL(url);
      return true
    }
    catch {
      return false
    }
  }

  // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
  parseUrl(url: string, prop?: string) {
    const a = document.createElement('a'); 
    a.href = url;
    const {host, hostname, pathname: path, port, protocol, search, hash} = a;
    const origin = `${protocol}//${hostname}${port.length ? `:${port}`:''}`;
    return prop ? eval(prop) : {origin, host, hostname, path: path, port, protocol, search, hash}
  }
  
  // replace characters in URLs that replace whitespaces
  whitespacesInText = (str: string): string => str
    .replace(/-/g,' ').replace(/_/g, ' ').replace(/%20/g, ' ').trim()
  
  // test whether the string is probably not an ID
  probNoId = (str: string): boolean => 
  (
    isNaN(parseInt(str)) // is probably string
    && !(str.length > 4 && (str.match(/\d/g) || []).length > 2 && (str.match(/\w/g) || []).length > 2)
  ) 
  || (str.match(/ /) || []).length > 0 // bc of isNaN(parseInt('19 verletzte...')) -> False
  || (str.length < 5 && !isNaN(parseInt(str))) // e.g., year indication would be ok

  getUrlParts(url: string): object {
    if (url && this.validateUrl(url)) {
      const parsed_url = this.parseUrl(url)
      let urlParts = { 'hostname': parsed_url.hostname }

      let hash = parsed_url.hash;
      if (hash) {
        if (this.probNoId(hash.slice(1))){
          if (hash.length > 30) { hash = hash.slice(0, 30) + '...'; }
            urlParts['hash'] = this.whitespacesInText(hash)
      }}

      let argument = parsed_url.search;
      if (argument) {
        if (argument.length > 30) { argument = argument.slice(0, 30) + '...';};
        urlParts['arguments'] = this.whitespacesInText(argument.slice(1))
                                    .split(/[&,\+\=]+/)
                                    .join(' ');
      }

      const path = parsed_url.path.replace(/\.[^/.]+$/, ''); // remove file ending
      if (path) {
        urlParts['path'] = this.whitespacesInText(path)
                               .split('/')
                               .filter(p => this.probNoId(p) && p.trim());
      }
      
      return urlParts
    } else {
      return {}
  }}

}
