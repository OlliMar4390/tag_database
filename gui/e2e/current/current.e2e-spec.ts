import { AppPage } from '../page-objects/app.po';
import { browser } from 'protractor';

describe('current |', () => {
  let page: AppPage;
  
  beforeEach(() => {
    page = new AppPage();
    browser.baseUrl = page.baseUrl;
    
  });

  

});
