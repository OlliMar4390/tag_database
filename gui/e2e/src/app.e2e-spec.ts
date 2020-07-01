import { AppPage } from '../page-objects/app.po';
import { browser } from 'protractor';

describe('workspace-project App |', () => {
  let page: AppPage;
  let firstElement: string;
  let firstElementValue: string;
  
  beforeEach(() => {
    page = new AppPage();
    browser.baseUrl = page.baseUrl;
    firstElement = 'mat-toolbar a';
  });

  it('should get something', () => {
    page.navigateTo();
    browser.sleep(300);
    expect(page.getElement(this.firstElement)).toBeTruthy(
      'should get the first button of the toolbar');
  });

});
