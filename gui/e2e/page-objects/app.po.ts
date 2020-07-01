import { browser, by, element } from 'protractor';

/**
 * https://stackoverflow.com/questions/23373148/angular-protractor-leave-browser-open-after-e2e-tests#23374977
 * -> browser.pause no longer works with current Node v8.1.0, see here, but you
 * could use browser.sleep(10000); to keep the browser open for e.g. 10 seconds
 * https://stackoverflow.com/questions/42426549/protractor-in-sts-ide-could-not-find-update-config-json#42453067
 * https://github.com/angular/protractor/issues/4968
 * https://stackoverflow.com/questions/22604644/jasmine-async-callback-was-not-invoked-within-timeout-specified-by-jasmine-defa#25273095
 * 
 */

export enum ListDirection {
  up = 'up',
  down = 'down'
}

export class AppPage {

  baseUrl = 'http://127.0.0.1:4200'

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToLink(link: string) {
    return browser.get(link);
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getFirstParagraphText(selector: string) {
    return element.all(by.css(selector)).first().getText();
  }
  
  getElement(selector: string) {
    return element(by.css(selector));
  }
  
  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }

  containsElement(selector: string) {
    return element(by.id(selector)).isPresent()
  }
}
